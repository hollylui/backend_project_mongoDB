const { Schema, model } = require("mongoose");
const newsSchemaContent = require("../schemaContent/newsSchemaContent");

const theGuardianSchema = new Schema(newsSchemaContent.newsArticle);

const TheGuardianModel = model("theguardians", theGuardianSchema);

module.exports = TheGuardianModel;
