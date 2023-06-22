const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const rootDir = require("./util/path");
const session=require("express-session");
const MongoDBStore=require("connect-mongodb-session")(session);
const csurf=require('csurf');

const csurfKoruma=csurf();

const MONGODB_URI="mongodb+srv://Yagmur:saydam14@cluster0.3qhe1pz.mongodb.net/?retryWrites=true&w=majority";
const mongoose = require("mongoose");

const app = express();

const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection:'sessions'
  });

  

app.set("view engine", "ejs");
app.set("views", "views");

const hataController = require("./controllers/hata");

const yoneticiVerisi = require("./routes/yonetici");
const publicRoutes = require("./routes/public");
const yetkiRoutes = require("./routes/yetki"); 

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(rootDir, "public")));

app.use(session({secret:'secret', resave:false, saveUnitialized:false, store:store}));



app.use(csurfKoruma);
app.use((err, req, res, next) => {
  if (err && err.code === 'EBADCSRFTOKEN') {
    // CSRF belirteci hatası
    res.status(403).send('Invalid CSRF Token');
  } else {
    next();
  }
});

app.use((req,res,next) => {
  res.locals.yonetici=req.session.oturum_acildi;
  res.locals.csrfToken=req.csrfToken();
  next();
})

app.use(yoneticiVerisi.routes);
app.use(publicRoutes);
app.use(yetkiRoutes);

app.use(hataController.getHata404);


mongoose
  .connect(MONGODB_URI)
  .then((result) => {
    app.listen(process.env.PORT || 3000);
  })
  .catch((err) => {
    console.log(err);
  });

