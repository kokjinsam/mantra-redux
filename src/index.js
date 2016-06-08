import createReduxStore from './createReduxStore';

function reduxMiddleware(options) {
  const {
    reducers = {},
    middlewares = [],
    storeName = 'Store',
  } = options;

  return {
    moduleWillLoad(module) {
      if (module.reducers) {
        if (typeof reducers !== 'object' || typeof module.reducers !== 'object') {
          const message = "Module's reducers field should be a map of reducers.";
          throw new Error(message);
        }

        const allReducers = {
          ...module.reducers,
          ...reducers,
        };

        this._reducers = allReducers;
      }
    },
    moduleWillInit() {
      const reduxStore = createReduxStore({
        reducers: this._reducers,
        middlewares,
      });

      this.context[storeName] = reduxStore;
      this.context.dispatch = reduxStore.dispatch;
    },
  };
}

export default reduxMiddleware;
