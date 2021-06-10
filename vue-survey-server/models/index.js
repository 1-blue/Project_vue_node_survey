const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require("../config/config.json")[env];
const User = require("./user.js");
const Survey = require("./survey.js");
const Question = require("./question.js");
const Answer = require("./answer.js");

const db = {};
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config,
); // db와 node.js연결

db.sequelize = sequelize;

db.User = User;
db.Survey = Survey;
db.Question = Question;
db.Answer = Answer;

db.User.init(db.sequelize);
db.Survey.init(db.sequelize);
db.Question.init(db.sequelize);
db.Answer.init(db.sequelize);

db.User.associate(db);
db.Survey.associate(db);
db.Question.associate(db);
db.Answer.associate(db);

module.exports = db; // db객체에 sequelize, model모두 넣어두고 db를 require해서 편하게 사용
