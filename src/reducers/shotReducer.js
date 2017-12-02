import update from 'immutability-helper'

export default function shotReducer(state = {
    shots: []
}, action) {
    let newState
    switch(action.type) {
        case 'NEW_SHOT':
            console.log("TOOK SHOT")
            newState = update(state, { shots: { $push: [{...action.payload}] } })
            return newState
        case 'MISSED_SHOT':
            // if shot goes off screen without hitting asteroid, remove shot from state
            return state
        case 'UPDATE_SHOT_LOCATION':
            console.log("Hit UPDATE_SHOT_LOCATION")
            newState = update(state, {
                shots: {
                    [action.payload]: {
                        $set: {
                            pos: {
                                x: state.shots[action.payload].pos.x + state.shots[action.payload].vel.x,
                                y: state.shots[action.payload].pos.y - state.shots[action.payload].vel.y,
                                d: state.shots[action.payload].pos.d
                            },
                            vel: {
                                x: state.shots[action.payload].vel.x,
                                y: state.shots[action.payload].vel.y
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