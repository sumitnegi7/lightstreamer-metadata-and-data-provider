

# Lighstreamer Adapter Implementation

![architecture](https://user-images.githubusercontent.com/63843304/234871054-4cd6e3aa-5e12-4329-8a06-4ba4f6c75256.png)



Lightstreamer sample project for running metadata and data providers where data provider emit event every 5 seconds 

Data Provider emits the events to the client and client responds with the acknowledgement.


Link to our adapter file: https://github.com/sumitnegi7/lightstreamer-metadata-and-data-provider/blob/main/lightstreamer/IQO_NODE/adapters.xml

Have also added the ``lightstreamer_conf.xml`` file we were using in the root directory of the repository.


To run the project firstly setup your ls server in the local/online using our ```adapters.xml``` and ``lightstreamer_conf.xml`` file and install node in your system

Then to run this repository follow the below steps:

``` npm install ```

```npm run start:dev```

The test script for this project which will basically be a node ls client is here:
https://github.com/sumitnegi7/lightstreamer-test-script-node




## Badges

Add badges from somewhere like: [shields.io](https://shields.io/)

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![GPLv3 License](https://img.shields.io/badge/License-GPL%20v3-yellow.svg)](https://opensource.org/licenses/)
[![AGPL License](https://img.shields.io/badge/license-AGPL-blue.svg)](http://www.gnu.org/licenses/agpl-3.0)

