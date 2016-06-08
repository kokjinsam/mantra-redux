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

        let allReducers = {
          ...module.reducers,
          ...reducers,
        };

        let allMiddlewares = [ ...middlewares ];

        if (this._apolloReducer) {
          allReducers = {
            ...allReducers,
            apollo: this._apolloReducer,
          };
        }

        if (this._apolloMiddleware) {
          allMiddlewares = [
            ...allMiddlewares,
            this._apolloMiddleware,
          ];
        }

        this._reduxReducers = allReducers;
        this._reduxMiddlewares = allMiddlewares;
      }
    },
    moduleWillInit() {
      const reduxStore = createReduxStore({
        reducers: this._reduxReducers,
        middlewares: this._reduxMiddlewares,
      });

      this.context[storeName] = reduxStore;
      this.context.dispatch = reduxStore.dispatch;
    },
  };
}

export default reduxMiddleware;
