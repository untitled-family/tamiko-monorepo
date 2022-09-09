const { expect } = require('chai');
const { ethers, network } = require('hardhat');
const { setBalance } = require("@nomicfoundation/hardhat-network-helpers");


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

const getJsonMetadata = (tokenURI) => {
  const base64 = tokenURI.replace('data:application/json;base64,', '');
  const string = atob(base64);
  return JSON.parse(string);
}

describe("Tamiko", function () {
  let Tamiko;
  let TamikoStore;
  let TamikoLink;
  let Food;
  let owner;
  let addr1;
  let addrs;

  beforeEach(async function () {
    TamikoRenderer = await ethers.getContractFactory('TamikoRenderer');
    TamikoStore = await ethers.getContractFactory('TamikoStore');
    TamikoLink = await ethers.getContractFactory('TamikoLink');
    Tamiko = await ethers.getContractFactory('Tamiko');
    Food = await ethers.getContractFactory('Food');
    MagicPotion = await ethers.getContractFactory('MagicPotion');
    Revive = await ethers.getContractFactory('Revive');

    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();

    hardhatTamikoStore = await TamikoStore.deploy();
    hardhatTamikoRenderer = await TamikoRenderer.deploy();
    hardhatTamikoLink = await TamikoLink.deploy();
    hardhatFood = await Food.deploy();
    hardhatMagicPotion = await MagicPotion.deploy();
    hardhatRevive = await Revive.deploy();
    hardhatTamiko = await Tamiko.deploy(
      hardhatTamikoRenderer.address,
      hardhatTamikoStore.address,
      hardhatTamikoLink.address,
      hardhatFood.address,
      hardhatMagicPotion.address,
      hardhatRevive.address
    );

    await hardhatTamikoRenderer.deployed();
    await hardhatTamikoStore.deployed();
    await hardhatTamikoLink.deployed();
    await hardhatTamiko.deployed();
    await hardhatFood.deployed();
    await hardhatMagicPotion.deployed();
    await hardhatRevive.deployed();

    await setBalance(hardhatTamikoStore.address, 100000000000000000000);
  })

  describe('Setup', function () {
    it('Should set the right owner', async () => {
      expect(await hardhatTamikoStore.owner()).to.equal(owner.address)
      expect(await hardhatTamiko.owner()).to.equal(owner.address)
    })

    it('Should set TamikoStore address on Tamiko', async () => {
      await hardhatTamikoStore.setTamikoContract(hardhatTamiko.address)
      expect(await hardhatTamikoStore.tamiko()).to.equal(hardhatTamiko.address)
    })
  })

  describe('Mint', () => {
    it('Should mint 1 Tamiko', async () => {
      await hardhatTamikoStore.setTamikoContract(hardhatTamiko.address)
      await hardhatTamikoStore.addItem(foodItem.name, foodItem.description, foodItem.svg, foodItem.price, owner.address)
      await hardhatTamiko.mint()
      expect(await hardhatTamiko.totalSupply()).to.equal(1)
    })

    it('Should set Tamiko from struct', async () => {
      await hardhatTamikoStore.setTamikoContract(hardhatTamiko.address)
      await hardhatTamikoStore.addItem(foodItem.name, foodItem.description, foodItem.svg, foodItem.price, owner.address)
      await hardhatTamiko.mint()
      const tamikos = await hardhatTamiko.tamikos(0)
      expect(tamikos.length).to.be.above(0)
      expect(tamikos['breeder']).to.equal(owner.address)
    })

    it('Should have valid metadata', async () => {
      await hardhatTamikoStore.setTamikoContract(hardhatTamiko.address)
      await hardhatTamikoStore.addItem(foodItem.name, foodItem.description, foodItem.svg, foodItem.price, owner.address)
      await hardhatTamiko.mint()
      const tokenURI = await hardhatTamiko.tokenURI(0)
      const json = getJsonMetadata(tokenURI)

      expect(json).to.have.keys(['name', 'attributes', 'properties', 'image']);
      expect(json.attributes.length).to.be.above(0)
    })

    it('Should receive 10 food', async () => {
      await hardhatTamikoStore.setTamikoContract(hardhatTamiko.address)
      await hardhatTamikoStore.addItem(foodItem.name, foodItem.description, foodItem.svg, foodItem.price, owner.address)
      await hardhatTamiko.mint()
      const balance = await hardhatTamikoStore.balanceOf(owner.address, 0)

      expect(balance).to.equal(10)
    })
  })

  describe('Items', async () => {
    it('Should create item', async () => {
      await hardhatTamikoStore.setTamikoContract(hardhatTamiko.address)
      await hardhatTamikoStore.addItem(foodItem.name, foodItem.description, foodItem.svg, foodItem.price, owner.address)
      await hardhatTamiko.mint()
      await hardhatTamikoStore.addItem(magicPotionItem.name, magicPotionItem.description, magicPotionItem.svg, magicPotionItem.price, owner.address)
      const food = await hardhatTamikoStore.items(0)
      const magicPotion = await hardhatTamikoStore.items(1)

      expect(food['id'].toNumber()).to.equal(0)
      expect(food['name']).to.equal(foodItem.name)
      expect(food['description']).to.equal(foodItem.description)
      expect(food['svg']).to.equal(foodItem.svg)
      expect(food['price'].toNumber()).to.equal(foodItem.price)


      expect(magicPotion['id'].toNumber()).to.equal(1)
      expect(magicPotion['name']).to.equal(magicPotion.name)
      expect(magicPotion['description']).to.equal(magicPotion.description)
      expect(magicPotion['svg']).to.equal(magicPotion.svg)
      expect(magicPotion['price'].toNumber()).to.equal(magicPotion.price)
    })

    it('Should buy item', async () => {
      await hardhatTamikoStore.addItem(foodItem.name, foodItem.description, foodItem.svg, foodItem.price, owner.address)
      await hardhatTamikoStore.buyItem(10, 0, owner.address, { value: foodItem.price * 10 })
      const itemBalance = await hardhatTamikoStore.balanceOf(owner.address, 0)

      expect(itemBalance).to.equal(10)
    })

    it('Should give money to creator when buying', async () => {
      const originalCreatorEthBalance = await ethers.provider.getBalance(addr1.address)
      const originalContractEthBalance = await ethers.provider.getBalance(hardhatTamikoStore.address)

      await hardhatTamikoStore.addItem(foodItem.name, foodItem.description, foodItem.svg, foodItem.price, addr1.address)
      const tx = await hardhatTamikoStore.connect(addr2).buyItem(1, 0, addr2.address, { value: foodItem.price })
      await tx.wait()

      const creatorEthBalance = await ethers.provider.getBalance(addr1.address)
      const contractEthBalance = await ethers.provider.getBalance(hardhatTamikoStore.address)
      const contractFees = foodItem.price - (foodItem.price / 5) * 4
      expect(creatorEthBalance.value).to.equal(originalCreatorEthBalance.add((foodItem.price / 5) * 4).value)
      expect(contractEthBalance.value).to.equal(originalContractEthBalance.add(contractFees).value)
    })

    it('Should send/burn item', async () => {
      await hardhatTamikoStore.setTamikoContract(hardhatTamiko.address)
      await hardhatTamikoStore.addItem(foodItem.name, foodItem.description, foodItem.svg, foodItem.price, owner.address)
      await hardhatTamiko.connect(addr1).mint()
      await hardhatTamikoStore.connect(addr1).buyItem(1, 0, addr1.address, { value: foodItem.price })
      await hardhatTamikoStore.connect(addr1).sendItem(0, 0)
      const balance = await hardhatTamikoStore.balanceOf(addr1.address, 0)
      const players = await hardhatTamiko.players(addr1.address)

      expect(balance).to.equal(10)
      expect(players).to.equal(1)
    })

    it('Should not send when user has no token', async () => {
      await expect(hardhatTamikoStore.sendItem(0, 0)).to.be.revertedWith('NonExistentItem()')
    })

    it('Should not send to non-existent Tamiko', async () => {
      await hardhatTamikoStore.setTamikoContract(hardhatTamiko.address)
      await hardhatTamikoStore.addItem(foodItem.name, foodItem.description, foodItem.svg, foodItem.price, owner.address)
      await hardhatTamiko.mint()
      await hardhatTamikoStore.buyItem(1, 0, owner.address, { value: foodItem.price })
      await expect(hardhatTamikoStore.sendItem(0, 1)).to.be.revertedWith('NonExistentTamiko()')
    })
  })

  describe('Food', async () => {
    // it('Should increment timesFed', async () => {
    //   let tamiko
    //   await hardhatTamikoStore.setTamikoContract(hardhatTamiko.address)
    //   await hardhatTamikoStore.addItem(foodItem.name, foodItem.description, foodItem.svg, foodItem.price)
    //   await hardhatTamiko.mint()
    //   await hardhatTamikoStore.buyItem(10, 0, owner.address)
    //   await hardhatTamikoStore.sendItem(0, 0)

    //   tamiko = await hardhatTamiko.tamikos(0)
    //   expect(tamiko['timesFed'].toNumber()).to.equal(1)

    //   await hardhatTamikoStore.sendItem(0, 0)
    //   await hardhatTamikoStore.sendItem(0, 0)
    //   tamiko = await hardhatTamiko.tamikos(0)
    //   expect(tamiko['timesFed'].toNumber()).to.equal(3)
    // })

    it('Should increment age from 1 to 2 only', async () => {
      let tamiko, tokenURI, json
      await hardhatTamikoStore.setTamikoContract(hardhatTamiko.address)
      await hardhatTamikoStore.addItem(foodItem.name, foodItem.description, foodItem.svg, foodItem.price, owner.address)
      await hardhatTamiko.mint()
      await hardhatTamikoStore.addItem(foodItem.name, foodItem.description, foodItem.svg, foodItem.price, owner.address)
      await hardhatTamikoStore.buyItem(10, 0, owner.address, { value: foodItem.price * 10 })
      await hardhatTamikoStore.sendItem(0, 0)

      tamiko = await hardhatTamiko.tamikos(0)
      expect(tamiko['level'].toNumber()).to.equal(0)

      await hardhatTamiko.startHatchingProcess(0)

      await hardhatTamikoStore.sendItem(0, 0)
      tamiko = await hardhatTamiko.tamikos(0)
      expect(tamiko['level'].toNumber()).to.equal(2)

      await hardhatTamikoStore.sendItem(0, 0)
      tamiko = await hardhatTamiko.tamikos(0)
      expect(tamiko['level'].toNumber()).to.equal(2)
    })
  })

  describe('Revive', async () => {
    it('Should revive', async () => {
      await hardhatTamikoStore.setTamikoContract(hardhatTamiko.address)
      await hardhatTamikoStore.addItem(foodItem.name, foodItem.description, foodItem.svg, foodItem.price, owner.address)
      await hardhatTamikoStore.addItem(magicPotionItem.name, magicPotionItem.description, magicPotionItem.svg, magicPotionItem.price, owner.address)
      await hardhatTamikoStore.addItem(reviveItem.name, reviveItem.description, reviveItem.svg, reviveItem.price, owner.address)
      await hardhatTamiko.mint()
      await hardhatTamikoStore.buyItem(10, 0, owner.address, { value: foodItem.price * 10 })
      await hardhatTamikoStore.sendItem(0, 0)

      await network.provider.send("evm_increaseTime", [(3600 * 24) * 30]) // 30 days
      await network.provider.send("evm_mine")
      tamiko = await hardhatTamiko.tamikos(0)
      isDead = await hardhatTamiko.isTamikoDead(0)
      expect(isDead).to.be.true

      await hardhatTamikoStore.buyItem(1, 2, owner.address, { value: magicPotionItem.price })
      await hardhatTamikoStore.sendItem(2, 0)
      tamiko = await hardhatTamiko.tamikos(0)
      isDead = await hardhatTamiko.isTamikoDead(0)
      expect(isDead).to.be.false
    })
  })

  describe('Magic Potion', async () => {
    it('Should increment age from 2 to 3', async () => {
      let tamiko
      await hardhatTamikoStore.setTamikoContract(hardhatTamiko.address)
      await hardhatTamikoStore.addItem(foodItem.name, foodItem.description, foodItem.svg, foodItem.price, owner.address)
      await hardhatTamikoStore.addItem(magicPotionItem.name, magicPotionItem.description, magicPotionItem.svg, magicPotionItem.price, owner.address)
      await hardhatTamiko.mint()

      await hardhatTamiko.startHatchingProcess(0)
      tamiko = await hardhatTamiko.tamikos(0)
      expect(tamiko['level'].toNumber()).to.equal(1)

      await hardhatTamikoStore.sendItem(0, 0)
      tamiko = await hardhatTamiko.tamikos(0)
      expect(tamiko['level'].toNumber()).to.equal(2)

      await hardhatTamikoStore.buyItem(1, 1, owner.address, { value: magicPotionItem.price })
      await hardhatTamikoStore.sendItem(1, 0)
      tamiko = await hardhatTamiko.tamikos(0)
      expect(tamiko['level'].toNumber()).to.equal(3)
    })

    it('Should not increment if other than age 2', async () => {
      let tamiko
      await hardhatTamikoStore.setTamikoContract(hardhatTamiko.address)
      await hardhatTamikoStore.addItem(foodItem.name, foodItem.description, foodItem.svg, foodItem.price, owner.address)
      await hardhatTamikoStore.addItem(magicPotionItem.name, magicPotionItem.description, magicPotionItem.svg, magicPotionItem.price, owner.address)
      await hardhatTamiko.mint()

      await hardhatTamiko.startHatchingProcess(0)
      tamiko = await hardhatTamiko.tamikos(0)
      expect(tamiko['level'].toNumber()).to.equal(1)

      await hardhatTamikoStore.buyItem(1, 1, owner.address, { value: magicPotionItem.price })
      await expect(hardhatTamikoStore.sendItem(1, 0)).to.revertedWith('Tamiko needs to be level 2')
    })
  })

  describe('Tamiko states', async () => {
    it('Should die', async () => {
      let tamiko, isDead;
      await hardhatTamikoStore.setTamikoContract(hardhatTamiko.address)
      await hardhatTamikoStore.addItem(foodItem.name, foodItem.description, foodItem.svg, foodItem.price, owner.address)
      await hardhatTamiko.mint()
      await hardhatTamikoStore.addItem(foodItem.name, foodItem.description, foodItem.svg, foodItem.price, owner.address)
      await hardhatTamikoStore.buyItem(10, 0, owner.address, { value: foodItem.price * 10 })
      await hardhatTamikoStore.sendItem(0, 0)

      tamiko = await hardhatTamiko.tamikos(0)
      isDead = await hardhatTamiko.isTamikoDead(0)
      expect(isDead).to.be.false

      // await network.provider.send("evm_increaseTime", [(3600 * 24) * 10]) // 10 days
      await network.provider.send("evm_increaseTime", [500])
      await network.provider.send("evm_mine")
      tamiko = await hardhatTamiko.tamikos(0)
      isDead = await hardhatTamiko.isTamikoDead(0)
      expect(isDead).to.be.false

      await network.provider.send("evm_increaseTime", [(3600 * 24) * 30]) // 30 days
      await network.provider.send("evm_mine")
      tamiko = await hardhatTamiko.tamikos(0)
      isDead = await hardhatTamiko.isTamikoDead(0)
      expect(isDead).to.be.true
    })

    it('Sould hatch', async () => {
      let tamiko
      await hardhatTamikoStore.setTamikoContract(hardhatTamiko.address)
      await hardhatTamikoStore.addItem(foodItem.name, foodItem.description, foodItem.svg, foodItem.price, owner.address)
      await hardhatTamiko.connect(addr1).mint()
      tamiko = await hardhatTamiko.tamikos(0)

      expect(tamiko['level']).to.equal(0)
      await expect(hardhatTamiko.connect(addr2).startHatchingProcess(0)).to.revertedWith('NotTamikoOwner()')
      await hardhatTamiko.connect(addr1).startHatchingProcess(0)

      const blockNumAfter = await ethers.provider.getBlockNumber();
      const blockAfter = await ethers.provider.getBlock(blockNumAfter);

      await network.provider.send("evm_increaseTime", [(3600)])
      await network.provider.send("evm_mine")

      tamiko = await hardhatTamiko.tamikos(0)
      const timings = await hardhatTamiko.timings(0)

      expect(tamiko['element'].toNumber()).to.below(11)
      expect(tamiko['level']).to.equal(1)
      expect(timings['hatchDate']).to.equal(blockAfter.timestamp)

      await expect(hardhatTamiko.connect(addr1).startHatchingProcess(0)).to.revertedWith('HasStartedHatching()')
    })
  })

  describe('TamikoLink', async () => {
    it('Should create a request', async () => {
      await hardhatTamikoLink.setTamikoContract(hardhatTamiko.address)
      await hardhatTamikoStore.setTamikoContract(hardhatTamiko.address)
      await hardhatTamikoStore.addItem(foodItem.name, foodItem.description, foodItem.svg, foodItem.price, owner.address)
      await hardhatTamiko.connect(addr1).mint()
      await hardhatTamiko.connect(addr2).mint()

      await hardhatTamikoLink.connect(addr1).createBreedingRequest(addr2.address, 0, 1)

      const request = await hardhatTamikoLink.requests(0)

      expect(request['id']).to.equal(0)
      expect(request['sender']).to.equal(addr1.address)
      expect(request['receiver']).to.equal(addr2.address)
      expect(request['senderTamiko']).to.equal(0)
      expect(request['receiverTamiko']).to.equal(1)
    })
    it('Should accept a request', async () => {
      await hardhatTamikoLink.setTamikoContract(hardhatTamiko.address)
      await hardhatTamikoStore.setTamikoContract(hardhatTamiko.address)
      await hardhatTamikoStore.addItem(foodItem.name, foodItem.description, foodItem.svg, foodItem.price, owner.address)
      await hardhatTamiko.connect(addr1).mint()
      await hardhatTamiko.connect(addr2).mint()

      await hardhatTamikoLink.connect(addr1).createBreedingRequest(addr2.address, 0, 1)

      await hardhatTamikoLink.connect(addr2).acceptBreedingRequest(0)

      const request = await hardhatTamikoLink.requests(0)
      const blockNumAfter = await ethers.provider.getBlockNumber();
      const blockAfter = await ethers.provider.getBlock(blockNumAfter);

      expect(request['acceptedAt']).to.equal(blockAfter.timestamp)
    })

    it('Should cancel a request', async () => {
      await hardhatTamikoLink.setTamikoContract(hardhatTamiko.address)
      await hardhatTamikoStore.setTamikoContract(hardhatTamiko.address)
      await hardhatTamikoStore.addItem(foodItem.name, foodItem.description, foodItem.svg, foodItem.price, owner.address)
      await hardhatTamiko.connect(addr1).mint()
      await hardhatTamiko.connect(addr2).mint()

      await hardhatTamikoLink.connect(addr1).createBreedingRequest(addr2.address, 0, 1)
      await hardhatTamikoLink.connect(addr1).cancelBreedingRequest(0)

      const request = await hardhatTamikoLink.requests(0)
      const blockNumAfter = await ethers.provider.getBlockNumber();
      const blockAfter = await ethers.provider.getBlock(blockNumAfter);

      expect(request['cancelledAt']).to.equal(blockAfter.timestamp)
    })

    it('Should redeem egg', async () => {

    })

    it('Should not create/accept/cancel a request', async () => {
      await hardhatTamikoLink.setTamikoContract(hardhatTamiko.address)
      await hardhatTamikoStore.setTamikoContract(hardhatTamiko.address)
      await hardhatTamikoStore.addItem(foodItem.name, foodItem.description, foodItem.svg, foodItem.price, owner.address)
      await hardhatTamiko.connect(addr1).mint()
      await hardhatTamiko.connect(addr2).mint()

      await expect(hardhatTamikoLink.connect(addr2).createBreedingRequest(addr1.address, 0, 0)).to.revertedWith('SameTamikoUsed()')
      await expect(hardhatTamikoLink.connect(addr1).createBreedingRequest(addr1.address, 0, 1)).to.revertedWith('ReceiverCantBeSender()')

      await hardhatTamikoLink.connect(addr1).createBreedingRequest(addr2.address, 0, 1)
      await expect(hardhatTamikoLink.connect(addr2).cancelBreedingRequest(0)).to.revertedWith('NotRequestOwner()')
      await hardhatTamikoLink.connect(addr1).cancelBreedingRequest(0)

      await hardhatTamikoLink.connect(addr2).createBreedingRequest(addr1.address, 1, 0)
      await hardhatTamikoLink.connect(addr1).acceptBreedingRequest(1)
      await expect(hardhatTamikoLink.connect(addr1).acceptBreedingRequest(1)).to.revertedWith('IsAlreadyBreeding()')
      await expect(hardhatTamikoLink.connect(addr2).redeemBreededEgg(1)).to.revertedWith('NotReadyYet()')
    })
  })

  describe('TamikoRenderer', async () => {
    it("Outputs egg", async () => {
      let tokenURI, json
      await hardhatTamikoStore.setTamikoContract(hardhatTamiko.address)
      await hardhatTamikoStore.addItem(foodItem.name, foodItem.description, foodItem.svg, foodItem.price, owner.address)
      await hardhatTamiko.connect(addr1).mint()
      tokenURI = await hardhatTamiko.tokenURI(0)
      json = getJsonMetadata(tokenURI)
      const egg = json.image
      // console.log(json.attributes)

      await hardhatTamiko.connect(addr1).startHatchingProcess(0)
      tokenURI = await hardhatTamiko.tokenURI(0)
      json = getJsonMetadata(tokenURI)
      const expectEgg = json.image

      expect(expectEgg).to.equal(egg)
    })

    it('Outputs level1', async () => {
      let tokenURI, json
      await hardhatTamikoStore.setTamikoContract(hardhatTamiko.address)
      await hardhatTamikoStore.addItem(foodItem.name, foodItem.description, foodItem.svg, foodItem.price, owner.address)
      await hardhatTamiko.connect(addr1).mint()
      await hardhatTamiko.connect(addr1).startHatchingProcess(0)

      await network.provider.send("evm_increaseTime", [(3600 * 24) * 1]) // 1h
      await network.provider.send("evm_mine")

      tokenURI = await hardhatTamiko.tokenURI(0)
      json = getJsonMetadata(tokenURI)
      // console.log(json.image)
    })

    it('Outputs level2', async () => {
      let tamiko, tokenURI, json
      await hardhatTamikoStore.setTamikoContract(hardhatTamiko.address)
      await hardhatTamikoStore.addItem(foodItem.name, foodItem.description, foodItem.svg, foodItem.price, owner.address)
      await hardhatTamikoStore.addItem(magicPotionItem.name, magicPotionItem.description, magicPotionItem.svg, magicPotionItem.price, owner.address)
      await hardhatTamiko.connect(addr1).mint()
      await hardhatTamiko.connect(addr1).startHatchingProcess(0)

      await network.provider.send("evm_increaseTime", [(3600 * 24) * 1]) // 1d
      await network.provider.send("evm_mine")

      tamiko = await hardhatTamiko.tamikos(0)
      // console.log(tamiko['level'])

      await hardhatTamikoStore.connect(addr1).buyItem(1, 0, addr1.address, { value: foodItem.price })
      await hardhatTamikoStore.connect(addr1).sendItem(0, 0)

      tamiko = await hardhatTamiko.tamikos(0)
      // console.log(tamiko['level'])

      await network.provider.send("evm_increaseTime", [(3600 * 1) * 1]) // 1h
      await network.provider.send("evm_mine")

      tamiko = await hardhatTamiko.tamikos(0)
      tokenURI = await hardhatTamiko.tokenURI(0)
      json = getJsonMetadata(tokenURI)
      // console.log(tamiko['level'])
      // console.log(json.attributes)
    })
  })

  describe('Access on Tamiko', async () => {
    // it("Can't mint more than once", async () => {
    //   await hardhatTamikoStore.setTamikoContract(hardhatTamiko.address)
    //   await hardhatTamikoStore.addItem(foodItem.name, foodItem.description, foodItem.svg, foodItem.price, owner.address)
    //   await hardhatTamiko.connect(addr1).mint()
    //   await expect(hardhatTamiko.connect(addr1).mint()).to.revertedWith('OnlyOneMintAllowed()')
    //   await hardhatTamiko.connect(addr2).mint()
    // })
    it('Owner should call onlyOwner functions', async () => {
      await hardhatTamiko.addNewItemContract(hardhatFood.address)
    })

    it('Guest should not call onlyOwner functions', async () => {
      await expect(hardhatTamiko.connect(addr1).addNewItemContract(hardhatFood.address)).to.be.revertedWith('Ownable: caller is not the owner')
    })

    it('Owner and Guest should not call receivedTamikoStoreItem', async () => {
      await hardhatTamikoStore.setTamikoContract(hardhatTamiko.address)
      await hardhatTamikoStore.addItem(foodItem.name, foodItem.description, foodItem.svg, foodItem.price, owner.address)
      await hardhatTamiko.connect(addr1).mint()
      await expect(hardhatTamiko.connect(addr1).receivedTamikoStoreItem(0, 0, 1, owner.address)).to.be.revertedWith('NotFromTamikoStoreContract()')
      await expect(hardhatTamiko.receivedTamikoStoreItem(0, 0, 1, owner.address)).to.be.revertedWith('NotFromTamikoStoreContract()')
    })
  })

  describe('Access on TamikoStore', async () => {
    it('Owner should call all functions', async () => {
      await hardhatTamikoStore.setTamikoContract(hardhatTamiko.address)
      await hardhatTamikoStore.addItem(foodItem.name, foodItem.description, foodItem.svg, foodItem.price, owner.address)
      await hardhatTamikoStore.editItem(0, 'food2', foodItem.description, foodItem.svg, foodItem.price, owner.address)
    })

    it('Guest should not call OnlyOwner functions', async () => {
      await expect(hardhatTamikoStore.connect(addr1).setTamikoContract(hardhatTamiko.address)).to.be.revertedWith('Ownable: caller is not the owner')
      await expect(hardhatTamikoStore.connect(addr1).addItem('food2', foodItem.description, foodItem.svg, foodItem.price, owner.address)).to.be.revertedWith('Ownable: caller is not the owner')
      await expect(hardhatTamikoStore.connect(addr1).editItem(0, 'food2', foodItem.description, foodItem.svg, foodItem.price, owner.address)).to.be.revertedWith('Ownable: caller is not the owner')
      await expect(hardhatTamikoStore.connect(addr1).airdrop(10, 0, owner.address)).to.be.revertedWith('NonExistentItem()')
    })
  })
})