const wget = require('node-wget');
const Jimp = require("jimp");
const gm = require('gm');


let getImg = (options, call_back) => {
  options      = options  || {};
  options.url = options.url || 'http://24.media.tumblr.com/tumblr_lfp3qax6Lm1qfmtrbo1_1280.jpg';
  options.dest = options.dest || './';

  wget({url:  options.url, dest: options.dest, timeout: 2000}, call_back);
};


let convertImg = (img, cb) => {
  Jimp.read(img, (err, lenna) => {
    if (err) throw err;
    gm("mask.png").matte().fill().transparent("#FFFFFF").toBuffer("PNG", (err, buffer) => {
      if (!err){
        Jimp.read(buffer, (err, mask) => {
          if (err) throw err;
          let rk = mask.color([
            { apply: 'red', params: [ 999 ] },
          ]);
          lenna.greyscale().composite(rk, 0, 0).getBuffer(Jimp.MIME_PNG, (err, buffer)=>{
            if (err) throw err;
            cb(buffer);
          });
        });
      } else{
        console.log("34");
        console.log(err);
      }
    });
  });
};

module.exports = {
  getImg,
  convertImg,
};
