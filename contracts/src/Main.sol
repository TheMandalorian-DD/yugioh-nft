// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./Collection.sol";

contract Main is Ownable {
  address private _owner;

  struct CollectionInfo {
    string name;
    address collectionAddress;
    uint256 cardCount;
  }

  Listing[] public marketplace;
  uint256 public listingPrice = 0.1 ether;

  struct Listing {
    address seller; uint256 collectionId; uint256 tokenId; uint256 price;
  }

  struct Listings {
    uint256 id; Listing info; Collection.Card card;
  }

  mapping(uint256 => CollectionInfo) public collections;
  uint256 public collectionCounter;

  event CollectionCreated(uint256 collectionId, string name, address collectionAddress);
  event CardMinted(uint256 collectionId, uint256 cardId, address owner);

  constructor() Ownable(msg.sender) {
    collectionCounter = 0;
    _owner = msg.sender;
  }

  function owner() public view override returns (address) {
    return _owner;
  }

  function getOwner() public view returns (address) {
    return owner();
  }

  function createCollection(string memory _name, uint256 _cardCount) external onlyOwner {
    Collection newCollection = new Collection(_name, _cardCount, msg.sender);
    collections[collectionCounter] = CollectionInfo({
      name: _name,
      collectionAddress: address(newCollection),
      cardCount: _cardCount
    });

    emit CollectionCreated(collectionCounter, _name, address(newCollection));
    collectionCounter++;
  }

  event DebugEvent(string message);

  function mintCardToUser(uint256 collectionId, address to, string memory realID, string memory cardName, string memory cardImage, string memory rarity, bool redeem, uint256 quantity) external {
    require(collectionId < collectionCounter, "Collection does not exist");
    require(quantity > 0, "Quantity must be greater than 0");

    Collection collection = Collection(collections[collectionId].collectionAddress);

    for (uint256 i = 0; i < quantity; i++) {
      uint256 cardId = collection.mintTo(to, realID, cardName, cardImage, rarity, redeem);
      emit CardMinted(collectionId, cardId, to);
    }
  }

  function getCollectionInfo(uint256 collectionId) external view returns (string memory, address, uint256) {
    require(collectionId < collectionCounter, "Collection does not exist");
    CollectionInfo memory collection = collections[collectionId];
    return (collection.name, collection.collectionAddress, collection.cardCount);
  }

  function getAllCollections() external view returns (CollectionInfo[] memory) {
    CollectionInfo[] memory allCollections = new CollectionInfo[](collectionCounter);
    for (uint256 i = 0; i < collectionCounter; i++) {
      allCollections[i] = collections[i];
    }
    return allCollections;
  }

  function getCardMetadata(uint256 collectionId, uint256 cardId) external view returns (uint256, string memory, string memory, string memory, string memory, bool) {
    require(collectionId < collectionCounter, "Collection does not exist");

    CollectionInfo memory collection = collections[collectionId];
    Collection collectionContract = Collection(collection.collectionAddress);

    return collectionContract.getCard(cardId);
  }

  function getAllCardsOwnedByUser(address user) external view returns (uint256[] memory, uint256[] memory) {
    uint256 totalCardsCount = 0;

    for (uint256 i = 0; i < collectionCounter; i++) {
      Collection collection = Collection(collections[i].collectionAddress);
      for (uint256 j = 0; j < collections[i].cardCount; j++) {
        try collection.ownerOf(j) returns (address cardOwner) {
          if (cardOwner == user) {
            totalCardsCount++;
          }
        } catch {
        }
      }
    }

    uint256[] memory collectionIds = new uint256[](totalCardsCount);
    uint256[] memory cardIds = new uint256[](totalCardsCount);
    uint256 index = 0;

    for (uint256 i = 0; i < collectionCounter; i++) {
      Collection collection = Collection(collections[i].collectionAddress);
      for (uint256 j = 0; j < collections[i].cardCount; j++) {
        try collection.ownerOf(j) returns (address cardOwner) {
          if (cardOwner == user) {
            collectionIds[index] = i;
            cardIds[index] = j;
            index++;
          }
        } catch {
        }
      }
    }

    return (collectionIds, cardIds);
  }

  event CardSold(uint256 collectionId, uint256 tokenId, address seller);
  event SellerAddress(address seller);

  function sellCard(uint256 collectionId, uint256 tokenId) external {
    Collection collection = Collection(collections[collectionId].collectionAddress);
    marketplace.push(Listing(msg.sender, collectionId, tokenId, listingPrice));
    collection.setOnSell(tokenId, msg.sender);
    emit CardSold(collectionId, tokenId, msg.sender);
  }

  function getMarketplace() public view returns (Listings[] memory) {
    Listings[] memory list = new Listings[](uint256(marketplace.length));
    for (uint256 i = 0; i < marketplace.length; i++) {
      Collection collection = Collection(collections[marketplace[i].collectionId].collectionAddress);
      (uint256 id, string memory realID, string memory name, string memory img, string memory rarity, bool onSell) = collection.getCard(marketplace[i].tokenId);
      list[uint256(i)] = Listings(i, marketplace[i], Collection.Card(id, realID, name, img, rarity, onSell));
    }
    return list;
  }

  function buyCard(uint256 listingIndex) external payable {
        require(listingIndex < marketplace.length, "LInd");
        Collection collection = Collection(collections[marketplace[listingIndex].collectionId].collectionAddress);
        collection.transferCard(marketplace[listingIndex].tokenId, marketplace[listingIndex].seller, msg.sender);

        // remove the listing
        if (listingIndex < marketplace.length - 1) {
            marketplace[listingIndex] = marketplace[marketplace.length - 1];
        }
        marketplace.pop();
    }
}