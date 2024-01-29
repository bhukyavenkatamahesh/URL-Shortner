const mongoose = require("mongoose");

async function connectToMongoDB() {
  return mongoose.connect("mongodb://127.0.0.1:27017/url-db");
}

module.exports = connectToMongoDB;
