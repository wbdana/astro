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
        game: true,
        field: true
    },
    asteroidContainer: {
        asteroids: []
    },
    shotContainer: {
        shots: []
    }
}, action) {
    let newState    
    switch(action.type) {
        case 'RESTART_GAME':
            console.log("HIT RESTART_GAME")
            newState = {
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
                    shots: []
                }
            }
            console.log(newState)
            return newState
        default:
            return state
    }
    return combineReducers(newState, action)
}