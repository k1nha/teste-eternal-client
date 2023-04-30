const dotenv = require('dotenv');
dotenv.config();

module.exports = function (ctx) {
  css: ['app.scss', 'tailwind.css'];
  env: {
    API: ctx.dev ? import.meta.env.VITE_BASE_URL : 'http://localhost:3030';
  }
};
