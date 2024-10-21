const { ethers } = require('ethers');
const axios = require('axios');
const dotenv = require('dotenv');
const mainContractABI = require('../../contracts/artifacts/src/Main.sol/Main.json');
const collectionABI = require('../../contracts/artifacts/src/Collection.sol/Collection.json');

const { init } = require('../contract');

dotenv.config();

// Route pour créer une collection
addCollection = async (req, res) => {
  const { collectionName, cardCount } = req.body;
  const contract = await init();

  try {
    const response = await axios.get(`https://db.ygoprodeck.com/api/v7/cardsets.php`);
    const set = response.data[0];
    console.log(res);

    if (!set) {
      return res.status(404).json({ error: 'Collection not found' });
    }

    const tx = await contract.createCollection(set.set_name, set.num_of_cards);
    await tx.wait();
    res.status(200).json({ message: 'Collection created', transactionHash: tx.hash});
  } catch (error) {
    res.status(500).json({ message:' Error while creating collection',error: error.message });
  }
};

mintCard = async (req, res) => {
  const { collectionId, userAddress, quantity} = req.body;
  const contract = await init();

  try {
    const collection= await contract.getCollectionInfo(collectionId);
    const collectionName = collection[0];
    const response = await axios.get(`https://db.ygoprodeck.com/api/v7/cardinfo.php?set=${encodeURIComponent(collectionName)}`);
    const cards = response.data.data;
    const card = cards[0];

    const rarity = card
      .card_sets
      .find(set => set.set_name === collectionName)
      .set_rarity;

    const tx = await contract.mintCardToUser(collectionId, userAddress, card.id, card.name, card.card_images[0].image_url, rarity, false, quantity);
    await tx.wait();
    res.status(200).json({ message: 'Card minted successfully', transactionHash: tx.hash });
  } catch (error) {
    console.error(error); // Log pour mieux voir l'erreur
    res.status(500).json({ error: error.message });
  }
};

getAllCollections = async (req, res) => {

  const contract = await init();

  try {
    const collections = await contract.getAllCollections();
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

getCardsByAddress = async (req, res) => {
  const {address} = req.query;
  const contract = await init();

  try {
    const [collectionIds, cardIds] = await contract.getAllCardsOwnedByUser(address);
    const ownedCards = await Promise.all(collectionIds.map(async (collectionId, index) => {
      const cardId = cardIds[index].toNumber();
      const cardMetadata = await contract.getCardMetadata(collectionId.toNumber(), cardId);
      return {
        collectionId: collectionId.toNumber(),
        cardId,
        realID: cardMetadata[1],
        name: cardMetadata[2],
        img: cardMetadata[3],
        rarity: cardMetadata[4],
        onSell: cardMetadata[5]
      };
    }));

    res.status(200).json({ ownedCards });
  } catch (error) {
    console.error('Error fetching cards:', error);
    res.status(500).json({ error: error.message });
  }
};

getMarketplace = async (req, res) => {
  try{
    const contract = await init();

    const listing = await contract.getMarketplace()
    const market =  listing.map((list) => {
      const priceInWei = BigInt(list[1][3]);
      const priceInEther = Number(priceInWei) / 1e18;
      return {
        id: list[0].toNumber(),
        seller: list[1][0],
        collectionId: list[1][1].toNumber(),
        tokenId: list[1][2].toNumber(),
        price: priceInEther,
        cardId: list[2][0],
        realId: list[2][1].toNumber(),
        name: list[2][2].toNumber(),
        img: list[2][3],
        rarity: list[2][4],
        onSell: list[2][5]
      };
    });
    res.status(200).json({ market });
  } catch (error) {
    console.log(error.message);
  }

};

initCollections = async () => {
  const contract = await init();

  try {
    const response = await axios.get(`https://db.ygoprodeck.com/api/v7/cardsets.php`);

    for(let i = 2; i < 4; i++) {
      const tx = await contract.createCollection(response.data[i].set_name, response.data[i].num_of_cards);
      await tx.wait();
      console.log(`${response.data[i].set_name} collection created`);
    }
  } catch (error) {
    console.log(error.message);
  }
}

initCardsToCollection = async () => {
  const contract = await init();
  try {
    const collections = await contract.getAllCollections();
    for (const collection of collections) {
      const index = collections.indexOf(collection)
      console.log(`https://db.ygoprodeck.com/api/v7/cardinfo.php?set=${encodeURIComponent(collection.name)}`)
      const response = await axios.get(`https://db.ygoprodeck.com/api/v7/cardinfo.php?set=${encodeURIComponent(collection.name)}`);
      const cards = response.data.data;
      let i;
      for (i = 0; i < cards.length/2; i++) {
        const card = cards[i];
        const rarity = card
          .card_sets
          .find(set => set.set_name === collection.name)
          .set_rarity;
        const tx = await contract.mintCardToUser(index, "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266", card.id.toString(), card.name, card.card_images[0].image_url, rarity, false, 1);
        await tx.wait();
        console.log(`${card.name} added to ${collection.name} (${collection.collectionAddress})`);
      }
      for (let y = i; y < cards.length; y++) {
        const card = cards[y];
        const rarity = card
          .card_sets
          .find(set => set.set_name === collection.name)
          .set_rarity;
        const tx = await contract.mintCardToUser(index, "0x70997970C51812dc3A010C7d01b50e0d17dc79C8", card.id.toString(), card.name, card.card_images[0].image_url, rarity, false, 1);
        await tx.wait();
        console.log(`${card.name} added to ${collection.name} (${collection.collectionAddress})`);
      }
    }
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = {
  initCollections,
  initCardsToCollection,
  addCollection,
  mintCard,
  getAllCollections,
  getCardsByAddress,
  getMarketplace,
}