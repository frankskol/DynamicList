This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# Dynamic List

This project creates a dynamic list of registered users which are connected to Google Maps markers. 
The project is divided in two folders. The current folder contains the back-end, while the front-end folder contains the front-end.

##Installation

To install, run:

```
npm install
```

Then repeat the command at the FrontEnd folder.

Then, install the dependencies in FrontEnd:
```
npm install react-sanfona
npm install -save react-splitter-layout
npm install react-router-dom
npm install -save react-router
```

Now you have to setup your server connection and your Google Maps API Key.

For the connection, specify your database connection in the "connection.js" file at the main folder.

For the API key, edit "apiKey" in the "Map.js" file at FrondEnd/src/components/

##Running

To run the project in development mode, you can run:
```
npm start
```

For creating a production run, you can run:
```
npm build run
```

First run the back-end in the main folder. After a server connection is established, run the front-end.

## Configuration

DynamicList sends periodic requests to the server to get the current registered users and their positions. The request interval is set in componentDidMount() from "Interface.js". Default value: 10000.

Google Maps is initialized at the user's current location. This changed in centerAroundCurrentLocation from "location.js". In case centerAroundCurrentLocation is set to false, the map will center at the defined initialCenter coordinates, also in "location.js".

By default, DynamicList allows CORS from localhost:3001, which is where the FrontEnd will be running in case the program is run in a local computer. This can be changed at app.use in "server.js".  
