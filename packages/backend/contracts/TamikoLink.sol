// SPDX-License-Identifier: CC0
pragma solidity ^0.8.14;

// Name: TamikoLink
// Description: Send/Accept breeding requests
// Twitter: @hellotamiko
// Design: biron.eth
// Build: bonhomme.eth

import "hardhat/console.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./Tamiko.sol";
import "./libraries/TamikoLibrary.sol";

contract TamikoLink is Ownable {
    struct BreedRequest {
        uint256 id;
        uint256 createdAt;
        uint256 acceptedAt;
        uint256 cancelledAt;
        address sender;
        address receiver;
        uint256 senderTamiko;
        uint256 receiverTamiko;
    }

    struct BreedingTamiko {
        bool isBreeding;
        uint256 startedBreedingAt;
    }

    Tamiko private tamiko;
    address private tamikoAddress;

    BreedRequest[] public requests;
    mapping(uint256 => BreedingTamiko) public breedingTamikos;

    error NonExistentTamiko();
    error NonExistentRequest();
    error NotReceiverAddress();
    error NotTamikoOwner();
    error NotRequestOwner();
    error NotReadyYet();
    error SameTamikoUsed();
    error ReceiverCantBeSender();
    error RequestHasBeenCancelled();
    error IsAlreadyBreeding();

    /**
     * @dev Checks if both Tamikos exists
     * @param _senderId TokenId of sender.
     * @param _receiverId TokenId of receiver.
     */
    modifier TamikosExist(uint256 _senderId, uint256 _receiverId) {
        if (
            _senderId >= tamiko.totalSupply() ||
            _receiverId >= tamiko.totalSupply()
        ) revert NonExistentTamiko();
        _;
    }

    /**
     * @dev Checks if a request is existing
     * @param _requestId Request's ID.
     */
    modifier isExistingRequest(uint256 _requestId) {
        if (_requestId >= requests.length) revert NonExistentRequest();
        _;
    }

    /**
     * @dev Checks that both Tamikos are different
     * @param _senderTamiko TokenId of sender.
     * @param _receiverTamiko TokenId of receiver.
     */
    modifier isNotSameTamiko(uint256 _senderTamiko, uint256 _receiverTamiko) {
        if (_senderTamiko == _receiverTamiko) revert SameTamikoUsed();
        _;
    }

    /**
     * @dev Checks that the sender is not the same as the receiver
     * @param _receiver Receiver's address.
     */
    modifier isNotReceiver(address _receiver) {
        if (msg.sender == _receiver) revert ReceiverCantBeSender();
        _;
    }

    /**
     * @dev Checks that the request has not been cancelled
     * @param _requestId Request's ID.
     */
    modifier isNotCancelled(uint256 _requestId) {
        if (requests[_requestId].cancelledAt > 0)
            revert RequestHasBeenCancelled();
        _;
    }

    /**
     * @dev Checks that both sender and receiver own their Tamikos
     * @param _senderId TokenId of sender.
     * @param _receiverId TokenId of receiver.
     * @param _sender Sender's address.
     * @param _receiver Receiver's address.
     */
    modifier ownsTamiko(
        uint256 _senderId,
        uint256 _receiverId,
        address _sender,
        address _receiver
    ) {
        if (
            isTamikoOwner(_senderId, _sender) &&
            isTamikoOwner(_receiverId, _receiver)
        ) {
            _;
        } else {
            revert NotTamikoOwner();
        }
    }

    /**
     * @dev Checks if a request can be redeemed
     * @param _requestId Request's ID.
     */
    modifier canBeRedeemed(uint256 _requestId) {
        if (
            TamikoLibrary.hasDatePassed(
                requests[_requestId].acceptedAt,
                TamikoLibrary.TIME_TO_BREED
            )
        ) {
            _;
        } else {
            revert NotReadyYet();
        }
    }

    /**
     * @dev Checks that caller is the request sender
     * @param _requestId Request's ID.
     */
    modifier isRequestOwner(uint256 _requestId) {
        if (requests[_requestId].sender != msg.sender) revert NotRequestOwner();
        _;
    }

    /**
     * @dev Update Tamiko's contract address.
     * @param _tamikoContract Contract address.
     */
    function setTamikoContract(address _tamikoContract) public onlyOwner {
        tamiko = Tamiko(_tamikoContract);
        tamikoAddress = _tamikoContract;
    }

    /**
     * @dev Checks if an address owns a specific tokenID.
     * @param _tokenId Tamiko's TokenID
     * @param _owner Owner's address
     * @return bool
     */
    function isTamikoOwner(uint256 _tokenId, address _owner)
        public
        view
        returns (bool)
    {
        if (tamiko.ownerOf(_tokenId) == _owner) return true;

        return false;
    }

    /**
     * @dev Checks if a Tamiko is already breeding.
     * @param _tokenId Tamiko's TokenID
     * @return bool
     */
    function isTamikoBreeding(uint256 _tokenId) public view returns (bool) {
        return breedingTamikos[_tokenId].isBreeding;
    }

    /**
     * @dev Creates a request from a specific Tamiko to another
     * @param _receiver Receiver's address
     * @param _senderTamiko Sender's Tamiko
     * @param _receiverTamiko Receiver's Tamiko
     */
    function createBreedingRequest(
        address _receiver,
        uint256 _senderTamiko,
        uint256 _receiverTamiko
    )
        public
        isNotReceiver(_receiver)
        TamikosExist(_senderTamiko, _receiverTamiko)
        isNotSameTamiko(_senderTamiko, _receiverTamiko)
        ownsTamiko(_senderTamiko, _receiverTamiko, msg.sender, _receiver)
    {
        requests.push(
            BreedRequest(
                requests.length,
                block.timestamp,
                0,
                0,
                msg.sender,
                _receiver,
                _senderTamiko,
                _receiverTamiko
            )
        );
    }

    /**
     * @dev Cancels a breeding request - Only the request creator can cancel it
     * @param _requestId Request to cancel
     */
    function cancelBreedingRequest(uint256 _requestId)
        public
        isExistingRequest(_requestId)
        isRequestOwner(_requestId)
    {
        requests[_requestId].cancelledAt = block.timestamp;
    }

    /**
     * @dev Accepts a breeding request - Only the request receiver can accept it
     * @param _requestId Request to accept
     */
    function acceptBreedingRequest(uint256 _requestId)
        public
        isExistingRequest(_requestId)
        isNotCancelled(_requestId)
    {
        if (msg.sender != requests[_requestId].receiver)
            revert NotReceiverAddress();
        if (!isTamikoOwner(requests[_requestId].receiverTamiko, msg.sender))
            revert NotTamikoOwner();
        if (
            isTamikoBreeding(requests[_requestId].receiverTamiko) ||
            isTamikoBreeding(requests[_requestId].senderTamiko)
        ) revert IsAlreadyBreeding();

        requests[_requestId].acceptedAt = block.timestamp;

        breedingTamikos[requests[_requestId].senderTamiko].isBreeding = true;
        breedingTamikos[requests[_requestId].senderTamiko]
            .startedBreedingAt = block.timestamp;
        breedingTamikos[requests[_requestId].receiverTamiko].isBreeding = true;
        breedingTamikos[requests[_requestId].receiverTamiko]
            .startedBreedingAt = block.timestamp;
    }

    /**
     * @dev Redeem 1 egg each once a request has been accepted and TIME_TO_BREED has passed
     * @param _requestId Request to redeem
     */
    function redeemBreededEgg(uint256 _requestId)
        public
        isExistingRequest(_requestId)
        canBeRedeemed(_requestId)
    {
        tamiko.airdrop(requests[_requestId].sender);
        tamiko.airdrop(requests[_requestId].receiver);
        breedingTamikos[requests[_requestId].senderTamiko].isBreeding = false;
        breedingTamikos[requests[_requestId].receiverTamiko].isBreeding = false;
    }
}
