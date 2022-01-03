const axios = require("axios");
const cherrio = require("cheerio");
const MetroModel = require("../../models/news/MetroModel");

// Get information -------------------------------------
// Save to mongoDB
exports.save = async (req, res) => {
  try {
    await MetroModel.deleteMany();

    const newsURL = "https://metro.co.uk";
    const { data } = await axios.get(newsURL);
    const $ = cherrio.load(data, { scriptingEnabled: false });
    const newsItems = $(".metro__post");
    newsItems.each(async (idx, el) => {
      title = $(el).find("h3").text();
      url = $(el).find("h3").find("a").attr("href");
      imgPath = $(el)
        .find(".metro__post__media")
        .find("a")
        .find("picture img")
        .attr("src");

      const articleContent = {
        title: title,
        url: url,
        img: imgPath,
      };

      await MetroModel.create(articleContent);
    });

    return res.status(200).json("News are scrapped.");
  } catch (err) {
    return res.status(404).send(err.message);
  }
};

// List information ------------------------------------------
exports.list = async (req, res) => {
  try {
    const articles = await MetroModel.find().limit(8);
    if (!articles)
      return res
        .status(400)
        .send("Sorry, something went wrong. Please come back later.");
    return res.status(200).json(articles);
  } catch (err) {
    return res.status(404).send(err.message);
  }
};
