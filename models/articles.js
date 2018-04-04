var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  imageURL: {
    type: String,
    required: false
  },
  belongs_to: {
    type: String,
    required: true
  },
  votes: {
    type: Number,
    required: true,
    default: 0
  },
  created_by: {
    type: String,
    lowercase: true
  }
});

module.exports = mongoose.model("articles", ArticleSchema);
