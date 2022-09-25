// SPDX-License-Identifier: CC0
pragma solidity ^0.8.14;

// Name: Tamiko Store
// Description: Add, Buy and Send items to use on Tamiko
// Twitter: @hellotamiko
// Design: biron.eth
// Build: bonhomme.eth

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./utils/Base64.sol";
import "./Tamiko.sol";
import "./libraries/TamikoLibrary.sol";

contract TamikoStore is ERC1155, Ownable {
    string public name = "TamikoStore";
    string public description =
        "TamikoStore is where you buy items for your Tamiko";

    TamikoLibrary.Item[] public items;
    uint256 public totalItems;

    Tamiko public tamiko;
    address public tamikoAddress;

    error NonExistentItem();
    error NonExistentTamiko();
    error IsNotAuthorised();
    error MinimumNotMet();

    /**
     * @dev Checks if an Item exists
     * @param _itemId Tamiko's token ID.
     */
    modifier isItem(uint256 _itemId) {
        if (_itemId >= items.length) revert NonExistentItem();
        _;
    }

    /**
     * @dev Checks if Tamiko exists
     * @param _tokenId Tamiko's token ID.
     */
    modifier isExistingTamiko(uint256 _tokenId) {
        if (_tokenId >= tamiko.totalSupply()) revert NonExistentTamiko();
        _;
    }

    /**
     * @dev Checks if caller is either owner or Tamiko contract
     */
    modifier isFromAuthorisedAddress() {
        if (msg.sender == tamikoAddress || msg.sender == owner()) {
            _;
        } else {
            revert IsNotAuthorised();
        }
    }

    /**
     * @dev Checks if a quantity is not 0
     * @param _q Quantity.
     */
    modifier isNotZero(uint256 _q) {
        if (_q == 0) revert MinimumNotMet();
        _;
    }

    constructor() ERC1155("") {}

    /**
     * @dev Updates Tamiko contract address
     * @param _tamikoContract Contract address
     */
    function setTamikoContract(address _tamikoContract) public onlyOwner {
        tamiko = Tamiko(_tamikoContract);
        tamikoAddress = _tamikoContract;
    }

    /**
     * @dev Add a new Item to the store
     * @param _name Item name
     * @param _description Item description
     * @param _svg SVG string
     * @param _priceInWei Price in WEI
     * @param _creator Creator's address
     */
    function addItem(
        string memory _name,
        string memory _description,
        string memory _svg,
        uint256 _priceInWei,
        address payable _creator
    ) external onlyOwner {
        items.push(
            TamikoLibrary.Item(
                items.length,
                _name,
                _description,
                _svg,
                _priceInWei,
                _creator
            )
        );
        totalItems++;
    }

    /**
     * @dev Edits an existing Item
     * @param _name Item name
     * @param _description Item description
     * @param _svg SVG string
     * @param _priceInWei Price in WEI
     * @param _creator Creator's address
     */
    function editItem(
        uint256 _itemId,
        string memory _name,
        string memory _description,
        string memory _svg,
        uint256 _priceInWei,
        address payable _creator
    ) external onlyOwner isItem(_itemId) {
        items[_itemId].name = _name;
        items[_itemId].description = _description;
        items[_itemId].svg = _svg;
        items[_itemId].price = _priceInWei;
        items[_itemId].creator = _creator;
    }

    /**
     * @dev Mints an item - 80% of item price goes to Item creator
     * @param _q Quantity to mint
     * @param _itemId Item to mint
     * @param _address Minter's address
     */
    function buyItem(
        uint256 _q,
        uint256 _itemId,
        address _address
    ) external payable isItem(_itemId) isNotZero(_q) {
        uint256 price = items[_itemId].price * _q;
        require(msg.value >= price);
        address payable receiver = payable(items[_itemId].creator);
        _mint(_address, _itemId, _q, "");

        receiver.transfer((price / 5) * 4);
    }

    /**
     * @dev Airdrops an item to an address
     * @param _q Quantity to mint
     * @param _itemId Item to mint
     * @param _address Receiver's address
     */
    function airdrop(
        uint256 _q,
        uint256 _itemId,
        address _address
    ) external isItem(_itemId) isFromAuthorisedAddress {
        _mint(_address, _itemId, _q, "");
    }

    /**
     * @dev Gives an item to a specific Tamiko
     * @param _itemId Item to give
     * @param _tokenId Receiver Tamiko
     */
    function sendItem(uint256 _itemId, uint256 _tokenId)
        external
        isItem(_itemId)
        isExistingTamiko(_tokenId)
    {
        tamiko.receivedTamikoStoreItem(_tokenId, _itemId, 1, msg.sender);
        _burn(msg.sender, _itemId, 1);
    }

    function uri(uint256 _tokenId)
        public
        view
        virtual
        override
        returns (string memory)
    {
        return metadata(_tokenId);
    }

    function metadata(uint256 _tokenId) internal view returns (string memory) {
        return
            string(
                abi.encodePacked(
                    "data:application/json;base64,",
                    Base64.encode(
                        bytes(
                            abi.encodePacked(
                                "{",
                                '"name": "',
                                items[_tokenId].name,
                                '",',
                                '"description": "TamikoStore item",',
                                '"image": "',
                                items[_tokenId].svg,
                                '"',
                                "}"
                            )
                        )
                    )
                )
            );
    }
}
