import combineReducers from './index'

export default function astroReducer(state = {
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
        game: true
    },
    asteroidContainer: {
        asteroids: []
    },
    shotContainer: {
        shots: []
    }
}, action) {
    console.log("HIT SWITCH")
    let newState    
    switch(action.type) {
        case 'RESET':
            return state
        default:
            return state
    }
    return combineReducers(newState, action)
}