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

  const mainContract = await ethers.getContractAt('Main', mainDeployment.address);

// Define a list of card objects, each with its image URL and gid
  let cards = [
    { imageUrl: "https://i.ibb.co/b2mgK7q/ST01-001.jpg", gid: 1, cardType: "Spell" },
    { imageUrl: "https://i.ibb.co/fnkqCnH/ST01-002.jpg", gid: 23, cardType: "Spell" },
    { imageUrl: "https://i.ibb.co/HBKbCDF/ST01-003.jpg", gid: 28, cardType: "Spell" },
    { imageUrl: "https://i.ibb.co/85vGsbt/ST01-004.webp", gid: 17, cardType: "Spell" },
    { imageUrl: "https://i.ibb.co/ypVk4wY/ST01-005.webp", gid: 5, cardType: "Spell" },
    { imageUrl: "https://i.ibb.co/hM8HFcm/ST01-006.jpg", gid: 9, cardType: "Spell" },
    { imageUrl: "https://i.ibb.co/mFnR6P2/ST01-007.webp", gid: 25, cardType: "Spell" },
    { imageUrl: "https://i.ibb.co/JjKdX4Q/ST01-008.webp", gid: 247, cardType: "Spell" },
    { imageUrl: "https://i.ibb.co/BzV4j25/ST01-009.jpg", gid: 566, cardType: "Spell" },
    { imageUrl: "https://i.ibb.co/Fxr76Dp/ST01-010.jpg", gid: 29, cardType: "Spell" },
    { imageUrl: "https://i.ibb.co/VxfCYxT/ST01-011.webp", gid: 10, cardType: "Spell" },
    { imageUrl: "https://i.ibb.co/k5QrSb2/ST01-012.webp", gid: 8, cardType: "Spell" },
    { imageUrl: "https://i.ibb.co/ctRx7BY/ST01-013.webp", gid: 11, cardType: "Spell" },
    { imageUrl: "https://i.ibb.co/Zdv8M9b/ST01-014.jpg", gid: 6, cardType: "Spell" },
    { imageUrl: "https://i.ibb.co/fScydcV/ST01-015.jpg", gid: 21, cardType: "Spell" },
    { imageUrl: "https://i.ibb.co/D1VJWqR/ST01-016.jpg", gid: 27, cardType: "Spell" },
    { imageUrl: "https://i.ibb.co/wwqq7h6/ST01-017.jpg", gid: 18, cardType: "Spell" }
  ];

  await mainContract.createCollection("C1", cards.length);

// Iterate over the card objects and mint each card to the collection
  for (let i = 0; i < cards.length; i++) {
    await mainContract.mintCardToCollection(0, deployer, cards[i].imageUrl, cards[i].gid, cards[i].cardType);
  }

}

export default deployer