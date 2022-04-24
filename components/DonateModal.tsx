import React from "react";

type Props = {};

const DonateModal = (props: Props) => {
  return (
    <div className="p-5 font-Montserrat">
      <p className="text-center text-gray-500 text-lg">
        How much you wanna donate?
      </p>
      <div className="">
        <div className="text-center border-2 text-lg border-gray-600 rounded-lg w-full py-2 bg-green-300 text-gray-700 ">
          5 ETH
        </div>
      </div>
    </div>
  );
};

export default DonateModal;
