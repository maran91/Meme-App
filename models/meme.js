let mongoose = require('mongoose');

//Meme Schema
let memeSchema = mongoose.Schema({
  title:{
    type: String,
    required: true
  },
  author:{
    type: String,
    required:true
  },
  body:{
    type: String,
    required:true
  }
});

let Meme = module.exports = mongoose.model('Meme', memeSchema);
