import puppeteerExtra, { PuppeteerExtra } from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import { getHolders } from "./scrapper";
import { sendRevenueShare } from "./sendRevenueShare";
import { rpcConfig } from "./rpc";

const puppeteer = puppeteerExtra as unknown as PuppeteerExtra;
puppeteer.use(StealthPlugin());

(async () => {
  rpcConfig();

  const toRepeat = async () => {
    const gotHolders = await getHolders();

    if (gotHolders) {
      await sendRevenueShare();
    }

    setTimeout(() => toRepeat(), 60 * 1000);
  };

  toRepeat();
})();
