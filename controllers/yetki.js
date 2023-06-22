const Kullanici = require("../models/kullanici");
exports.getGiris = (req, res, next) => {
        console.log(req.session);
        res.render("giris", {
          sayfaBasligi: "Yetkili Giriş Paneli",
          yol: "/giris",
          yonetici: false,
        });
    
};

exports.postGiris = (req, res, next) => {
  req.session.oturum_acildi = true;
  res.redirect('/duyuru-ekle'); // oturum açıldıktan sonra duyuru-ekle sayfasına yönlendir
};

exports.getCikis = (req, res, next) => {
   
    req.session.destroy(err => {
        console.log(err);
        res.redirect('/');
    })
        
};

exports.getKayit = (req, res, next) => {
  
         res.render("kayit", {
           sayfaBasligi: "Yetkili KAyıt Paneli",
           yol: "/kayit"
         });
     
 };





 exports.postKayit = (req, res, next) => {

    const email = req.body.email;
    const password = req.body.password;

    const kullanici = new Kullanici({
        email: email,
        password: password,
    
    });
    kullanici
      .save()
      .then((result) => {
        console.log(result);
        res.redirect("/");
      })
      .catch((err) => {
        console.log(err);
      });
  

};
  