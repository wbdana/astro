export function moveShip(keypress) {
    return dispatch => {
        dispatch({
            type: 'MOVE_SHIP',
            payload: keypress
        })
    }
}

export function stopMoveShip(keypress) {
    return dispatch => {
        dispatch({
            type: 'STOP_MOVE_SHIP',
            payload: keypress
        })
    }
}

export function stopShip() {
    return dispatch => {
        dispatch({
            type: 'STOP_SHIP',
            payload: null
        })
    }
}

export function increaseVelXPosLimited() {
    return dispatch => {
        dispatch({
            type: 'INCREASE_VELX_POS_LIMITED',
            payload: null
        })
    }
}

export function increaseVelXNegLimited() {
    return dispatch => {
        dispatch({
            type: 'INCREASE_VELX_NEG_LIMITED',
            payload: null
        })
    }
}

export function setNewVelX(newVelX) {
    return dispatch => {
        dispatch({
            type: 'SET_NEW_VELX',
            payload: newVelX
        })
    }
}

export function increaseVelYPosLimited() {
    return dispatch => {
        dispatch({
            type: 'INCREASE_VELY_POS_LIMITED',
            payload: null
        })
    }
}

export function increaseVelYNegLimited() {
    return dispatch => {
        dispatch({
            type: 'INCRASE_VELY_NEG_LIMITED',
            payload: null
        })
    }
}

export function setNewVelY(newVelY) {
    return dispatch => {
        dispatch({
            type: 'SET_NEW_VELY',
            payload: newVelY
        })
    }
}

export function rotateCounterClockwise() {
    return dispatch => {
        dispatch({
            type: 'ROTATE_COUNTERCLOCKWISE',
            payload: null
        })
    }
}

export function rotateClockwise() {
    return dispatch => {
        dispatch({
            type: 'ROTATE_CLOCKWISE',
            payload: null
        })
    }
}

export function adjustTopLeft() {
    return dispatch => {
        dispatch({
            type: 'ADJUST_TOP_LEFT',
            payload: null
        })
    }
}

export function adjustTopRight() {
    return dispatch => {
        dispatch({
            type: 'ADJUST_TOP_RIGHT',
            payload: null
        })
    }
}

export function adjustBottomLeft() {
    return dispatch => {
        dispatch({
            type: 'ADJUST_BOTTOM_LEFT',
            payload: null
        })
    }
}

export function adjustBottomRight() {
    return dispatch => {
        dispatch({
            type: 'ADJUST_BOTTOM_RIGHT',
            payload: null
        })
    }
}

export function adjustLeft() {
    return dispatch => {
        dispatch({
            type: 'ADJUST_LEFT',
            payload: null
        })
    }
}

export function adjustRight() {
    return dispatch => {
        dispatch({
            type: 'ADJUST_RIGHT',
            payload: null
        })
    }
}

export function adjustTop() {
    return dispatch => {
        dispatch({
            type: 'ADJUST_TOP',
            payload: null
        })
    }
}

export function adjustBottom() {
    return dispatch => {
        dispatch({
            type: 'ADJUST_BOTTOM',
            payload: null
        })
    }
}

export function updateShipLocation() {
    return dispatch => {
        dispatch({
            type: 'UPDATE_SHIP_LOCATION',
            payload: null
        })
    }
}