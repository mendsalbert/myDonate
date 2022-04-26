// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
import "hardhat/console.sol";
contract Donation {

    mapping(uint256 => DonationItem) public idToDonationItem;
    mapping(uint256 => address) public doners;
    uint public donersCount = 0;
    uint public donationCount = 0;

    struct Doners {
      uint id;
      uint amount;
      uint date;
    }

    struct DonationItem {
      uint256 id;
      address payable owner;
    //   mapping(uint=>address) doners;
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
      
    );

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
        donersCount++;
        DonationItem storage donation = idToDonationItem[donationCount];
        donation.donationAmount = 0;
        donation.owner = payable(address(msg.sender));
        doners[donationCount++] = address(0x0);
        donation.startDate = block.timestamp;
        donation.endDate = _endDate;
        donation.targetPrice = _targetPrice;
        donation.category = _category;
        donation.title = _title;
        donation.hash = _imageHash;
        donation.description = _description;
        donation.completed = false;
        // emit DonationItemCreated(donationCount, payable(address(msg.sender)), 0, 0, block.timestamp, _endDate, _targetPrice, _category, _title, _imageHash, _description, false);
    }

    function addDonation(uint _id) public payable {
        require(_id > 0 && _id <= donationCount);
        doners[_id];
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
        console.log(msg.sender);
        doners[_donation.id] = address(msg.sender);
        console.log(doners[1]);
        donersCount = donationCount;
        idToDonationItem[_id] = _donation;
        // emit ImageTip(_id, _image.hash, _image.description, _image.tipAmount, _author);
    }

}