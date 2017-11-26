export function moveShip(payload) {
    return dispatch => {
        dispatch({
            type: 'MOVE_SHIP',
            payload: payload
        })
    }
}