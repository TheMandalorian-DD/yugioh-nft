const express = require('express');
const dotenv = require('dotenv');
const { getCards, getAllArchetypes, getSets, getRandomCard, getCardsBySet, getAllSets, getCardSetInfo } = require('./controllers/cardController')
const { getRaces, getTypes } = require('./controllers/typeRaceController')
const { addCollection, getAllCollections, mintCard, getCardsCollection, getCardsByAddress, initCollections,
  initCardsToCollection, getMarketplace
} = require('./controllers/userController')
const timers = require('node:timers')
const cors = require('cors')

dotenv.config();

const app = express();
const port = 3000;

app.use(cors({origin:"*"}))

initCollections().then(r => {
  setTimeout(initCardsToCollection, 3000);
});

app.get('/', (req, res) => {
  res.send('Hello!');
});

app.get('/get-cards', getCards);
app.get('/get-all-sets', getAllSets);
app.get('/get-cards-info', getCardSetInfo);
app.get('/get-all-archetypes', getAllArchetypes);
app.get('/get-random-card', getRandomCard);

app.get('/get-races', getRaces);
app.get('/get-types', getTypes);

app.post('/add-collection', addCollection);
app.get('/get-all-collections', getAllCollections);
app.post('/mint-card', mintCard);
app.get('/get-cards-by-address', getCardsByAddress);
app.get('/get-marketplace', getMarketplace);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
