import puppeteer from "puppeteer";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import { setTimeout } from "node:timers/promises";

export class Crawler {
  public async crawlListings(city: string, pageNumber: string = '1', size: string = '5') {
    const puppeteer = require("puppeteer-extra");
    const StealthPlugin = require("puppeteer-extra-plugin-stealth");
    puppeteer.use(StealthPlugin());

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.setViewport({ width: 1280, height: 720 });

    // await page.goto('https://www.google.com');
    // await page.waitForSelector('textarea[name=q]');
    // await page.type('textarea[name=q]', 'zillow', {delay: 300});
    // await page.keyboard.press('Enter');
    // await page.waitForNavigation({ timeout: 30000 });
    // await page.screenshot({ path: '0.png', fullPage: true });

    await page.goto("https://www.zillow.com/homes/");
    //await page.screenshot({ path: '1.png', fullPage: true });

    await page.waitForSelector('input[type="text"]');
    //console.log(page.url());
    await page.type('input[type="text"]', city, { delay: 300 });
    await setTimeout(2000);

    await page.keyboard.press("Enter", { delay: 300 });

    await page.waitForNavigation({ timeout: 30000 });
    console.log(page.url());
    //await page.screenshot({ path: '2.png', fullPage: true });


    for (let i = 0; i < Number(pageNumber); i++) {    //to target page
      await page.waitForSelector('li[class^="PaginationJumpItem"]');
      const newPage = await page.$$('li[class^="PaginationJumpItem"]');
      if (newPage.length > 1) {
        await newPage[1].click({ delay: 300 });
      }
    }

    const listings = await page.evaluate(() => {
      const listingsArray = <any>[];
      const listingElements = document.querySelectorAll(
        'article[data-test="property-card"]'
      );

      listingElements.forEach((listing) => {
        const address =
          listing.querySelector('[data-test="property-card-addr"]')
            ?.textContent || "No address found";
        const price =
          (
            listing.querySelector('[data-test="property-card-price"]')
              ?.textContent || ""
          ).replace(/\D/g, "") || "No price found";

        const detailsList = listing.querySelector("ul"); // Selecting the first <ul> inside the listing
        const details = detailsList ? detailsList.querySelectorAll("li") : [];
        let bedrooms = "",
          bathrooms = "",
          sqft = "";
        details.forEach((detail) => {
          if ((detail.textContent || "").toLowerCase().includes("bd"))
            bedrooms = (detail.textContent || "").replace(/[^0-9.]/g, "");
          if ((detail.textContent || "").toLowerCase().includes("ba"))
            bathrooms = (detail.textContent || "").replace(/[^0-9.]/g, "");
          if ((detail.textContent || "").toLowerCase().includes("sqft"))
            sqft = (detail.textContent || "").replace(/[^0-9.]/g, "");
        });

        listingsArray.push({ address, price, bedrooms, bathrooms, sqft });
      });

      return listingsArray;
    });

    await browser.close();

    return listings.slice(0, Number(size));
  }
}
