import StealthPlugin from "puppeteer-extra-plugin-stealth";
import { TOKEN_URL } from "@/utils/env";
import { log } from "@/utils/handlers";
import { sleep } from "@/utils/time";
import { ElementHandle } from "puppeteer";
import puppeteerExtra, { PuppeteerExtra } from "puppeteer-extra";
import { holders } from "@/vars";

const puppeteer = puppeteerExtra as unknown as PuppeteerExtra;
puppeteer.use(StealthPlugin());

export async function getHolders() {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  await page.goto(TOKEN_URL || "");
  await sleep(10000);

  const [nextButton] = await page.$x(
    "/html/body/div[1]/section/main/div/div[4]/div[2]/div/div[2]/div[2]/button[2]"
  );
  let totalHolding = 0;

  if (nextButton) {
    // eslint-disable-next-line
    extractingHolders: for (const _ of Array.from(Array(10))) {
      const [table] = await page.$x(
        "/html/body/div/section/main/div/div[4]/div[2]/div/div[2]/div[1]/div/div/div/div/div/div/div/table/tbody"
      );

      if (table) {
        // Extract the text content of the selected element
        const rows = await table.$$(".ant-table-row");

        for (const row of rows) {
          const columns = await row.$$("td");

          const href = await columns[2].$eval("a", (anchor) => anchor.getAttribute("href"));
          const address = href?.split("/").at(-1);

          const holding = Number(
            (await page.evaluate((el) => el.textContent, columns[4]))?.replace("%", "")
          );

          if (address) {
            if (holding >= 1) {
              totalHolding += holding;
              holders.push([address, holding]);
            } else {
              break extractingHolders;
            }
          }
        }

        await (nextButton as ElementHandle<Element>).click();
        await sleep(2000);
      } else {
        log("No table found");
        await browser.close();
        return false;
      }
    }
  }

  for (const [index, [holder, holding]] of holders.entries()) {
    const newHolding = parseFloat(((holding / totalHolding) * 100).toFixed(4)); // holding in proportion to holders with >1% holding
    holders[index] = [holder, newHolding];
  }

  await browser.close();
  return true;
}
