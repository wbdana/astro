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
        console.log("Dispatching restart game")
        dispatch({
            type: 'RESTART_GAME',
            payload: null
        })
    }
}