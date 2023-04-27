const dataProvider = require('./dataProvider');
const userAuth = require('./userAuth');

(async () => {
  userAuth();
  dataProvider();
})();
