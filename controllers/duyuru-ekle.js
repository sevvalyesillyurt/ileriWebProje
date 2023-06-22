const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.render('duyuru-ekle', {
        sayfaBasligi: 'Duyuru Ekle',
    });
});

module.exports = router;
