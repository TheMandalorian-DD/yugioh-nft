const axios = require('axios');

// Fonction pour récupérer toutes les collections
const getAllCollections = async (req, res) => {
  const apiUrl = 'https://db.ygoprodeck.com/api/v7/cardsets.php';
  try {
    const response = await axios.get(apiUrl);
    const collections = response.data;
    res.json(collections);
  } catch (error) {
    console.error('Erreur lors de la récupération des collections:', error.message);
    res.status(500).send('Erreur lors de la récupération des collections');
  }
};

module.exports = {
  getAllCollections,
};
