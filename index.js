const title = "Performance Marketing";
const getSubTopics = require("./gemini");
const getBooks = require("./bookScrape");
const checkBook = require("./libGen");
const writeSheet = require("./sheets");

// getSubTopics(title).then((subtopics) => {
//   console.log("Subtopics:");
//   console.log(subtopics);
// });

// getBooks(title).then((books) => {
//   console.log(books);
// });

// checkBook([
//   "Marketing Performance: How Marketers Drive Profitable Growth",
//   "sdfsf",
// ]).then((res) => {
//   console.log(res);
// });

(async () => {
  // Generating SubTopics
  console.log("Generating subtopics:...");
  const subtopics = await getSubTopics(title);
  console.log("Subtopics generated:", subtopics);

  //Scrape Books
  console.log("Scraping books:...");
  const books = await getBooks(title);
  console.log("Books scraped:", books);

  //Check Availability
  const titles = books.map((b) => b.title);
  const available = await checkBook(titles);
  console.log(available);

  const finalBookData = books.map((b, i) => ({
    ...b,
    available: available[i],
  }));

  //Wrinting in Sheeets
  await writeSheet(finalBookData);
  console.log("Books data written to Google Sheets successfully.");
})();
