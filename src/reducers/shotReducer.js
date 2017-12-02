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
        default:
            return state
    }
}