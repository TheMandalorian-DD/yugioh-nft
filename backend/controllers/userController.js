const { ethers } = require('ethers');
const axios = require('axios');
const dotenv = require('dotenv');
const mainContractABI = require('../../contracts/artifacts/src/Main.sol/Main.json');
const collectionABI = require('../../contracts/artifacts/src/Collection.sol/Collection.json');

dotenv.config();

const rpcUrl = process.env.RPC_URL;
const privateKey = process.env.PRIVATE_KEY;
const mainContractAddress = process.env.MAIN_CONTRACT_ADDRESS;

if (!rpcUrl || !privateKey || !mainContractAddress) {
  throw new Error("Please set all the environment variables: RPC_URL, PRIVATE_KEY, MAIN_CONTRACT_ADDRESS");
}

const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
const wallet = new ethers.Wallet(privateKey, provider);
const mainContract = new ethers.Contract(mainContractAddress, mainContractABI.abi, wallet);

// Route pour créer une collection
exports.addCollection = async (req, res) => {
  try {
    const response = await axios.get(`https://db.ygoprodeck.com/api/v7/cardsets.php`);
    const set = response.data[0];
    console.log(res);

    if (!set) {
      return res.status(404).json({ error: 'Collection not found' });
    }

    const tx = await mainContract.createCollection(set.set_name, set.num_of_cards);
    await tx.wait();
    res.status(200).json({ message: 'Collection created', transactionHash: tx.hash});
  } catch (error) {
    res.status(500).json({ message:' Error while creating collection',error: error.message });
  }
};

exports.mintCard = async (req, res) => {
  const { collectionId, userAddress, quantity} = req.body;
  try {
    const collection= await mainContract.getCollectionInfo(collectionId);
    const collectionName = collection[0];
    const response = await axios.get(`https://db.ygoprodeck.com/api/v7/cardinfo.php?set=${encodeURIComponent(collectionName)}`);
    const cards = response.data.data;
    const card = cards[0];

    const rarity = card
      .card_sets
      .find(set => set.set_name === collectionName)
      .set_rarity;

    const tx = await mainContract.mintCardToUser(collectionId, userAddress, card.id, card.name, card.card_images[0].image_url, rarity, false, quantity);
    await tx.wait();
    res.status(200).json({ message: 'Card minted successfully', transactionHash: tx.hash });
  } catch (error) {
    console.error(error); // Log pour mieux voir l'erreur
    res.status(500).json({ error: error.message });
  }
};

exports.getAllCollections = async (req, res) => {
  try {
    const collections = await mainContract.getAllCollections();
    const result = collections.map((collection, index) => ({
      collectionId: index,
      name: collection.name,
      collectionAddress: collection.collectionAddress,
      cardCount: collection.cardCount.toString(),
    }));
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCardsCollection = async (req, res) => {
  const { collectionId, userAddress } = req.body;

  try {
    const [allCollectionIds, allCardIds] = await mainContract.getAllCardsOwnedByUser(userAddress);
    console.log(allCollectionIds);
    console.log(allCardIds);
    const filteredCardIds = allCardIds.filter((_, index) => allCollectionIds[index] == collectionId);
    if (filteredCardIds.length === 0) {
      return res.status(200).json({ collectionId, userAddress, ownedCards: [] });
    }
    const collectionAddress = (await mainContract.getCollectionInfo(collectionId))[1];
    const collectionContract = new ethers.Contract(collectionAddress, collectionABI.abi, provider);
    const ownedCards = await Promise.all(filteredCardIds.map(async (cardId) => {
      const card = await collectionContract.getCard(cardId);
      return {
        cardId: card[0].toNumber(),
        realID: card[1],
        name: card[2],
        image: card[3],
        rarity: card[4],
        redeem: card[5]
      };
    }));

    res.status(200).json({ collectionId, userAddress, ownedCards });
  } catch (error) {
    console.error('Error fetching user cards with metadata:', error);
    res.status(500).json({ error: 'Error fetching user cards', details: error.message });
  }
};

exports.getCardsByAddress = async (req, res) => {
  const {userAddress} = req.body;
  try {
    const [collectionIds, cardIds] = await mainContract.getAllCardsOwnedByUser(userAddress);
    const ownedCards = await Promise.all(collectionIds.map(async (collectionId, index) => {
      const cardId = cardIds[index].toNumber();
      const cardMetadata = await mainContract.getCardMetadata(collectionId.toNumber(), cardId);
      return {
        collectionId: collectionId.toNumber(),
        cardId,
        realID: cardMetadata[1],
        name: cardMetadata[2],
        img: cardMetadata[3],
        rarity: cardMetadata[4],
        redeem: cardMetadata[5]
      };
    }));

    res.status(200).json({ ownedCards });
  } catch (error) {
    console.error('Error fetching cards:', error);
    res.status(500).json({ error: error.message });
  }
};