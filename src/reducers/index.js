import { combineReducers } from 'redux'
import shipReducer from './shipReducer'
import asteroidReducer from './asteroidReducer'
import shotReducer from './shotReducer'
import astroReducer from './astroReducer'

// export default combineReducers({
//     ship: shipReducer,
//     asteroidContainer: asteroidReducer,
//     shotContainer: shotReducer
// })

const appReducer = combineReducers({
    ship: shipReducer,
    asteroidContainer: asteroidReducer,
    shotContainer: shotReducer,
    astro: astroReducer
})

const rootReducer = (state, action) => {
    if (action.type === 'RESTART_GAME') {
        state = {
            ship: {
                pos: {
                    x: 550,
                    y: 550,
                    d: 360
                },
                vel: {
                    x: 0,
                    y: 0
                },
                keys: {
                    w: false,
                    a: false,
                    d: false
                },
                game: true,
                field: true
            },
            asteroidContainer: {
                asteroids: []
            },
            shotContainer: {
                shots: [],
                score: 0
            }
        }
        console.log("RESTART_GAME")
        console.log(state)
    }

    return appReducer(state, action)
}

export default rootReducer;
