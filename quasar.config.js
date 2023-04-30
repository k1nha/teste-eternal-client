const dotenv = require('dotenv');
dotenv.config();

module.exports = function (ctx) {
  css: ['app.scss', 'tailwind.css'];
  env: {
    API: ctx.dev ? import.meta.env.MY_API : 'http://localhost:3030';
  }
};
