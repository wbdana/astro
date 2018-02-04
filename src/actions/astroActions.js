export function reset() {
    return dispatch => {
        dispatch({
            type: 'RESET',
            payload: null
        })
    }
}

export function restartGame() {
    return dispatch => {
        dispatch({
            type: 'RESTART_GAME',
            payload: null
        })
    }
}