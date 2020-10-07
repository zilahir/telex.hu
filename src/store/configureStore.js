import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import article from './reducers/article'
import revisions from './reducers/reviews'

const rootReducer = combineReducers({
	article,
	revisions,
})

// eslint-disable-next-line no-underscore-dangle
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const configureStore = () => createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))

export const store = configureStore()

export default configureStore
