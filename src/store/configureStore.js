import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { persistStore, persistReducer } from 'redux-persist'
import createChromeStorage from 'redux-persist-chrome-storage'

import article from './reducers/article'
import revisions from './reducers/reviews'
import user from './reducers/user'
import fingerprint from './reducers/fingerprint'
import misc from './reducers/misc'

const storage = createChromeStorage(window.chrome, 'sync')

const persistConfig = {
	key: 'root',
	storage,
}

const rootReducer = combineReducers({
	article,
	revisions,
	user,
	fingerprint,
	misc,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

const composeEnhancers = compose

const configureStore = () => createStore(persistedReducer, composeEnhancers(applyMiddleware(thunk)))

export const store = configureStore()
export const persistor = persistStore(store)
