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

export function removeShot(payload) {
    return dispatch => {
        dispatch({
            type: 'REMOVE_SHOT',
            payload
        })
    }
}

export function resetShots() {
    return dispatch => {
        dispatch({
            type: 'RESET_SHOTS'
        })
    }
}