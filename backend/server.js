const express = require('express');
const { ethers } = require('ethers');
const dotenv = require('dotenv');
const Collection = require('../contracts/artifacts/src/Collection.sol/Collection.json');
const Main = require('../contracts/artifacts/src/Main.sol/Main.json');
const axios = require('axios');

dotenv.config();

const app = express();
const port = 3000;

//const provider = new ethers.providers.JsonRpcProvider(`http://localhost:8545`);
//const wallet = new ethers.Wallet("0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff8", provider);
/*const { address, abi } = contracts.Main
const contract = new ethers.Contract(address, abi, provider)
const deployed = await contract.deployed()
if (!deployed) console.log("contract not deployed")
const contract_= signer ? contract.connect(signer) : contract*/
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello, NFT Backend!');
});

app.get('/get-all-cards', async (req, res) => {
  try {

    const response = await axios.get('https://db.ygoprodeck.com/api/v7/cardinfo.php');
    const data = response.data;

    let rep = [];
    rep.push({"id": data.data[0].id});

    // console.log(REP);

    res.json(rep);


  } catch (err) {
    console.error('Erreur lors de la récupération des Cards', err);
    res.send(err);
  }
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
