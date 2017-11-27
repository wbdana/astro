export default function asteroidReducer(state = {
    // asteroids: [] // In actual game, we will spawn many asteroids
    size: 2, // default size = 2 (large)
    angles: [],
    sides: [],
    pos: {
        x: 500, // default testing starting position
        y: 500 // default testing starting position
    },
    vel: {
        x: 0, // default testing static
        y: 0  // default testing static
    }
}, action) {
    let newState
    switch(action.type) {
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
        case 'ADJUST_ASTEROID_TOP_LEFT':
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
            newState = {
                ...state,
                pos: {
                    ...state.pos,
                    x: state.pos.x + state.vel.x,
                    y: state.pos.y + state.vel.y
                }
            }
            return newState
            
        default:
            return state
    }
}
