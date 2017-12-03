import combineReducers from './index.js'

export default function astroReducer(state, action) {
    switch(action.type) {
        case 'RESET':
            state = undefined
        default:
            state = undefined
    }
    return combineReducers(state, action)
}