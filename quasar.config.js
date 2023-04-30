const { env } = require('process');

module.exports = function (ctx) {
  css: ['app.scss', 'tailwind.css'];
  env: {
    API: ctx.dev ? process.env.MY_API : 'http://localhost:3030';
  }
};
