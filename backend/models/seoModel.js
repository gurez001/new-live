const mongoose = require("mongoose");

const seoSchema = new mongoose.Schema({
  seo_uuid: {
    type: String,
    default: null,
  },
  seo_title: {
    type: String,
    maxlength: [60, "Title should be lower then 60 characters"],
    default: null,
  },
  seo_keyword: {
    type: [String],
    default: null,
  },
  seo_description: {
    type: String,
    maxlength: [160, "Description should be lower then 160 characters"],
    default: null,
  },
  seo_link: {
    type: String,
    unique: true,
    maxlength: [60, "Link should be lower then 60 characters"],
    default: null,
  },
  product_uuid: {
    type: String,
    default: null,
  },
});

module.exports = mongoose.model("SEO", seoSchema);
