const { ethers } = require('ethers');
const { contracts } = require('../frontend/src/contracts.json');

const init = async () => {
  const jsonRpcUrl = 'http://127.0.0.1:8545';
  const provider = new ethers.providers.JsonRpcProvider(jsonRpcUrl);
  const signer = new ethers.Wallet("0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80", provider);
  const { address, abi } = contracts.Main
  const contract = new ethers.Contract(address, abi, provider)
  const deployed = await contract.deployed()
  if (!deployed) console.log("contract not deployed")
  return signer ? contract.connect(signer) : contract
};

module.exports = { init };