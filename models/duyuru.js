const mongoose = require('mongoose');

const Schema=mongoose.Schema;

const duyuruSchema = new Schema({
  duyuru_adi: {
    type: String,
    required: true,
  },
  duyuru_icerigi: {
    type: String,
    required: true,
  },
  gost_tarihi: {
    type: Date,
    required: true,
  },
  bitis_tarihi: {
    type: Date,
    required: true,
  }
});

module.exports=mongoose.model('Duyuru', duyuruSchema);

