import { NextApiRequest, NextApiResponse } from "next";
import { sampleUserData } from "../../../utils/sample-data";
import https from "https";

const url = "https://api.coinmarketcap.com/v2/ticker/1027/?convert=USD";
const handler = (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    res.status(200).json(sampleUserData);
  } catch (err: any) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
};

export default handler;
