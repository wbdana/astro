import { combineReducers } from 'redux'
import shipReducer from './shipReducer'
import asteroidReducer from './asteroidReducer'
import shotReducer from './shotReducer'
// import astroReducer from './astroReducer'

// export default combineReducers({
//     ship: shipReducer,
//     asteroidContainer: asteroidReducer,
//     shotContainer: shotReducer
// })

const appReducer = combineReducers({
    ship: shipReducer,
    asteroidContainer: asteroidReducer,
    shotContainer: shotReducer,
    // astro: astroReducer
})

const rootReducer = (state, action) => {
    if (action.type === 'RESTART_GAME') {
        state = undefined
    }

    return appReducer(state, action)
}

export default rootReducer;
