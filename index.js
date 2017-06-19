const fs = require('fs');

const express = require('express');
const convertImg = require('./lib/images/download').convertImg;

let app = express();

app.get('/', (req, res) => {
  convertImg("http://24.media.tumblr.com/tumblr_lfp3qax6Lm1qfmtrbo1_1280.jpg", (file)=>{
    res.contentType('image/png');
    res.end(file);
  });
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});