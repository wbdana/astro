export function reset() {
    return dispatch => {
        dispatch({
            type: 'RESET',
            payload: null
        })
    }
}