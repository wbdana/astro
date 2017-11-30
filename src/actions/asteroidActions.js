export function createAsteroids(payload) {
    return dispatch => {
        dispatch({
            type: 'CREATE_ASTEROIDS',
            payload: payload
        })
    }
}

export function initializeAsteroid(payload) {
    return dispatch => {
        dispatch({
            type: 'INITIALIZE_ASTEROID',
            payload: payload
        })
    }
}

export function adjustTopLeft(payload) {
    return dispatch => {
        dispatch({
            type: 'ADJUST_ASTEROID_TOP_LEFT',
            payload: payload
        })
    }
}

export function adjustTopRight(payload) {
    return dispatch => {
        dispatch({
            type: 'ADJUST_ASTEROID_TOP_RIGHT',
            payload: payload
        })
    }
}

export function adjustBottomLeft(payload) {
    return dispatch => {
        dispatch({
            type: 'ADJUST_ASTEROID_BOTTOM_LEFT',
            payload: payload
        })
    }
}

export function adjustBottomRight(payload) {
    return dispatch => {
        dispatch({
            type: 'ADJUST_ASTEROID_BOTTOM_RIGHT',
            payload: payload
        })
    }
}

export function adjustLeft(payload) {
    return dispatch => {
        dispatch({
            type: 'ADJUST_ASTEROID_LEFT',
            payload: payload
        })
    }
}

export function adjustRight(payload) {
    return dispatch => {
        dispatch({
            type: 'ADJUST_ASTEROID_RIGHT',
            payload: payload
        })
    }
}

export function adjustTop(payload) {
    return dispatch => {
        dispatch({
            type: 'ADJUST_ASTEROID_TOP',
            payload: payload
        })
    }
}

export function adjustBottom(payload) {
    return dispatch => {
        dispatch({
            type: 'ADJUST_ASTEROID_BOTTOM',
            payload: payload
        })
    }
}

export function updateAsteroidLocation(payload) {
    return dispatch => {
        dispatch({
            type: 'UPDATE_ASTEROID_LOCATION',
            payload: payload
        })
    }
}