// SPDX-License-Identifier: MIT
pragma solidity ^0.8;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "hardhat/console.sol";

contract Collection is ERC721 {
  address public owner;
  string public collectionName;
  uint256 public cardCount;

  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds;
  mapping(uint256 => address) private tokenApprovals;

  struct Card {
    string img;
    uint256 cardNumber;
    int256 gid;
    string cardType;
  }

  mapping(uint => Card) public cards;

  constructor(
    string memory _name,
    uint256 _cardCount,
    address _owner
  ) ERC721(_name, "MYNFT") {
    collectionName = _name;
    cardCount = _cardCount;
    owner = _owner;
  }

  // create cards for myself
  function addCard(string memory img, int256 gid, string memory cardType) external {
    uint256 newCardId = _tokenIds.current();
    _mint(msg.sender, newCardId);
    _tokenIds.increment();

    Card memory newCard = Card({cardNumber: newCardId, img: img, gid: gid, cardType: cardType});
    cards[newCardId] = newCard;
  }

  function mintTo(address to, string memory img, int256 gid, string memory cardType) external {
    uint256 newCardId = _tokenIds.current();

    _mint(to, newCardId);
    _tokenIds.increment();

    Card memory newCard = Card({cardNumber: newCardId, img: img, gid: gid, cardType: cardType});
    cards[newCardId] = newCard;
  }

  function getCardInfo(uint256 tokenId) external view returns (string memory img, uint256 cardNumber, int256 gid, string memory cardType, address cardOwner) {
    require(tokenId < cardCount, "Index out of bounds");
    Card storage card = cards[tokenId];
    return (card.img, card.cardNumber, card.gid, card.cardType, ownerOf(card.cardNumber));
  }

}