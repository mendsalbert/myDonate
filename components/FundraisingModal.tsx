import React from "react";

type Props = {};

const FundRaising = (props: Props) => {
  return (
    <div className="p-5 font-Montserrat overflow-auto">
      <p className="text-center text-gray-500 text-lg">
        How much you wanna donate?
      </p>
      <div className="py-3 space-y-3">
        <input
          type="text"
          className="w-full py-3 outline-none ring-2 rounded-lg p-3"
          placeholder="Enter title "
        />
        <input
          type="text"
          className="w-full py-3 outline-none ring-2 rounded-lg p-3"
          placeholder="Enter description"
        />

        <label className="pt-2">Select category</label>
        <select className="w-full py-3 outline-none ring-2 rounded-lg p-3">
          <option value="education"></option>
          <option value="education">Education</option>
          <option value="disaster">Disaster</option>
          <option value="health">Health</option>
          <option value="famine">Famine</option>
        </select>

        <input
          type="date"
          className="w-full py-3 outline-none ring-2 rounded-lg p-3"
          placeholder="Enter amount manually"
        />
        <div className="bg-gradient-to-r from-cyan-500 to-blue-500 px-6 py-3 rounded-lg text-center cursor-pointer text-white">
          Continue
        </div>
      </div>
    </div>
  );
};

export default FundRaising;
