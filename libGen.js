const puppeteer = require("puppeteer");

async function checkBook(titles) {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();
  const results = [];

  for (let title of titles) {
    await page.goto("https://libgen.is/");
    await page.type('input[name="req"]', title);
    await page.keyboard.press("Enter");
    try {
      await page.waitForSelector('tr[bgcolor="#C6DEFF"]', { timeout: 8000 });
      available = true;
    } catch (e) {
      available = false;
    }

    results.push(available);
  }
  await browser.close();
  return results;
}

module.exports = checkBook;
