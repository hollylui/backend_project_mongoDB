const axios = require("axios");
const cherrio = require("cheerio");
const TheGuardianModel = require("../../models/news/TheGuardianModel");

// Get information -------------------------------------
// Save to mongoDB
exports.save = async (req, res) => {
  try {
    await TheGuardianModel.deleteMany();

    const newsURL = "https://www.theguardian.com/uk-news";
    const { data } = await axios.get(newsURL);
    const $ = cherrio.load(data, { scriptingEnabled: false });
    const newsItems = $(".fc-container__inner");
    newsItems.each(async (idx, el) => {
      title = $(el).find(".fc-item__header").find("h3").text();
      url = $(el).find(".fc-item__header").find("h3").find("a").attr("href");
      imgPath = $(el)
        .find(".fc-item__media-wrapper div")
        .find("picture img")
        .attr("src");

      const articleContent = {
        title: title,
        url: url,
        img: imgPath,
      };

      await TheGuardianModel.create(articleContent);
    });

    return res.status(200).json("News are scrapped.");
  } catch (err) {
    return res.status(404).send(err.message);
  }
};

// List information ------------------------------------------
exports.list = async (req, res) => {
  try {
    const articles = await TheGuardianModel.find().limit(8);

    if (!articles)
      return res
        .status(400)
        .send("Sorry, something went wrong. Please come back later.");

    const filterArticles = articles.filter(
      (article) => article.img !== "undefined"
    );
    return res.status(200).json(filterArticles);
  } catch (err) {
    return res.status(404).send(err.message);
  }
};
