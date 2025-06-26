// const title = "Performance Marketing";
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
  const topic = "Performance Marketing";

  //Generate Subtopics
  console.log("Generating subtopics...");
  const subtopics = await getSubTopics(topic);
  console.log("Subtopics generated:\n", subtopics);

  const allBookData = [];

  for (let sub of subtopics) {
    console.log(`Searching books for subtopic: ${sub}`);
    const books = await getBooks(sub);

    if (!books.length) continue;

    const titles = books.map((b) => b.title);
    const availability = await checkBook(titles);

    const finalData = books.map((b, i) => ({
      title: b.title,
      summary: b.summary,
      available: availability[i],
    }));

    allBookData.push(...finalData);
  }

  //Write all results to Sheets
  console.log("\nWriting to Google Sheets...");
  await writeSheet(allBookData);
  console.log("All done!");
})();
