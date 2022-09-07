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
  const { deploy, getNetworkName } = deployments;
  const { deployer } = await getNamedAccounts();
  const networkName = await getNetworkName();

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

  console.log('setting Tamiko contract on TamikoStore')
  const TamikoStore = await ethers.getContractFactory("TamikoStore")
  const tamikoStore = await TamikoStore.attach(tamikoStoreDeploy.address)
  const setTamikoContract = await tamikoStore.setTamikoContract(tamikoDeploy.address)
  console.log('waiting for tx...')
  await setTamikoContract.wait()
  console.log('adding food item')
  const addFood = await tamikoStore.addItem(foodItem.name, foodItem.description, foodItem.svg, foodItem.price, deployer)
  console.log('waiting for tx...')
  await addFood.wait()
  console.log('adding magic')
  const addMagic = await tamikoStore.addItem(magicPotionItem.name, magicPotionItem.description, magicPotionItem.svg, magicPotionItem.price, deployer)
  console.log('waiting for tx...')
  await addMagic.wait()
  console.log('adding revive')
  const addRevive = await tamikoStore.addItem(reviveItem.name, reviveItem.description, reviveItem.svg, reviveItem.price, deployer)
  console.log('waiting for tx...')
  await addRevive.wait()

  console.log('setting Tamiko contract on TamikoLink')
  const TamikoLink = await ethers.getContractFactory("TamikoLink")
  const tamikoLink = await TamikoLink.attach(tamikoLinkDeploy.address)
  await tamikoLink.setTamikoContract(tamikoDeploy.address)
  console.log('all done.')

  if (networkName === 'localhost') {
    const [owner] = await ethers.getSigners();
    await owner.sendTransaction({
      to: "0xFF5FE6e0D3D48c90A66217dd4A7560a3ed8dACD2",
      value: ethers.utils.parseEther("1.0")
    });
  }
};

export default main;

export const tags = ['all'];
