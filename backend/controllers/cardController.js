const axios = require('axios');

exports.getCards = async (req, res) => {
  const { type, attribute, level, name, language, archetype, race, set } = req.query;

  let query = 'https://db.ygoprodeck.com/api/v7/cardinfo.php?';

  if (language) query += `language=${encodeURIComponent(language)}&`;
  if (name) query += `name=${encodeURIComponent(name)}&`;
  if (type) query += `type=${encodeURIComponent(type)}&`;
  if (attribute) query += `attribute=${encodeURIComponent(attribute)}&`;
  if (level) query += `level=${encodeURIComponent(level)}&`;
  if (archetype) query += `archetype=${encodeURIComponent(archetype)}&`;
  if (race) query += `race=${encodeURIComponent(race)}&`;
  if (set) query += `set=${encodeURIComponent(set)}`;

  try {
    const response = await axios.get(query);
    const cards = response.data.data;

    const rep = cards.map(card => ({
      id: card.id,
      name: card.name,
      type: card.type,
      atk: card.atk,
      def: card.def,
      level: card.level,
      attribute: card.attribute,
      race: card.race,
      image_url: card.card_images[0].image_url
    }));

    res.json(rep);

  } catch (err) {
    console.error('Erreur lors de la récupération des cartes filtrées', err);
    res.status(500).send('Erreur serveur');
  }
};

exports.getAllSets = async (req, res) => {

  let query = 'https://db.ygoprodeck.com/api/v7/cardsets.php';

  try {
    const response = await axios.get(query);
    res.json(response.data);
  } catch (err) {
    console.error('Erreur lors de la récupération des sets', err);
    res.status(500).send('Erreur serveur');
  }
};

exports.getCardSetInfo = async (req, res) => {
  const { setcode } = req.query;

  let query = `https://db.ygoprodeck.com/api/v7/cardsetsinfo.php?setcode=${encodeURIComponent(setcode)}`;

  try {
    const response = await axios.get(query);
    res.json(response.data);
  } catch (err) {
    console.error('Erreur lors de la récupération des sets', err);
    res.status(500).send('Erreur serveur');
  }
};

exports.getAllArchetypes = async (req, res) => {
  try {
    const response = await axios.get('https://db.ygoprodeck.com/api/v7/archetypes.php');
    res.json(response.data);
  } catch (err) {
    console.error('Erreur lors de la récupération des archétypes', err);
    res.status(500).send('Erreur serveur');
  }
};

// Récupérer une carte aléatoire
exports.getRandomCard = async (req, res) => {
  try {
    const response = await axios.get('https://db.ygoprodeck.com/api/v7/randomcard.php');
    const card = response.data;

    const rep = {
      id: card.id,
      name: card.name,
      type: card.type,
      atk: card.atk,
      def: card.def,
      level: card.level,
      attribute: card.attribute,
      race: card.race,
      image_url: card.card_images[0].image_url
    };

    res.json(rep);

  } catch (err) {
    console.error('Erreur lors de la récupération de la carte aléatoire', err);
    res.status(500).send('Erreur serveur');
  }
};