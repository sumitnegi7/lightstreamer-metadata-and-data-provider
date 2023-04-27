
const lsAdapters = require('../dataProviderAdapterImplementation');
let greetingsThread;



// todo: if no more complex logic in subs and unsubs function then reduce them to one
const onUnSubscribe = (dataProvider) => async (itemName, response) => {
    console.log("Unsubscribed item: " + itemName);
    if (itemName === "greetings") {
      clearTimeout(greetingsThread);
      response.success();
    } 
};

const onSubscribe = (dataProvider) => async (itemName, response) => {
    let c = false;
    function generateGreetings() {
      c = !c;
      dataProvider.update("greetings", false, {
        'timestamp': new Date().toLocaleString(),
        'message': c ? "Hello" : "World"
      });
      greetingsThread = setTimeout(generateGreetings,1000+Math.round(Math.random()*2000),5000);
    }
    if (itemName === "greetings") {
        greetingsThread = setTimeout(generateGreetings,5000);
        response.success();    
      }
};

module.exports = async () => {
  const { dataProvider } = await lsAdapters;

  dataProvider.on('subscribe', onSubscribe(dataProvider));
  dataProvider.on('unsubscribe', onUnSubscribe(dataProvider));
};
