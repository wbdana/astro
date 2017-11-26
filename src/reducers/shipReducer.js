export default function shipReducer(state = {
  // canvas: {
  //   c: function () {
  //     return(document.getElementById('AstroField'))
  //   },
  //   ctx: function () {
  //     return(document.getElementById('AstroField'))
  //   }
  // },
  // ship: {
    pos: {
      x: 950,
      y: 550,
      d: 360
    },
    vel: {
      x: 0,
      y: 0
    },
    keys: {
      w: false,
      a: false,
      d: false
    }
  // },
  // asteroids: [] // In actual game, we will spawn many asteroids
  // asteroid: {
  //   size: 2, // default size = 2 (large)
  //   angles: [],
  //   sides: [],
  //   pos: {
  //     x: 500, // default testing starting position
  //     y: 500 // default testing starting position
  //   },
  //   vel: {
  //     x: 0, // default testing static
  //     y: 0  // default testing static
  //   }
  // }
}, action) {
  let newState
  switch(action.type) {
    // Something is breaking here. It breaks everything. This is a bad reducer. It doesn't work because I did it wrong.
    case 'MOVE_SHIP':
      // Keydown on 'w', 'a', or 'd'
      // action.payload structure: 'w', 'a', or 'd'
      newState = {
        ...state,
        keys: {
          ...state.keys,
          [action.payload]: true
          }
        }
      return newState
    case 'STOP_MOVE_SHIP':
      // Keyup on 'w', 'a', or 'd'
      // action.payload structure: 'w', 'a', or 'd'
      newState = {
        ...state,
        keys: {
          ...state.keys,
          [action.payload]: false
        }
      }
      return newState
    case 'STOP_SHIP':
      // Keydown on 's'
      newState = {
        ...state,
        vel: {
          x: 0,
          y: 0
        }
      }
      return newState
    case 'INCREASE_VELX_POS_LIMITED':
      // Accelerating to the right, velocity limited
      newState = {
        ...state,
        vel: {
          ...state.vel,
          x: 20
        }
      }
      return newState
    case 'INCREASE_VELX_NEG_LIMITED':
      // Accelerating to the left, velocity
      newState = {
        ...state,
        vel: {
          ...state.vel,
          x: -20
        }
      }
      return newState
    case 'SET_NEW_VELX':
      // Accelerating on x-axis, presently unlimited
      newState = {
        ...state,
        vel: {
          ...state.vel,
          x: action.payload
        }
      }
      return newState
    case 'INCREASE_VELY_POS_LIMITED':
      // Accelerating towards the bottom, velocity limited
      newState = {
        ...state,
        vel: {
          ...state.vel,
          y: 20
        }
      }
      return newState
    case 'INCREASE_VELY_NEG_LIMITED':
      // Accelerating towards the top, velocity limited
      newState = {
        ...state,
        vel: {
          ...state.vel,
          y: -20
        }
      }
      return newState
    case 'SET_NEW_VELY':
      // Accelerating on y-axis, presently unlimited
      newState = {
        ...state,
        vel: {
          ...state.vel,
          y: action.payload
        }
      }
      return newState
    case 'ROTATE_COUNTERCLOCKWISE':
      // Rotating to the left
      newState = {
        ...state,
        pos: {
          ...state.pos,
          d: state.pos.d - 5
        }
      }
      return newState
    case 'ROTATE_CLOCKWISE':
      // Rotating to the right
      newState = {
        ...state,
        pos: {
          ...state.pos,
          d: state.pos.d + 5
        }
      }
      return newState
    case 'ADJUST_TOP_LEFT':
      // Move to top left
      newState = {
        ...state,
        pos: {
          ...state.pos,
          x: 0,
          y: 0
        }
      }
      return newState
    case 'ADJUST_TOP_RIGHT':
      // Move to top right
      newState = {
        ...state,
        pos: {
          ...state.pos,
          x: 1898,
          y: 0
        }
      }
      return newState
    case 'ADJUST_BOTTOM_LEFT':
      // Move to bottom left
      newState = {
        ...state,
        pos: {
          ...state.pos,
          x: 0,
          y: 954
        }
      }
      return newState
    case 'ADJUST_BOTTOM_RIGHT':
      // Move to bottom right
      newState = {
        ...state,
        pos: {
          ...state.pos,
          x: 1898,
          y: 954
        }
      }
      return newState
    case 'ADJUST_LEFT':
      // Move to left side of Field
      newState = {
        ...state,
        pos: {
          ...state.pos,
          x: 0,
          y: state.pos.y + state.vel.y
        }
      }
      return newState
    case 'ADJUST_RIGHT':
      // Move to right side of Field
      newState = {
        ...state,
        pos: {
          ...state.pos,
          x: 1898,
          y: state.pos.y + state.vel.y
        }
      }
      return newState
    case 'ADJUST_TOP':
      // Move to top of Field
      newState = {
        ...state,
        pos: {
          ...state.pos,
          x: state.pos.x + state.vel.x,
          y: 0
        }
      }
      return newState
    case 'ADJUST_BOTTOM':
      // Move to bottom of Field
      newState = {
        ...state,
        pos: {
          ...state.pos,
          x: state.pos.x + state.vel.x,
          y: 954
        }
      }
      return newState
    case 'UPDATE_SHIP_LOCATION':
      // Move ship within boundaries
      newState = {
        ...state,
        pos: {
          ...state.pos,
          x: state.pos.x + state.vel.x,
          y: state.pos.y + state.vel.y
        }
      }
      return newState
    case 'INITIALIZE_ASTEROID':
      return(
        {
          ...state,
          asteroid: {
            ...state.asteroid,
            angles: action.payload.angles,
            sides: action.payload.sides,
            pos: {
              ...state.asteroid.pos,
              d: action.payload.d
            },
            vel: {
              ...state.asteroid.vel,
              x: action.payload.velX,
              y: action.payload.velY
            }
          }
        }
      )
    case 'UPDATE_ASTEROID_LOCATION':
      return(
        {
          ...state,
          asteroid: {
            ...state.asteroid,
            pos: {
              ...state.asteroid.pos,
              x: state.asteroid.pos.x + state.asteroid.vel.x,
              y: state.asteroid.pos.y + state.asteroid.vel.y
            }
          }
        }
      )
    default:
      return state
  }
}
