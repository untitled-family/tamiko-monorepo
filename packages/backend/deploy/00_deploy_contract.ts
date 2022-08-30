import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';
import { ethers } from 'hardhat';

const foodItem = {
  name: 'food',
  description: 'description',
  svg: 'svg',
  price: 1000000
}

const magicPotionItem = {
  name: 'magic potion',
  description: 'description',
  svg: 'svg',
  price: 1000000
}

const reviveItem = {
  name: 'revive potion',
  description: 'description',
  svg: 'svg',
  price: 1000000
}

const main: DeployFunction = async function ({ getNamedAccounts, deployments }: HardhatRuntimeEnvironment) {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  const tamikoStoreDeploy = await deploy('TamikoStore', {
    from: deployer,
    log: true
  })

  const tamikoRendererDeploy = await deploy('TamikoRenderer', {
    from: deployer,
    log: true
  })

  const tamikoLinkDeploy = await deploy('TamikoLink', {
    from: deployer,
    log: true
  })

  const foodDeploy = await deploy('Food', {
    from: deployer,
    log: true
  })

  const magicPotionDeploy = await deploy('MagicPotion', {
    from: deployer,
    log: true
  })

  const reviveDeploy = await deploy('Revive', {
    from: deployer,
    log: true
  })

  const tamikoDeploy = await deploy('Tamiko', {
    args: [
      tamikoRendererDeploy.address,
      tamikoStoreDeploy.address,
      tamikoLinkDeploy.address,
      foodDeploy.address,
      magicPotionDeploy.address,
      reviveDeploy.address
    ],
    from: deployer,
    log: true
  })

  // const TamikoStore = await ethers.getContractFactory("TamikoStore")
  // const tamikoStore = await TamikoStore.attach(tamikoStoreDeploy.address)
  // await tamikoStore.setTamikoContract(tamikoDeploy.address)
  // await tamikoStore.addItem(foodItem.name, foodItem.description, foodItem.svg, foodItem.price, deployer)
  // await tamikoStore.addItem(magicPotionItem.name, magicPotionItem.description, magicPotionItem.svg, magicPotionItem.price, deployer)
  // await tamikoStore.addItem(reviveItem.name, reviveItem.description, reviveItem.svg, reviveItem.price, deployer)

  // const TamikoLink = await ethers.getContractFactory("TamikoLink")
  // const tamikoLink = await TamikoLink.attach(tamikoLinkDeploy.address)
  // await tamikoLink.setTamikoContract(tamikoDeploy.address)

  // const [owner] = await ethers.getSigners();
  // await owner.sendTransaction({
  //   to: "0xDdB52387CDC1556C75cb4e3efcD9a3B12488C9dE",
  //   value: ethers.utils.parseEther("1.0"), // Sends exactly 1.0 ether
  // });
};

export default main;

export const tags = ['all'];
