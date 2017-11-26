import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import combineReducers from './reducers/index'

export function configureStore() {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    return createStore(
        combineReducers,
        composeEnhancers(applyMiddleware(thunk))
    )
}

export const store = configureStore()
