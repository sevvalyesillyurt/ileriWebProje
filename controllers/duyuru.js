const Duyuru = require("../models/duyuru");


exports.getDuyurular = (req, res, next) => {
  Duyuru.find()
    .then((duyurular) => {
      res.render("index", {
        sayfaBasligi: "Duyuru Listemiz",
        duyurular: duyurular,
        yol: "/"
      
      });
    })
    .catch((err) => {
      console.log(err);
    });
};


exports.getDuyuruEkle = (req, res, next) => {
  res.render("duyuru-ekle", {
    sayfaBasligi: "",
    baslikGoster: 2,
    yol: "/duyuru-ekle"
  
  });
};


exports.postDuyuruEkle = (req, res, next) => {
  const duyuru_adi = req.body.duyuru_adi;
  const duyuru_icerigi = req.body.duyuru_icerigi;
  const gost_tarihi = req.body.gost_tarihi;
  const bitis_tarihi = req.body.bitis_tarihi;


  const duyuru = new Duyuru({
    duyuru_adi: duyuru_adi,
    duyuru_icerigi: duyuru_icerigi,
    gost_tarihi: gost_tarihi,
    bitis_tarihi: bitis_tarihi,

  });
  duyuru
    .save()
    .then((result) => {
      console.log(result);
      res.redirect("/duyuru-ekle");
    })
    .catch((err) => {
      console.log(err);
    });
};

