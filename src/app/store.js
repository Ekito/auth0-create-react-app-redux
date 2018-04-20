import * as storage from 'redux-storage';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import createEngine from 'redux-storage-engine-localstorage';
import logger from 'redux-logger';

export default function configureStore(rootReducer) {
  const storageReducer = storage.reducer(rootReducer);
  const engine = createEngine('my-save-key');

  const storageMiddleware = storage.createMiddleware(engine);

  const store = createStore(
    storageReducer,
    applyMiddleware(
      logger,
      thunk,
      storageMiddleware,
    ),
  );
  const load = storage.createLoader(engine);
  return load(store).then(() => store);
}
