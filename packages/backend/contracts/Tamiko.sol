// SPDX-License-Identifier: CC0
pragma solidity ^0.8.14;

// Name: Tamiko
// Description: Base Tamiko contract - Mint and Store Tamikos state
// Twitter: @hellotamiko
// Design: biron.eth
// Build: himlate.eth
//________________________________________________________________________________________________________________________
//________________________________________________________________________________________________________________________
//___/\\\\\\\\\\\\\\\_____/\\\\\\\\\_____/\\\\____________/\\\\__/\\\\\\\\\\\__/\\\________/\\\_______/\\\\\______________
//___\///////\\\/////____/\\\\\\\\\\\\\__\/\\\\\\________/\\\\\\_\/////\\\///__\/\\\_____/\\\//______/\\\///\\\___________
//__________\/\\\________/\\\/////////\\\_\/\\\//\\\____/\\\//\\\_____\/\\\_____\/\\\__/\\\//_______/\\\/__\///\\\________
//___________\/\\\_______\/\\\_______\/\\\_\/\\\\///\\\/\\\/_\/\\\_____\/\\\_____\/\\\\\\//\\\______/\\\______\//\\\______
//____________\/\\\_______\/\\\\\\\\\\\\\\\_\/\\\__\///\\\/___\/\\\_____\/\\\_____\/\\\//_\//\\\____\/\\\_______\/\\\_____
//_____________\/\\\_______\/\\\/////////\\\_\/\\\____\///_____\/\\\_____\/\\\_____\/\\\____\//\\\___\//\\\______/\\\_____
//______________\/\\\_______\/\\\_______\/\\\_\/\\\_____________\/\\\_____\/\\\_____\/\\\_____\//\\\___\///\\\__/\\\______
//_______________\/\\\_______\/\\\_______\/\\\_\/\\\_____________\/\\\__/\\\\\\\\\\\_\/\\\______\//\\\____\///\\\\\/______
//________________\///________\///________\///__\///______________\///__\///////////__\///________\///_______\/////_______
//________________________________________________________________________________________________________________________
//________________________________________________________________________________________________________________________

import "hardhat/console.sol";
import "erc721a/contracts/ERC721A.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "./utils/Helpers.sol";
import "./utils/Base64.sol";
import "./utils/SVG.sol";
import "./libraries/TamikoLibrary.sol";
import "./interfaces/ITamikoItem.sol";
import "./TamikoStore.sol";
import "./TamikoRenderer.sol";
import "./TamikoLink.sol";

contract Tamiko is ERC721A, Ownable {
    /* TODO: proper description */
    string public description = "Tamiko is cute and likes food";
    /* TODO: think about max supply and max mintable (breed etc) */
    uint8 public constant MAX_MINTABLE = 100;
    uint8 public constant MAX_SUPPLY = 200;

    address public tamikoStoreAddress;
    address public tamikoLinkAddress;

    TamikoStore tamikoStore;
    TamikoRenderer tamikoRenderer;
    TamikoLink tamikoLink;

    string[10] public ELEMENTS = [
        "neutral",
        "fire",
        "bug",
        "water",
        "electric",
        "ghost",
        "dark",
        "ice",
        "grass",
        "magic"
    ];

    ITamikoItem[] public itemContracts;

    mapping(uint256 => TamikoLibrary.CuteTamiko) public tamikos;
    mapping(uint256 => TamikoLibrary.Skills) public skills;
    mapping(uint256 => TamikoLibrary.Timings) public timings;
    mapping(address => uint256) public players;
    mapping(address => bool) public hasAddressMinted;

    /**
     * @dev Tamiko contructor - Sets contract addresses.
     * @param _tamikoRendererAddress Address of TamikoRenderer contract.
     * @param _tamikoStoreAddress Address of TamikoStore contract.
     * @param _tamikoStoreAddress Address of TamikoStore contract.
     * @param _tamikoLinkAddress Address of TamikoLink contract.
     * @param _foodContractAddress Address of Food item contract.
     * @param _magicPotionContractAddress Address of MagicPotion item contract.
     * @param _reviveAddress Address of Revive item contract.
     */
    constructor(
        address _tamikoRendererAddress,
        address _tamikoStoreAddress,
        address _tamikoLinkAddress,
        address _foodContractAddress,
        address _magicPotionContractAddress,
        address _reviveAddress
    ) ERC721A("Tamiko", "TAMIKO") {
        tamikoStoreAddress = _tamikoStoreAddress;
        tamikoLinkAddress = _tamikoLinkAddress;
        tamikoStore = TamikoStore(_tamikoStoreAddress);
        tamikoRenderer = TamikoRenderer(_tamikoRendererAddress);
        tamikoLink = TamikoLink(_tamikoLinkAddress);
        itemContracts.push(ITamikoItem(_foodContractAddress));
        itemContracts.push(ITamikoItem(_magicPotionContractAddress));
        itemContracts.push(ITamikoItem(_reviveAddress));
    }

    error NonExistentTamiko();
    error NotFromTamikoStoreContract();
    error NotFromTamikoLinkContract();
    error OnlyOneMintAllowed();
    error ExceedingSupply();
    error NotTamikoOwner();
    error HasStartedHatching();

    /**
     * @dev Checks if Tamiko exists
     * @param _tokenId Tamiko's token ID.
     */
    modifier isExistingTamiko(uint256 _tokenId) {
        if (_tokenId >= totalSupply()) revert NonExistentTamiko();
        _;
    }

    /**
     * @dev Checks if caller is TamikoStore
     */
    modifier isFromTamikoStore() {
        if (msg.sender != tamikoStoreAddress)
            revert NotFromTamikoStoreContract();
        _;
    }

    /**
     * @dev Checks if caller is TamikoLink
     */
    modifier isFromTamikoLink() {
        if (msg.sender != tamikoLinkAddress) revert NotFromTamikoLinkContract();
        _;
    }

    /**
     * @dev Checks if caller has never minted before
     */
    modifier hasNeverMinted() {
        if (hasAddressMinted[msg.sender] == true) revert OnlyOneMintAllowed();
        _;
    }

    /**
     * @dev Checks if we can still mint
     */
    modifier isUnderMaxSupply() {
        if (_totalMinted() + 1 > MAX_MINTABLE) revert ExceedingSupply();
        _;
    }

    /**
     * @dev Checks if caller owns a specific tokenId
     * @param _tokenId Tamiko's token ID.
     */
    modifier isTokenOwner(uint256 _tokenId) {
        if (ownerOf(_tokenId) != msg.sender) revert NotTamikoOwner();
        _;
    }

    /**
     * @dev Checks if a specific Tamiko has not been hatched yet.
     * @param _tokenId Tamiko's token ID.
     */
    modifier hasNotHatched(uint256 _tokenId) {
        if (timings[_tokenId].hatchDate > 0) revert HasStartedHatching();
        _;
    }

    /**
     * @dev Updates TamikoStore address.
     * @param _tamikoStoreAddress Address of TamikoStore contract.
     */
    function setTamikoStore(address _tamikoStoreAddress) external onlyOwner {
        tamikoStoreAddress = _tamikoStoreAddress;
        tamikoStore = TamikoStore(_tamikoStoreAddress);
    }

    /**
     * @dev Pushes a new contract address into `itemContracts`
     * @param _contractAddress Address of the new item contract.
     */
    function addNewItemContract(address _contractAddress) external onlyOwner {
        itemContracts.push(ITamikoItem(_contractAddress));
    }

    /**
     * @dev Checks if a specific tamiko is dead
     * @param _tokenId Tamiko's token ID.
     * @return bool
     */
    function isTamikoDead(uint256 _tokenId)
        public
        view
        isExistingTamiko(_tokenId)
        returns (bool)
    {
        TamikoLibrary.Timings memory _timings = timings[_tokenId];
        return TamikoLibrary.isTamikoDead(_timings);
    }

    /**
     * @dev Checks if a specific tamiko is dead
     * @param _tokenId Tamiko's token ID.
     * @param _itemId Item's index from `itemContracts` array
     * @param _quantity Quantity of Item being used
     * @param _from Address sending the item
     */
    function receivedTamikoStoreItem(
        uint256 _tokenId,
        uint256 _itemId,
        uint256 _quantity,
        address _from
    ) public isExistingTamiko(_tokenId) isFromTamikoStore {
        (
            TamikoLibrary.CuteTamiko memory newTamiko,
            TamikoLibrary.Timings memory newTimings,
            TamikoLibrary.Skills memory newSkills
        ) = itemContracts[_itemId].useItem(
                tamikos[_tokenId],
                timings[_tokenId],
                skills[_tokenId]
            );

        tamikos[_tokenId].breeder = newTamiko.breeder;
        tamikos[_tokenId].level = newTamiko.level;
        tamikos[_tokenId].seed = newTamiko.seed;

        timings[_tokenId].lastFed = newTimings.lastFed;

        skills[_tokenId].power = newSkills.power;
        skills[_tokenId].speed = newSkills.speed;
        skills[_tokenId].defense = newSkills.defense;

        players[_from]++;
    }

    /**
     * @dev Starts the hatching process of a specific Tamiko
     * @param _tokenId Tamiko's token ID.
     */
    function startHatchingProcess(uint256 _tokenId)
        external
        isExistingTamiko(_tokenId)
        isTokenOwner(_tokenId)
        hasNotHatched(_tokenId)
    {
        tamikos[_tokenId].element = helpers.getRandomInteger(
            "element",
            tamikos[_tokenId].seed,
            0,
            ELEMENTS.length + 1
        );
        tamikos[_tokenId].hatcher = msg.sender;
        tamikos[_tokenId].level = 1;

        timings[_tokenId].hatchDate = block.timestamp;
    }

    /**
     * @dev Mints a Tamiko: It stores a seed and the breeder as well as airdrops 10 Food item to the sender
     */
    function mint() external payable hasNeverMinted isUnderMaxSupply {
        uint256 _currentTokenId = _nextTokenId();

        _mint(msg.sender, 1);
        hasAddressMinted[msg.sender] = true;
        tamikoStore.airdrop(10, 0, msg.sender);

        tamikos[_currentTokenId].seed = uint256(
            keccak256(
                abi.encodePacked(_currentTokenId, msg.sender, block.timestamp)
            )
        );
        tamikos[_currentTokenId].breeder = msg.sender;
    }

    /**
     * @dev Airdrops a Tamiko to an address - This is used when breeding two Tamikos from TamikoLink
     * @param _address Recipient's address
     */
    function airdrop(address _address) public isFromTamikoLink {
        uint256 _currentTokenId = _nextTokenId();
        _mint(_address, 1);

        tamikos[_currentTokenId].seed = uint256(
            keccak256(
                abi.encodePacked(_currentTokenId, _address, block.timestamp)
            )
        );
        tamikos[_currentTokenId].breeder = _address;
    }

    /**
     * @dev Returns a specific Tamiko's metadata
     * @param _tokenId Tamiko's token ID.
     * @return string JSON as base64
     */
    function tokenURI(uint256 _tokenId)
        public
        view
        override
        isExistingTamiko(_tokenId)
        returns (string memory)
    {
        return
            tamikoRenderer.tokenURI(
                tamikos[_tokenId],
                timings[_tokenId],
                skills[_tokenId]
            );
    }
}
