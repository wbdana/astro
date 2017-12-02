import { combineReducers } from 'redux'
import shipReducer from './shipReducer'
import asteroidReducer from './asteroidReducer'
import shotReducer from './shotReducer'

export default combineReducers({
    ship: shipReducer,
    asteroidContainer: asteroidReducer,
    shotContainer: shotReducer
})