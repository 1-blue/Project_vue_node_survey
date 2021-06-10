require("dotenv").config();
const morgan = require("morgan");
const express = require("express");
const path = require("path");
const session = require("express-session");
const app = express();

// 포트설정
app.set("port", process.env.PORT || 8081);

// 기본설정
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// 세션옵션값지정
const sessionOption = {
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: false,
  },
};

// 세션설정
if (process.env.NODE_ENV === "production") {
  sessionOption.proxy = true;
}
app.use(session(sessionOption));

// 모건설정
if (process.env.NODE_ENV === "production") {
  app.use(morgan("combined"));
} else {
  app.use(morgan("dev"));
}

// 시퀄라이즈 설정 ( DB )
const { sequelize } = require("./models");
sequelize
  .sync({ force: true })
  .then(() => {
    console.log("db연결 성공");
  })
  .catch(err => {
    console.error(err);
  });

app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(app.get("port"), () => {
  console.log(`${app.get("port")}번 대기중`);
});
