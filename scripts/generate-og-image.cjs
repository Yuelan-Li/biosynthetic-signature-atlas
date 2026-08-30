const path = require("node:path");
const { pathToFileURL } = require("node:url");
const { chromium } = require("playwright");

const pagePath = path.resolve("publications/biosynthetic-signatures/index.html");
const outputPath = path.resolve("images/og-index.jpg");

(async () => {
  const browser = await chromium.launch({ headless: true });
  try {
    const page = await browser.newPage({
      viewport: { width: 1200, height: 630 },
      deviceScaleFactor: 1,
    });
    await page.goto(pathToFileURL(pagePath).href, { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts && document.fonts.ready);
    await page.screenshot({
      path: outputPath,
      type: "jpeg",
      quality: 90,
      animations: "disabled",
    });
    console.log(`Generated ${outputPath} from ${pagePath}`);
  } finally {
    await browser.close();
  }
})();
