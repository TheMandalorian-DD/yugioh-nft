// controllers/typeRaceController.js

// Valeurs de races
const races = {
  monster: [
    "Aqua", "Beast", "Beast-Warrior", "Creator-God", "Cyberse",
    "Dinosaur", "Divine-Beast", "Dragon", "Fairy", "Fiend",
    "Fish", "Insect", "Machine", "Plant", "Psychic",
    "Pyro", "Reptile", "Rock", "Sea Serpent", "Spellcaster",
    "Thunder", "Warrior", "Winged Beast", "Wyrm", "Zombie"
  ],
  spell: [
    "Normal", "Field", "Equip", "Continuous", "Quick-Play", "Ritual"
  ],
  trap: [
    "Normal", "Continuous", "Counter"
  ]
};

// Valeurs de types
const types = {
  mainDeck: [
    "Effect Monster", "Flip Effect Monster", "Flip Tuner Effect Monster",
    "Gemini Monster", "Normal Monster", "Normal Tuner Monster",
    "Pendulum Effect Monster", "Pendulum Effect Ritual Monster",
    "Pendulum Flip Effect Monster", "Pendulum Normal Monster",
    "Pendulum Tuner Effect Monster", "Ritual Effect Monster",
    "Ritual Monster", "Spell Card", "Spirit Monster",
    "Toon Monster", "Trap Card", "Tuner Monster", "Union Effect Monster"
  ],
  extraDeck: [
    "Fusion Monster", "Link Monster", "Pendulum Effect Fusion Monster",
    "Synchro Monster", "Synchro Pendulum Effect Monster",
    "Synchro Tuner Monster", "XYZ Monster", "XYZ Pendulum Effect Monster"
  ],
  other: [
    "Skill Card", "Token"
  ]
};

// Fonction pour obtenir les valeurs de race
exports.getRaces = (req, res) => {
  res.json(races);
};

// Fonction pour obtenir les valeurs de type
exports.getTypes = (req, res) => {
  res.json(types);
};
