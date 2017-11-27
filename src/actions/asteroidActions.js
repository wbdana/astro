export function initializeAsteroid(payload) {
    return dispatch => {
        dispatch({
            type: 'INITIALIZE_ASTEROID',
            payload: payload
        })
    }
}

export function adjustTopLeft() {
    return dispatch => {
        dispatch({
            type: 'ADJUST_ASTEROID_TOP_LEFT',
            payload: null
        })
    }
}

export function adjustTopRight() {
    return dispatch => {
        dispatch({
            type: 'ADJUST_ASTEROID_TOP_RIGHT',
            payload: null
        })
    }
}

export function adjustBottomLeft() {
    return dispatch => {
        dispatch({
            type: 'ADJUST_ASTEROID_BOTTOM_LEFT',
            payload: null
        })
    }
}

export function adjustBottomRight() {
    return dispatch => {
        dispatch({
            type: 'ADJUST_ASTEROID_BOTTOM_RIGHT',
            payload: null
        })
    }
}

export function adjustLeft() {
    return dispatch => {
        dispatch({
            type: 'ADJUST_ASTEROID_LEFT',
            payload: null
        })
    }
}

export function adjustRight() {
    return dispatch => {
        dispatch({
            type: 'ADJUST_ASTEROID_RIGHT',
            payload: null
        })
    }
}

export function adjustTop() {
    return dispatch => {
        dispatch({
            type: 'ADJUST_ASTEROID_TOP',
            payload: null
        })
    }
}

export function adjustBottom() {
    return dispatch => {
        dispatch({
            type: 'ADJUST_ASTEROID_BOTTOM',
            payload: null
        })
    }
}

export function updateAsteroidLocation() {
    return dispatch => {
        dispatch({
            type: 'UPDATE_ASTEROID_LOCATION',
            payload: null
        })
    }
}