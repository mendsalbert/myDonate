// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Donation {

    mapping(uint256 => DonationItem) private idToDonationItem;
    uint public donationCount = 0 ;
    struct Doners {
      uint id;
      uint amount;
      uint date;
    }

    struct DonationItem {
      uint256 id;
      address payable owner;
      uint donationAmount;
      mapping(uint => address) doners;
      uint donersCount;
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

    //create a new donation
    function uploadDonation(string memory _imageHash, string memory _description, uint _startDate, uint _endDate, string memory _category, string memory _title, uint _targetPrice) public {
        //make sure the image hash exist
        require(bytes(_imageHash).length > 0 ,'Image Hash is required');
        //make sure image description exist
        require(bytes(_description).length > 0,'Image description is required');
        require(bytes(_category).length > 0,'Image description is required');
        require(bytes(_title).length > 0,'Image description is required');
     
        //make sure uploader address exist
        require(msg.sender != address(0x0));
        donationCount++;
        DonationItem storage donation = idToDonationItem[donationCount++];
        donation.donationAmount = 0;
        donation.owner = payable(address(msg.sender));
        donation.donersCount = 0;
        donation.doners[0] = address(0x0);
        donation.startDate = _startDate;
        donation.endDate = _endDate;
        donation.targetPrice = _targetPrice;
        donation.category = _category;
        donation.title = _title;
        donation.hash = _imageHash;
        donation.description = _description;
        donation.completed = false;
        emit DonationItemCreated(donationCount, payable(address(msg.sender)), 0, 0, _startDate, _endDate, _targetPrice, _category, _title, _imageHash, _description, false);
    }

    function addDonation(uint _id) public payable {
        require(_id > 0 && _id <= donationCount);
        DonationItem memory _donation = idToDonationItem[_id];
        address payable _owner = _donation.owner;
        _owner.transfer(msg.value);
        _donation.am = _image.tipAmount + msg.value;
        images[_id] = _image;
        emit ImageTip(_id, _image.hash, _image.description, _image.tipAmount, _author);
    }

}