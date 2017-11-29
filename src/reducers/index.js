import { combineReducers } from 'redux'
import shipReducer from './shipReducer'
import asteroidReducer from './asteroidReducer'

export default combineReducers({
    ship: shipReducer,
    asteroidContainer: asteroidReducer
})