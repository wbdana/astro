export function newShot(payload) {
    return dispatch => {
        dispatch({
            type: 'NEW_SHOT',
            payload: payload
        })
    }
}