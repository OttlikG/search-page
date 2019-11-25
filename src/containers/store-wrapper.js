import React from 'react'
import { createStore, applyMiddleware, combineReducers, compose } from 'redux'

import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import { Provider } from 'react-redux'
import { createBrowserHistory } from 'history'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import reducer from '../redux/reducer'
import Router from './router'

const browserHistory = createBrowserHistory()
const middleware = [thunk]
if (process.env.NODE_ENV !== 'production') {
	middleware.push(createLogger())
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(
	combineReducers({
		...reducer,
		routing: routerReducer,
	}),
	composeEnhancers(applyMiddleware(...middleware))
)

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store)

export default function StoreWrapper() {
	return (
		<Provider store={store}>
			<Router history={history} />
		</Provider>
	)
}
