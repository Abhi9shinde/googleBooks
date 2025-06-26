const puppeteer = require("puppeteer");

async function getBooks(topic) {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();
  await page.goto("https://books.google.com/");
  await page.type('input[name="q"]', topic);
  await page.keyboard.press("Enter");
  await page.waitForNavigation();

  const books = await page.evaluate(() => {
    const results = [];
    const itemsTitle = document.querySelectorAll(".bHexk, .c-wiz");
    const itemsSummary = document.querySelectorAll(".cmlJmd");
    for (let i = 0; i < 5 && i < itemsTitle.length; i++) {
      const title = itemsTitle[i].querySelector("h3")?.innerText || "No Title";
      const summary =
        itemsSummary[i].querySelector("span")?.innerText ||
        "No summary available";
      results.push({ title, summary });
    }
    return results;
  });

  await browser.close();
  return books;
}

module.exports = getBooks;
