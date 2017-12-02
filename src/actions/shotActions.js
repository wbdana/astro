export function newShot(payload) {
    return dispatch => {
        dispatch({
            type: 'NEW_SHOT',
            payload
        })
    }
}

export function updateShotLocation(payload) {
    return dispatch => {
        dispatch({
            type: 'UPDATE_SHOT_LOCATION',
            payload
        })
    }
}