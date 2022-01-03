const { Schema, model } = require("mongoose");
const newsSchemaContent = require("../schemaContent/newsSchemaContent");

const metroSchema = new Schema(newsSchemaContent.newsArticle);

const MetroModel = model("metros", metroSchema);

module.exports = MetroModel;
