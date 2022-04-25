// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Donation {
    
    mapping(uint256 => DonationItem) private idToDonationItem;

    struct Doners {
      uint id;
      uint amount;
      uint date;
    }

    struct DonationItem {
      uint256 id;
      address payable owner;
      uint256 amount;
      Doners doners;
      uint startDate;
      uint endDate;
      uint targetPrice;
      string category;
      string hash;
      string description;
      bool completed;
    }

    event DonationItemCreated (
      uint256 indexed id,
      address  owner,
      uint256 amount,
      Doners doners,
      uint startDate,
      uint endDate,
      uint targetPrice,
      string category,
      string hash,
      string description,
      bool completed
    );


}