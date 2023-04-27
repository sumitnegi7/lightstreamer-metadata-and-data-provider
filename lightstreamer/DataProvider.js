const { DataProvider: DefaultDataProvider } = require('lightstreamer-adapter');

class DataProvider extends DefaultDataProvider {
  subscriptions = new Map();

  constructor(...params) {
    super(...params);
  }

  safeUpdate = (...params) => {
    if (!this.subscriptions.has(params[0])) {
      return;
    }

    this.update(...params);
  };
}

module.exports = DataProvider;
