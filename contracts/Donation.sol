// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
import "hardhat/console.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import "@openzeppelin/contracts/utils/math/SafeCast.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@chainlink/contracts/src/v0.8/interfaces/FeedRegistryInterface.sol";

contract Donation {

    using SafeCast for int256;
    using SafeMath for uint256;

    AggregatorV3Interface internal eth_usd_price_feed;
    // FeedRegistryInterface internal registry;
    mapping(uint256 => DonationItem) public idToDonationItem;
    mapping(uint256 => mapping( uint256 => address)) public doners;
   
    uint public donersCount = 0;
    uint public donationCount = 0;

    constructor(){
      //  registry = FeedRegistryInterface(0xd441F0B98BcF34749391A3879A94caA95ffDB74D);
     eth_usd_price_feed = AggregatorV3Interface(0x9326BFA02ADD2366b30bacB125260Af641031331);
    }

    struct Doners {
      uint id;
      uint amount;
      uint date;
    }

    struct DonationItem {
      uint256 id;
      address payable owner;
      uint donationAmount;
      uint startDate;
      uint endDate;
      uint targetPrice;
      string category;
      string title;
      string hash;
      string description;
      bool completed;
    }

    event DonationItemCreated (
      uint256 indexed id,
      address  owner,
      uint donationAmount,
      uint donersConut,
      uint startDate,
      uint endDate,
      uint targetPrice,
      string category,
      string title,
      string hash,
      string description,
      bool completed
    );

    event DonationTiped (
      uint256 indexed id,
      address  sender,
      uint donationAmount
    );

     //get EthUsd
    function getEthUsd() public  view returns (uint) {
        (
            , int price, , , 
        ) = eth_usd_price_feed.latestRoundData();
        return price.toUint256();
     }

    function getLatestPrice() public view returns (int) {
        (
            uint80 roundID, 
            int price,
            uint startedAt,
            uint timeStamp,
            uint80 answeredInRound
        ) = eth_usd_price_feed.latestRoundData();
        // If the round is not complete yet, timestamp is 0
        require(timeStamp > 0, "Round not complete");
        return price;
    }

    //convert eth to USD
    function convertEthUsd(uint _amountInUsd) public view returns (uint) {
        uint EthUsd = getEthUsd();
        return _amountInUsd.mul(10 ** 16).div(EthUsd);
     }

    //create a new donation
    function uploadDonation(string memory _imageHash, string memory _description, uint _endDate, string memory _category, string memory _title, uint _targetPrice) public {
        //make sure the image hash exist
        require(bytes(_imageHash).length > 0 ,'Image Hash is required');
      
        //make sure image description exist
        require(bytes(_description).length > 0,'Image description is required');
        require(bytes(_category).length > 0,'Image description is required');
        require(bytes(_title).length > 0,'Image description is required');
     
        //make sure uploader address exist
        require(msg.sender != address(0x0));
        donationCount++;
        DonationItem storage donation = idToDonationItem[donationCount];
        donation.donationAmount = 0;
        donation.owner = payable(address(msg.sender));
        doners[donationCount][donersCount] = address(0x0);
        donation.startDate = block.timestamp;
        donation.endDate = _endDate;
        donation.targetPrice = _targetPrice;
        donation.category = _category;
        donation.title = _title;
        donation.id = donationCount;
        donation.hash = _imageHash;
        donation.description = _description;
        donation.completed = false;
        // emit DonationItemCreated(donationCount, payable(address(msg.sender)), 0, 0, block.timestamp, _endDate, _targetPrice, _category, _title, _imageHash, _description, false);
    }

    //add a donation
    function addDonation(uint _id) public payable {
        require(_id > 0 && _id <= donationCount);
        DonationItem storage _donation = idToDonationItem[_id];
        require(_donation.completed == false);
        require(_donation.donationAmount <= _donation.targetPrice);
       
        //check date if it expired.
        if(_donation.donationAmount >= _donation.targetPrice){
            _donation.completed = true;
        }

        address payable _owner = _donation.owner;
        _owner.transfer(msg.value);
        _donation.donationAmount = _donation.donationAmount + msg.value;
        donersCount++;
        doners[_donation.id][donersCount] = address(msg.sender);
        idToDonationItem[_id] = _donation;
        // emit DonationTiped(_id, msg.sender, msg.value);
    }

    

}