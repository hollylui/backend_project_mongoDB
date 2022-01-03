const axios = require("axios");
const cherrio = require("cheerio");
const TheTimesUkModel = require("../../models/news/TheTimesUkModel");

// Get information -------------------------------------
// Save to mongoDB
exports.save = async (req, res) => {
  try {
    await TheTimesUkModel.deleteMany();

    const newsURL = "https://www.thetimes.co.uk";
    const { data } = await axios.get(newsURL);
    const $ = cherrio.load(data, { scriptingEnabled: false });
    const newsItems = $(".T-3 ");

    newsItems.each(async (idx, el) => {
      title = $(el).find(".Item-content").children("h3").text();
      url = newsURL + $(el).find(".Item-content").find("a").attr("href");
      withVideo = $(el).find(".Item-media").find("img").attr("src");

      withoutVideo = $(el)
        .find(".Item-media")
        .find("a")
        .find("div")
        .find("img")
        .attr("src");

      imgPath = withoutVideo === undefined ? withVideo : withoutVideo;

      const articleContent = {
        title: title,
        url: url,
        img: "https:" + imgPath,
      };

      await TheTimesUkModel.create(articleContent);
    });

    return res.status(200).json("News are scrapped.");
  } catch (err) {
    return res.status(404).send(err.message);
  }
};

// List information ------------------------------------------
exports.list = async (req, res) => {
  try {
    const articles = await TheTimesUkModel.find().limit(8);
    if (!articles)
      return res
        .status(400)
        .send("Sorry, something went wrong. Please come back later.");
    return res.status(200).json(articles);
  } catch (err) {
    return res.status(404).send(err.message);
  }
};
