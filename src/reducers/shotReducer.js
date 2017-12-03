import update from 'immutability-helper'

export default function shotReducer(state = {
    shots: [],
    score: 0
}, action) {
    let newState
    switch(action.type) {
        case 'NEW_SHOT':
            console.log("TOOK SHOT")
            newState = update(state, { shots: { $push: [{...action.payload}] } })
            return newState
        case 'UPDATE_SHOT_LOCATION':
            if (state.shots[action.payload].pos.x >= window.innerWidth || state.shots[action.payload].pos.x < 0 || state.shots[action.payload].pos.y >= window.innerHeight || state.shots[action.payload].pos.y < 0) {
                newState = {
                    shots: [
                        ...state.shots.slice(0, action.payload), ...state.shots.slice(action.payload + 1)
                    ],
                    score: state.score
                }
            } else {
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
            }
            return newState
        case 'REMOVE_SHOT':
            newState = {
                shots: [
                    ...state.shots.slice(0, action.payload), ...state.shots.slice(action.payload + 1)
                ],
                score: state.score + 5
            }
            return newState
        default:
            return state
    }
}