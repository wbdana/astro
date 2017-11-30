import update from 'immutability-helper'

export default function asteroidReducer(state = {
    asteroids: []
}, action) {
    let newState
    switch(action.type) {
        case 'CREATE_ASTEROIDS':
            console.log("Creating asteroids")
            // const newArray = update(initialArray, { $push: [4] }); // => [1, 2, 3, 4]
            newState = update(state, { asteroids: { $push: [{...action.payload}] } })

            // newState = {
            //     ...state,
            //     asteroids: [
            //         ...state.asteroids,
            //         {...action.payload}
            //     ]
            
            // }
            // newState = Object.assign({}, state, {asteroids: [...state.asteroids, {...action.payload}]})
            console.log(newState)
            console.log(state.asteroids[0])
            return newState
        case 'INITIALIZE_ASTEROID':
            newState = {
                ...state,
                angles: action.payload.angles,
                sides: action.payload.sides,
                pos: {
                    ...state.pos,
                    d: action.payload.d
                },
                vel: {
                    ...state.vel,
                    x: action.payload.velX,
                    y: action.payload.velY
                }
            }
            return newState
        // payload for below actions is id of asteroid
        case 'ADJUST_ASTEROID_TOP_LEFT':
            state.asteroids[action.payload] = state.asteroids[action.payload]
            // Move to top left
            newState = {
                ...state,
                pos: {
                    ...state.pos,
                    x: 0,
                    y: 0
                }
            }
            return newState
        case 'ADJUST_ASTEROID_TOP_RIGHT':
            // Move to top right
            newState = {
                ...state,
                pos: {
                    ...state.pos,
                    x: 1898,
                    y: 0
                }
            }
            return newState
        case 'ADJUST_ASTEROID_BOTTOM_LEFT':
            // Move to bottom left
            newState = {
                ...state,
                pos: {
                    ...state.pos,
                    x: 0,
                    y: 954
                }
            }
            return newState
        case 'ADJUST_ASTEROID_BOTTOM_RIGHT':
            // Move to bottom right
            newState = {
                ...state,
                pos: {
                    ...state.pos,
                    x: 1898,
                    y: 954
                }
            }
            return newState
        case 'ADJUST_ASTEROID_LEFT':
            // Move to left side of Field
            newState = {
                ...state,
                pos: {
                    ...state.pos,
                    x: 0,
                    y: state.pos.y + state.vel.y
                }
            }
            return newState
        case 'ADJUST_ASTEROID_RIGHT':
            // Move to right side of Field
            newState = {
                ...state,
                pos: {
                    ...state.pos,
                    x: 1898,
                    y: state.pos.y + state.vel.y
                }
            }
            return newState
        case 'ADJUST_ASTEROID_TOP':
            // Move to top of Field
            newState = {
                ...state,
                pos: {
                    ...state.pos,
                    x: state.pos.x + state.vel.x,
                    y: 0
                }
            }
            return newState
        case 'ADJUST_ASTEROID_BOTTOM':
            // Move to bottom of Field
            newState = {
                ...state,
                pos: {
                    ...state.pos,
                    x: state.pos.x + state.vel.x,
                    y: 954
                }
            }
            return newState
        case 'UPDATE_ASTEROID_LOCATION':
            // Move asteroid within boundaries
            console.log("HIT UPDATE_ASTEROID_LOCATION")
            newState = update(state, {
                asteroids: {
                    [action.payload]: {
                        $set: {
                            pos: {
                                x: state.asteroids[action.payload].pos.x + state.asteroids[action.payload].vel.x,
                                y: state.asteroids[action.payload].pos.y + state.asteroids[action.payload].vel.y,
                                d: state.asteroids[action.payload].pos.d + 5
                            },
                            vel: {
                                x: state.asteroids[action.payload].vel.x,
                                y: state.asteroids[action.payload].vel.y
                            }
                        }
                    }
                }
            })
            return newState
        default:
            return state
    }
}
