// Rendert eine Grafik-Vorlage (HTML) als PNG.
// Aufruf: node docs/diagrams/render.js <vorlage.html> <ziel.png> [breite] [höhe]
// Projektbilder: 1280×800 (16:10), Vorschaubild für Social Media: 1200×630
const path = require("path");
const { chromium } = require("playwright");

const [input, output, width = "1280", height = "800"] = process.argv.slice(2);
if (!input || !output) {
  console.error("Usage: node docs/diagrams/render.js <input.html> <output.png> [width] [height]");
  process.exit(1);
}

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: Number(width), height: Number(height) } });
  await page.goto("file://" + path.resolve(input));
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: output });
  await browser.close();
})();
