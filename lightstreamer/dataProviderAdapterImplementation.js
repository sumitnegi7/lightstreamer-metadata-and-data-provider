const net = require('net');
const tls = require('tls');


const DataProvider = require('./DataProvider');

 const lightstreamer = {
  // host: 'http://localhost:8080',
  tls: 'false',
  dataProviderReqResPort: '4003',
  metadataProviderReqResPort: '4002',
  notifyPort: '4001',
  user: 'username',
  password: 'password'
};

let dataProvider;

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
      console.log(port,host," 🔥  🔥 ")
      const stream = connector.connect(port, host, function () {
        ready = true;
        readyCb(stream);
      });

      stream.on('error', function (e) {
        console.error('Lightstreamer error: %o', e);
        //wait next interval
      });

      stream.on('close', function (hadError) {
        console.debug('Lightstreamer close: ', hadError);
        //wait next interval
      });

      stream.on('end', function () {
        console.debug('connection ended');
        //wait next interval
      });
    }
  }, timeout);
};

const notifyPromise = new Promise((resolve) => {
  createConnection(
    lightstreamer.notifyPort,
    process.env.NODE_ENV === 'development' ? 'localhost' : lightstreamer.host,
    lightstreamer.tls,
    function (stream) {
      resolve(stream);
    }
  );
});

const reqResPromise = new Promise((resolve) => {
  createConnection(
    lightstreamer.dataProviderReqResPort,
    process.env.NODE_ENV === 'development' ? 'localhost' : lightstreamer.host,
    lightstreamer.tls,
    function (stream) {
      resolve(stream);
    }
  );
});

const createDataAdapter = async () => {
  try {
    const [notifyStream, reqRespStream] = await Promise.all([notifyPromise, reqResPromise]);
    const credentials = { user: lightstreamer.user, password: lightstreamer.password };
    dataProvider = new DataProvider(reqRespStream, notifyStream, null, credentials);
    console.info('lightstreamer data provider connected');
    return { dataProvider };


    //

    
  } catch (e) {
    console.info('lightstreamer data provider connection failed', e);
  }
};


if(dataProvider){
let greetingsThread;

dataProvider.on('subscribe', function(itemName, response) {
  if (itemName === "greetings") {
    greetingsThread = setTimeout(generateGreetings,0);
    console.log("🚀 ~ file: dataProviderAdapterImplementation.js:101 ~ dataProvider.on ~ greetingsThread:", greetingsThread)
    response.success();    
  }
});

dataProvider.on('unsubscribe', function(itemName, response) {
  console.log("Unsubscribed item: " + itemName);
  if (itemName === "greetings") {
    clearTimeout(greetingsThread);
    response.success();
  } 
});

let c = false;
// eslint-disable-next-line no-inner-declarations
function generateGreetings() {
  c = !c;
  dataProvider.update("greetings", false, {
    'timestamp': new Date().toLocaleString(),
    'message': c ? "Hello" : "World"
  });
  greetingsThread = setTimeout(generateGreetings,1000+Math.round(Math.random()*2000));
  console.log("🚀 ~ file: dataProviderAdapterImplementation.js:123 ~ generateGreetings ~ greetingsThread:", greetingsThread)
}

}


module.exports = createDataAdapter();
