import update from 'immutability-helper'

export default function asteroidReducer(state = {
    asteroids: []
}, action) {
    let newState
    switch(action.type) {
        case 'CREATE_ASTEROIDS':
            newState = update(state, { asteroids: { $push: [{...action.payload}] } })
            return newState
        case 'INITIALIZE_ASTEROID':
            newState = {
                ...state,
                angles: action.payload.angles,
                sides: action.payload.sides,
                pos: {
                    ...state.pos,
                    d: action.payload.d
                },
                vel: {
                    ...state.vel,
                    x: action.payload.velX,
                    y: action.payload.velY
                }
            }
            return newState
        // payload for below actions is id of asteroid
        case 'ADJUST_ASTEROID_TOP_LEFT':
            // Move to top left
            newState = update(state, {
                asteroids: {
                    [action.payload]: {
                        $set: {
                            pos: {
                                x: 0,
                                y: 0,
                                d: state.asteroids[action.payload].pos.d + 5
                            },
                            vel: {
                                x: state.asteroids[action.payload].vel.x,
                                y: state.asteroids[action.payload].vel.y
                            },
                            angles: [...state.asteroids[action.payload].angles],
                            sides: [...state.asteroids[action.payload].sides]
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
                                x: 1898,
                                y: 0,
                                d: state.asteroids[action.payload].pos.d + 5
                            },
                            vel: {
                                x: state.asteroids[action.payload].vel.x,
                                y: state.asteroids[action.payload].vel.y
                            },
                            angles: [...state.asteroids[action.payload].angles],
                            sides: [...state.asteroids[action.payload].sides]
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
                                y: 954,
                                d: state.asteroids[action.payload].pos.d + 5
                            },
                            vel: {
                                x: state.asteroids[action.payload].vel.x,
                                y: state.asteroids[action.payload].vel.y
                            },
                            angles: [...state.asteroids[action.payload].angles],
                            sides: [...state.asteroids[action.payload].sides]
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
                                x: 1898,
                                y: 954,
                                d: state.asteroids[action.payload].pos.d + 5
                            },
                            vel: {
                                x: state.asteroids[action.payload].vel.x,
                                y: state.asteroids[action.payload].vel.y
                            },
                            angles: [...state.asteroids[action.payload].angles],
                            sides: [...state.asteroids[action.payload].sides]
                        }
                    }
                }
            })
            return newState
        case 'ADJUST_ASTEROID_LEFT':
            // Move to left side of Field
            newState = update(state, {
                asteroids: {
                    [action.payload]: {
                        $set: {
                            pos: {
                                x: 0,
                                y: state.asteroids[action.payload].pos.y + state.asteroids[action.payload].vel.y,
                                d: state.asteroids[action.payload].pos.d + 5
                            },
                            vel: {
                                x: state.asteroids[action.payload].vel.x,
                                y: state.asteroids[action.payload].vel.y
                            },
                            angles: [...state.asteroids[action.payload].angles],
                            sides: [...state.asteroids[action.payload].sides]
                        }
                    }
                }
            })
            return newState
        case 'ADJUST_ASTEROID_RIGHT':
            // Move to right side of Field
            newState = update(state, {
                asteroids: {
                    [action.payload]: {
                        $set: {
                            pos: {
                                x: 1898,
                                y: state.asteroids[action.payload].pos.y + state.asteroids[action.payload].vel.y,
                                d: state.asteroids[action.payload].pos.d + 5
                            },
                            vel: {
                                x: state.asteroids[action.payload].vel.x,
                                y: state.asteroids[action.payload].vel.y
                            },
                            angles: [...state.asteroids[action.payload].angles],
                            sides: [...state.asteroids[action.payload].sides]
                        }
                    }
                }
            })
            return newState
        case 'ADJUST_ASTEROID_TOP':
            // Move to top of Field
            newState = update(state, {
                asteroids: {
                    [action.payload]: {
                        $set: {
                            pos: {
                                x: state.asteroids[action.payload].pos.x + state.asteroids[action.payload].vel.x,
                                y: 0,
                                d: state.asteroids[action.payload].pos.d + 5
                            },
                            vel: {
                                x: state.asteroids[action.payload].vel.x,
                                y: state.asteroids[action.payload].vel.y
                            },
                            angles: [...state.asteroids[action.payload].angles],
                            sides: [...state.asteroids[action.payload].sides]
                        }
                    }
                }
            })
            return newState
        case 'ADJUST_ASTEROID_BOTTOM':
            // Move to bottom of Field
            newState = update(state, {
                asteroids: {
                    [action.payload]: {
                        $set: {
                            pos: {
                                x: state.asteroids[action.payload].pos.x + state.asteroids[action.payload].vel.x,
                                y: 954,
                                d: state.asteroids[action.payload].pos.d + 5
                            },
                            vel: {
                                x: state.asteroids[action.payload].vel.x,
                                y: state.asteroids[action.payload].vel.y
                            },
                            angles: [...state.asteroids[action.payload].angles],
                            sides: [...state.asteroids[action.payload].sides]
                        }
                    }
                }
            })
            return newState
        case 'UPDATE_ASTEROID_LOCATION':
            // Move asteroid within boundaries
            newState = update(state, {
                asteroids: {
                    [action.payload]: {
                        $set: {
                            pos: {
                                x: state.asteroids[action.payload].pos.x + state.asteroids[action.payload].vel.x,
                                y: state.asteroids[action.payload].pos.y + state.asteroids[action.payload].vel.y,
                                d: state.asteroids[action.payload].pos.d + 5
                            },
                            vel: {
                                x: state.asteroids[action.payload].vel.x,
                                y: state.asteroids[action.payload].vel.y
                            },
                            angles: [...state.asteroids[action.payload].angles],
                            sides: [...state.asteroids[action.payload].sides]
                        }
                    }
                }
            })
            return newState
        default:
            return state
    }
}
