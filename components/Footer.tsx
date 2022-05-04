import React from "react";

type Props = {};

const Footer = (props: Props) => {
  return (
    <footer>
      <div className="mt-28 text-center w-full py-4 flex flex-col justify-center items-center">
        <p className="text-lg text-gray-500 ">Connet with us</p>
        <div className="flex flex-row space-x-4 cursor-pointer">
          <img src="/images/twitter.svg" className="w-7" />
          <img src="/images/discord.svg" className="w-10" />
          <img src="/images/instagram.svg" className="w-7" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
