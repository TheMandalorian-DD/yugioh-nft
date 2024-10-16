// SPDX-License-Identifier: MIT
pragma solidity ^0.8;

import "./Collection.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "hardhat/console.sol";

contract Main is Ownable {
  int256 private countC;
  mapping(int => Collection) public collections;
  Listing[] public listings;
  uint256 public listingPrice = 0.1 ether;

  struct Listing {
    address seller; int256 collectionId; uint256 tokenId; uint256 price;
  }

  struct Listings {
    uint256 id; Listing info; CardInfo card;
  }

  struct CollectionInfo {
    int collectionId; string collectionName; uint256 cardCount; CardInfo[] cards; address owner;
  }

  struct Card {
    string img; int256 gid; string cardType;
  }

  struct CardInfo {
    string img; uint256 cardNumber; int gid; string cardType; address owner;
  }
  constructor(){
    countC = 0;
  }
  function createCollection(string memory name, uint256 cardCount) external onlyOwner {
    collections[countC] = new Collection(name, cardCount, address(this));
    countC++;
  }

  function mintCardToCollection(int256 collectionId, address to, string memory img, int256 gid, string memory cardType) external onlyOwner {
    require(collections[collectionId] != Collection(address(0)), "[NEx]");
    collections[collectionId].mintTo(to, img, gid, cardType);
  }

  function getListing() public view returns (Listings[] memory) {
    Listings[] memory list = new Listings[](uint256(listings.length));
    for (uint256 i = 0; i < listings.length; i++) {
      (string memory img, uint256 cardNumber, int256 gid, string memory cardType, address cardOwner) = collections[listings[i].collectionId].getCardInfo(listings[i].tokenId);
      list[uint256(i)] = Listings(i, listings[i], CardInfo(img, cardNumber, gid, cardType, cardOwner));
    }
    return list;
  }
}