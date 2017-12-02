export function createAsteroid(payload) {
    return dispatch => {
        dispatch({
            type: 'CREATE_ASTEROIDS',
            payload
        })
    }
}

export function removeAsteroid(payload) {
    return dispatch => {
        dispatch({
            type: 'REMOVE_ASTEROID',
            payload
        })
    }
}

export function adjustTopLeft(payload) {
    return dispatch => {
        dispatch({
            type: 'ADJUST_ASTEROID_TOP_LEFT',
            payload
        })
    }
}

export function adjustTopRight(payload) {
    return dispatch => {
        dispatch({
            type: 'ADJUST_ASTEROID_TOP_RIGHT',
            payload
        })
    }
}

export function adjustBottomLeft(payload) {
    return dispatch => {
        dispatch({
            type: 'ADJUST_ASTEROID_BOTTOM_LEFT',
            payload
        })
    }
}

export function adjustBottomRight(payload) {
    return dispatch => {
        dispatch({
            type: 'ADJUST_ASTEROID_BOTTOM_RIGHT',
            payload
        })
    }
}

export function adjustLeft(payload) {
    return dispatch => {
        dispatch({
            type: 'ADJUST_ASTEROID_LEFT',
            payload
        })
    }
}

export function adjustRight(payload) {
    return dispatch => {
        dispatch({
            type: 'ADJUST_ASTEROID_RIGHT',
            payload
        })
    }
}

export function adjustTop(payload) {
    return dispatch => {
        dispatch({
            type: 'ADJUST_ASTEROID_TOP',
            payload
        })
    }
}

export function adjustBottom(payload) {
    return dispatch => {
        dispatch({
            type: 'ADJUST_ASTEROID_BOTTOM',
            payload
        })
    }
}

export function updateAsteroidLocation(payload) {
    return dispatch => {
        dispatch({
            type: 'UPDATE_ASTEROID_LOCATION',
            payload
        })
    }
}