import { createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import { persistStore, persistReducer } from 'redux-persist'
// import AsyncStorage from '@react-native-async-storage/async-storage';
import AsyncStorage from '@react-native-community/async-storage'

import rootReducer from './reducer'

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  // whitelist: ['authType'] // which reducer want to store
}
const pReducer = persistReducer(persistConfig, rootReducer)
const middleware = applyMiddleware(logger)
// const store = createStore(pReducer, middleware);
const store = createStore(pReducer, middleware)
const persistor = persistStore(store)
// export default store = createStore(rootReducer)
export { store, persistor }
