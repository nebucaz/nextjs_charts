const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;

//db.user = require("./User");
//db.role = require("./Role");
//db.category = require("./Category");
//db.topic = require("./Topic");
db.item = require("./Item");

//db.ROLES = ["user", "admin", "expert"];
//db.TOPICS = ["innovation", "it-architecture"];
//db.CATEGORIES = ["book", "video", "paper"];

module.exports = db;
