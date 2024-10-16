import 'dotenv/config'
import {DeployFunction} from 'hardhat-deploy/types'
import {ethers} from 'hardhat'

const deployer: DeployFunction = async hre => {
  const {deploy, getDeploymentsFromAddress} = hre.deployments;
  if (hre.network.config.chainId !== 31337) return
  const {deployer, second, random} = await hre.getNamedAccounts()
  const mainDeployment = await deploy('Main', {
    from: deployer,
    log: true,
    gasLimit: 5000000
  });

  //const mainContract = await ethers.getContractAt('Main', mainDeployment.address);

// Define a list of card objects, each with its image URL and gid
  /*let cards = [
    { imageUrl: "https://i.ibb.co/b2mgK7q/ST01-001.jpg", gid: 1, cardType: "Spell" },
    { imageUrl: "https://i.ibb.co/fnkqCnH/ST01-002.jpg", gid: 23, cardType: "Spell" },
    { imageUrl: "https://i.ibb.co/HBKbCDF/ST01-003.jpg", gid: 28, cardType: "Spell" },
  ];*/

  /*await mainContract.createCollection("C1", cards.length);

// Iterate over the card objects and mint each card to the collection
  for (let i = 0; i < cards.length; i++) {

    await mainContract.mintCardToCollection(0, deployer, cards[i].imageUrl, cards[i].gid, cards[i].cardType);
  }*/

}

export default deployer