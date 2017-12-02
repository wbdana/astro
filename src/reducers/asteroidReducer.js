import update from 'immutability-helper'

export default function asteroidReducer(state = {
    asteroids: []
}, action) {
    let newState, firstBunch, secondBunch, updatedAsteroid, newPosX, newPosY
    switch(action.type) {
        case 'CREATE_ASTEROIDS':
            // newState = update(state, { asteroids: { $push: [{...action.payload}] } })
            // newState = update(state, { asteroids: { $push: [...action.payload] } })
            newState = {
                ...state,
                asteroids: [
                    ...state.asteroids,
                    ...action.payload
                ]
            }
            console.log(newState)
            return newState
        // payload for below actions is id of asteroid
        case 'REMOVE_ASTEROID':
            console.log("HIT REMOVE ASTEROID")
            newState = {
                asteroids: [
                    ...state.asteroids.slice(0, action.payload), ...state.asteroids.slice(action.payload + 1)
                ]
            }
            return newState
        case 'ADJUST_ASTEROID_TOP_LEFT':
            // Move to top left
            newState = update(state, {
                asteroids: {
                    [action.payload]: {
                        $set: {
                            pos: {
                                x: 0,
                                y: 0,
                                d: state.asteroids[action.payload].pos.d
                            },
                            vel: {
                                x: state.asteroids[action.payload].vel.x,
                                y: state.asteroids[action.payload].vel.y
                            },
                            angles: [...state.asteroids[action.payload].angles],
                            sides: [...state.asteroids[action.payload].sides],
                            size: state.asteroids[action.payload].size
                        }
                    }
                }
            })
            return newState
        case 'ADJUST_ASTEROID_TOP_RIGHT':
            // Move to top right
            newState = update(state, {
                asteroids: {
                    [action.payload]: {
                        $set: {
                            pos: {
                                x: window.innerWidth,
                                y: 0,
                                d: state.asteroids[action.payload].pos.d
                            },
                            vel: {
                                x: state.asteroids[action.payload].vel.x,
                                y: state.asteroids[action.payload].vel.y
                            },
                            angles: [...state.asteroids[action.payload].angles],
                            sides: [...state.asteroids[action.payload].sides],
                            size: state.asteroids[action.payload].size
                        }
                    }
                }
            })
            return newState
        case 'ADJUST_ASTEROID_BOTTOM_LEFT':
            // Move to bottom left
            newState = update(state, {
                asteroids: {
                    [action.payload]: {
                        $set: {
                            pos: {
                                x: 0,
                                y: window.innerHeight,
                                d: state.asteroids[action.payload].pos.d
                            },
                            vel: {
                                x: state.asteroids[action.payload].vel.x,
                                y: state.asteroids[action.payload].vel.y
                            },
                            angles: [...state.asteroids[action.payload].angles],
                            sides: [...state.asteroids[action.payload].sides],
                            size: state.asteroids[action.payload].size
                        }
                    }
                }
            })
            return newState
        case 'ADJUST_ASTEROID_BOTTOM_RIGHT':
            // Move to bottom right
            newState = update(state, {
                asteroids: {
                    [action.payload]: {
                        $set: {
                            pos: {
                                x: window.innerWidth,
                                y: window.innerHeight,
                                d: state.asteroids[action.payload].pos.d
                            },
                            vel: {
                                x: state.asteroids[action.payload].vel.x,
                                y: state.asteroids[action.payload].vel.y
                            },
                            angles: [...state.asteroids[action.payload].angles],
                            sides: [...state.asteroids[action.payload].sides],
                            size: state.asteroids[action.payload].size
                        }
                    }
                }
            })
            return newState
        case 'ADJUST_ASTEROID_LEFT':
            // Move to left side of Field
            firstBunch = state.asteroids.slice(0, action.payload)
            secondBunch = state.asteroids.slice(action.payload + 1, state.asteroids.length - 1)
            updatedAsteroid = {
                pos: {
                    x: 0,
                    y: state.asteroids[action.payload].pos.y + state.asteroids[action.payload].vel.y,
                    d: state.asteroids[action.payload].pos.d
                },
                vel: {
                    x: state.asteroids[action.payload].vel.x,
                    y: state.asteroids[action.payload].vel.y
                },
                angles: [...state.asteroids[action.payload].angles],
                sides: [...state.asteroids[action.payload].sides],
                size: state.asteroids[action.payload].size
            }
            newState = {
                ...state,
                asteroids: [
                    ...firstBunch,
                    updatedAsteroid,
                    ...secondBunch
                ]
            }
            return newState
        case 'ADJUST_ASTEROID_RIGHT':
            // Move to right side of Field
            firstBunch = state.asteroids.slice(0, action.payload)
            secondBunch = state.asteroids.slice(action.payload + 1, state.asteroids.length - 1)
            updatedAsteroid = {
                pos: {
                    x: window.innerWidth,
                    y: state.asteroids[action.payload].pos.y + state.asteroids[action.payload].vel.y,
                    d: state.asteroids[action.payload].pos.d
                },
                vel: {
                    x: state.asteroids[action.payload].vel.x,
                    y: state.asteroids[action.payload].vel.y
                },
                angles: [...state.asteroids[action.payload].angles],
                sides: [...state.asteroids[action.payload].sides],
                size: state.asteroids[action.payload].size
            }
            newState = {
                ...state,
                asteroids: [
                    ...firstBunch,
                    updatedAsteroid,
                    ...secondBunch
                ]
            }
            return newState
        case 'ADJUST_ASTEROID_TOP':
            // Move to top of Field
            firstBunch = state.asteroids.slice(0, action.payload)
            secondBunch = state.asteroids.slice(action.payload + 1, state.asteroids.length - 1)
            updatedAsteroid = {
                pos: {
                    x: state.asteroids[action.payload].pos.x + state.asteroids[action.payload].vel.x,
                    y: 0,
                    d: state.asteroids[action.payload].pos.d
                },
                vel: {
                    x: state.asteroids[action.payload].vel.x,
                    y: state.asteroids[action.payload].vel.y
                },
                angles: [...state.asteroids[action.payload].angles],
                sides: [...state.asteroids[action.payload].sides],
                size: state.asteroids[action.payload].size
            }
            newState = {
                ...state,
                asteroids: [
                    ...firstBunch,
                    updatedAsteroid,
                    ...secondBunch
                ]
            }
            return newState
        case 'ADJUST_ASTEROID_BOTTOM':
            // Move to bottom of Field
            firstBunch = state.asteroids.slice(0, action.payload)
            secondBunch = state.asteroids.slice(action.payload + 1, state.asteroids.length - 1)
            updatedAsteroid = {
                pos: {
                    x: state.asteroids[action.payload].pos.x + state.asteroids[action.payload].vel.x,
                    y: window.innerHeight,
                    d: state.asteroids[action.payload].pos.d
                },
                vel: {
                    x: state.asteroids[action.payload].vel.x,
                    y: state.asteroids[action.payload].vel.y
                },
                angles: [...state.asteroids[action.payload].angles],
                sides: [...state.asteroids[action.payload].sides],
                size: state.asteroids[action.payload].size
            }
            newState = {
                ...state,
                asteroids: [
                    ...firstBunch,
                    updatedAsteroid,
                    ...secondBunch
                ]
            }
            return newState
        case 'UPDATE_ASTEROID_LOCATION':
            // Move asteroid within boundaries
            // console.log(action)
            // console.log(state.asteroids[action.payload])
            if (!state.asteroids[action.payload]) {
                // console.log("Returning state")
                return state
            }
            firstBunch = state.asteroids.slice(0, action.payload)
            secondBunch = state.asteroids.slice(action.payload + 1, state.asteroids.length)
            if ((state.asteroids[action.payload].pos.x + state.asteroids[action.payload].vel.x) <= 0) {
                newPosX = window.innerWidth
            } else if ((state.asteroids[action.payload].pos.x + state.asteroids[action.payload].vel.x) >= window.innerWidth) {
                newPosX = 0
            } else {
                newPosX = state.asteroids[action.payload].pos.x + state.asteroids[action.payload].vel.x
            }
            if ((state.asteroids[action.payload].pos.y + state.asteroids[action.payload].vel.y) >= window.innerHeight) {
                newPosY = 0
            } else if ((state.asteroids[action.payload].pos.y + state.asteroids[action.payload].vel.y) <= 0) {
                newPosY = window.innerHeight
            } else {
                newPosY = state.asteroids[action.payload].pos.y + state.asteroids[action.payload].vel.y
            }
            updatedAsteroid = {
                pos: {
                    x: newPosX,
                    y: newPosY,
                    d: state.asteroids[action.payload].pos.d
                },
                vel: {
                    x: state.asteroids[action.payload].vel.x,
                    y: state.asteroids[action.payload].vel.y
                },
                angles: [...state.asteroids[action.payload].angles],
                sides: [...state.asteroids[action.payload].sides],
                size: state.asteroids[action.payload].size
            }
            // console.log("first", firstBunch)
            // console.log("updated", updatedAsteroid)
            // console.log("second", secondBunch)
            newState = {
                ...state,
                asteroids: [
                    ...firstBunch,
                    updatedAsteroid,
                    ...secondBunch
                ]
            }
            // newState = update(state, {
            //     asteroids: {
            //         [action.payload]: {
            //             $set: {
            //                 pos: {
            //                     x: state.asteroids[action.payload].pos.x + state.asteroids[action.payload].vel.x,
            //                     y: state.asteroids[action.payload].pos.y + state.asteroids[action.payload].vel.y,
            //                     d: state.asteroids[action.payload].pos.d
            //                 },
            //                 vel: {
            //                     x: state.asteroids[action.payload].vel.x,
            //                     y: state.asteroids[action.payload].vel.y
            //                 },
            //                 angles: [...state.asteroids[action.payload].angles],
            //                 sides: [...state.asteroids[action.payload].sides],
            //                 size: state.asteroids[action.payload].size
            //             }
            //         }
            //     }
            // })
            // console.log(newState)
            return newState
        default:
            return state
    }
}
