export default function asteroidReducer(state = {
    asteroids: []
}, action) {
    let newState, firstBunch, secondBunch, updatedAsteroid, newPosX, newPosY
    switch(action.type) {
        case 'CREATE_ASTEROIDS':
            newState = {
                ...state,
                asteroids: [
                    ...state.asteroids,
                    ...action.payload
                ]
            }
            console.log(newState)
            return newState
        // payload for below actions is id of asteroid
        case 'REMOVE_ASTEROID':
            console.log("HIT REMOVE ASTEROID")
            newState = {
                asteroids: [
                    ...state.asteroids.slice(0, action.payload), ...state.asteroids.slice(action.payload + 1)
                ]
            }
            return newState
        case 'UPDATE_ASTEROID_LOCATION':
            if (!state.asteroids[action.payload]) {
                return state
            }
            firstBunch = state.asteroids.slice(0, action.payload)
            secondBunch = state.asteroids.slice(action.payload + 1, state.asteroids.length)
            if ((state.asteroids[action.payload].pos.x + state.asteroids[action.payload].vel.x) <= 0) {
                newPosX = window.innerWidth
            } else if ((state.asteroids[action.payload].pos.x + state.asteroids[action.payload].vel.x) >= window.innerWidth) {
                newPosX = 0
            } else {
                newPosX = state.asteroids[action.payload].pos.x + state.asteroids[action.payload].vel.x
            }
            if ((state.asteroids[action.payload].pos.y + state.asteroids[action.payload].vel.y) >= window.innerHeight) {
                newPosY = 0
            } else if ((state.asteroids[action.payload].pos.y + state.asteroids[action.payload].vel.y) <= 0) {
                newPosY = window.innerHeight
            } else {
                newPosY = state.asteroids[action.payload].pos.y + state.asteroids[action.payload].vel.y
            }
            updatedAsteroid = {
                pos: {
                    x: newPosX,
                    y: newPosY,
                    d: state.asteroids[action.payload].pos.d
                },
                vel: {
                    x: state.asteroids[action.payload].vel.x,
                    y: state.asteroids[action.payload].vel.y
                },
                angles: [...state.asteroids[action.payload].angles],
                sides: [...state.asteroids[action.payload].sides],
                size: state.asteroids[action.payload].size
            }
            newState = {
                ...state,
                asteroids: [
                    ...firstBunch,
                    updatedAsteroid,
                    ...secondBunch
                ]
            }
            return newState
        case 'RESET_ASTEROIDS':
            console.log("Hit reset asteroids")
            newState = {
                asteroids: []
            }
            return newState
        default:
            return state
    }
}
