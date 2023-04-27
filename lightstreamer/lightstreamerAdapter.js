const net = require('net');
const tls = require('tls');

const { MetadataProvider } = require('lightstreamer-adapter');

const logger = require('../helpers/logger');

const lightstreamer = {
      // host: 'http://localhost:8080',
      tls: 'false',
      dataProviderReqResPor: '4003',
      metadataProviderReqResPort: '4002',
      notifyPort: '4001',
      user: 'username',
      password: 'password'
    };

let metadataProvider;

const RETRY_TIMEOUT = 4000;

const createConnection = function (port, host, isTls, readyCb, timeout) {
  timeout = timeout || RETRY_TIMEOUT;
  let ready = false;
  isTls = isTls === 'false' ? false : true;
  const interval = setInterval(function () {
    if (ready) {
      clearInterval(interval);
    } else {
      const connector = isTls ? tls : net;
      const stream = connector.connect(port, host, function () {
        ready = true;
        readyCb(stream);
      });

      stream.on('error', function (e) {
        logger.error('Lightstreamer error: %o', e);
        //wait next interval
      });

      stream.on('close', function (hadError) {
        logger.debug('Lightstreamer close: ', hadError);
        //wait next interval
      });

      stream.on('end', function () {
        logger.debug('connection ended');
        //wait next interval
      });
    }
  }, timeout);
};

const metaDataPromise = new Promise((resolve) => {
  createConnection(
    lightstreamer.metadataProviderReqResPort,
    process.env.NODE_ENV === 'development' ? 'localhost' : lightstreamer.host,
    lightstreamer.tls,
    function (stream) {
      resolve(stream);
    }
  );
});

const createAdapter = async () => {
  try {
    const metadataStream = await metaDataPromise;
    const credentials = { user: lightstreamer.user, password: lightstreamer.password };
    metadataProvider = new MetadataProvider(metadataStream, null, credentials);
    logger.info('lightstreamer metadata connected successfully');
    return { metadataProvider };
  } catch (e) {
    logger.info('lightstreamer metadata connection failed', e);
  }
};

module.exports = createAdapter();
