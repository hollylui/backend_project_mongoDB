const { Schema, model } = require("mongoose");
const newsSchemaContent = require("../schemaContent/newsSchemaContent");

const theTimesUkSchema = new Schema(newsSchemaContent.newsArticle);

const TheTimesUkModel = model("thetimesuks", theTimesUkSchema);

module.exports = TheTimesUkModel;
