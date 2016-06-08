# Mantra Redux Middleware

## Basic Usage

```
import redux from 'mantra-redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';

const logger = createLogger();
const middlewares = [
  thunk,
  logger,
  Client.middleware(),
];

// create a Mantra app
const app = createApp(context);

// load middlewares before loading module
app.loadMiddlewares([
  redux({
    reducers: {
      apollo: Client.reducer(),
    },
    middlewares,
  }),
]);

// load all modules
app.loadModule(coreModule);

// initialize app
app.init();
```
