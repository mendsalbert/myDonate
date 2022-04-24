import React from "react";

type Props = {};

const DonateModal = (props: Props) => {
  return (
    <div className="">
      <p className="text-center text-gray-500 text-lg">
        How much you wanna donate?
      </p>
      <div className="p-5">
        <div className="text-center border-2 border-gray-600 rounded-lg w-full">
          5 ETH
        </div>
      </div>
    </div>
  );
};

export default DonateModal;
