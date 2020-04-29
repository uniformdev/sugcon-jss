const serverBundle = require('../build/server.bundle');
const data = require('./test-layout-service-data.json');

serverBundle.renderView(
  (err, result) => {
    if (err) {
      console.error(err);
    } else {
      console.log('html', result.html);
    }
  },
  '/',
  data,
  {}
);
