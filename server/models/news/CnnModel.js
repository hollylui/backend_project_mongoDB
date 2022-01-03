const { Schema, model } = require("mongoose");
const newsSchemaContent = require("../schemaContent/newsSchemaContent");

const cnnSchema = new Schema(newsSchemaContent.newsArticle);

const CnnModel = model("cnns", cnnSchema);

module.exports = CnnModel;
