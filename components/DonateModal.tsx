import React from "react";

type Props = {};

const DonateModal = (props: Props) => {
  return (
    <div className="p-5 font-Montserrat">
      <p className="text-center text-gray-500 text-lg">
        How much you wanna donate?
      </p>
      <div className="py-3 space-y-2">
        <div className="text-center cursor-pointer border-[1px] border-opacity-30 text-lg border-gray-600 rounded-lg w-full py-2 bg-green-300 text-gray-700 ">
          5 ETH
        </div>
        <div className="text-center cursor-pointer border-[1px] border-opacity-30 text-lg border-gray-600 rounded-lg w-full py-2 bg-blue-300 text-gray-700 ">
          10 ETH
        </div>
        <div className="text-center cursor-pointer border-[1px] border-opacity-30 text-lg border-gray-600 rounded-lg w-full py-2 bg-purple-300 text-gray-700 ">
          15 ETH
        </div>
      </div>
    </div>
  );
};

export default DonateModal;
