export default function astroReducer(state = {
  ship: {
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
  },
  // asteroids: [] // In actual game, we will spawn many asteroids
  asteroid: {
    size: 2, // default size = 2 (large)
    angles: [],
    sides: [],
    pos: {
      x: 500, // default testing starting position
      y: 500 // default testing starting position
    },
    vel: {
      x: 0, // default testing static
      y: 0  // default testing static
    }
  }
}, action) {
  console.log(action.type)
  switch(action.type) {
    // Something is breaking here. It breaks everything. This is a bad reducer. It doesn't work because I did it wrong.
    case 'MOVE_SHIP':
      // Keydown on 'w', 'a', or 'd'
      // action.payload structure: 'w', 'a', or 'd'
      return(
        {
          ...state,
          ship: {
            ...state.ship,
            keys: {
              ...state.ship.keys,
              [action.payload]: true
            }
          }
        }
      )
    case 'STOP_MOVE_SHIP':
      // Keyup on 'w', 'a', or 'd'
      // action.payload structure: 'w', 'a', or 'd'
      return(
        {
          ...state,
          ship: {
            ...state.ship,
            keys: {
              ...state.ship.keys,
              [action.payload]: false
            }
          }
        }
      )
    case 'STOP_SHIP':
      // Keydown on 's'
      return(
        {
          ...state,
          ship: {
            ...state.ship,
            vel: {
              x: 0,
              y: 0
            }
          }
        }
      )
    case 'INCREASE_VELX_POS_LIMITED':
      // Accelerating to the right, velocity limited
      return(
        {
          ...state,
          ship: {
            ...state.ship,
            vel: {
              ...state.ship.vel,
              x: 20
            }
          }
        }
      )
    case 'INCREASE_VELX_NEG_LIMITED':
      // Accelerating to the left, velocity
      return(
        {
          ...state,
          ship: {
            ...state.ship,
            vel: {
              ...state.ship.vel,
              x: -20
            }
          }
        }
      )
    case 'SET_NEW_VELX':
      // Accelerating on x-axis, presently unlimited
      return(
        {
          ...state,
          ship: {
            ...state.ship,
            vel: {
              ...state.ship.vel,
              x: action.payload
            }
          }
        }
      )
    case 'INCREASE_VELY_POS_LIMITED':
      // Accelerating towards the bottom, velocity limited
      return(
        {
          ...state,
          ship: {
            ...state.ship,
            vel: {
              ...state.ship.vel,
              y: 20
            }
          }
        }
      )
    case 'INCREASE_VELY_NEG_LIMITED':
      // Accelerating towards the top, velocity limited
      return(
        {
          ...state,
          ship: {
            ...state.ship,
            vel: {
              ...state.ship.vel,
              y: -20
            }
          }
        }
      )
    case 'SET_NEW_VELY':
      // Accelerating on y-axis, presently unlimited
      return(
        {
          ...state,
          ship: {
            ...state.ship,
            vel: {
              ...state.ship.vel,
              y: action.payload
            }
          }
        }
      )
    case 'ROTATE_COUNTERCLOCKWISE':
      // Rotating to the left
      return(
        {
          ...state,
          ship: {
            ...state.ship,
            pos: {
              ...state.ship.pos,
              d: state.ship.pos.d - 5
            }
          }
        }
      )
    case 'ROTATE_CLOCKWISE':
      // Rotating to the right
      return (
        {
          ...state,
          ship: {
            ...state.ship,
            pos: {
              ...state.ship.pos,
              d: state.ship.pos.d + 5
            }
          }
        }
      )
    case 'ADJUST_TOP_LEFT':
      // Move to top left
      return(
        {
          ...state,
          ship: {
            ...state.ship,
            pos: {
              ...state.ship.pos,
              x: 0,
              y: 0
            }
          }
        }
      )
    case 'ADJUST_TOP_RIGHT':
      // Move to top right
      return(
        {
          ...state,
          ship: {
            ...state.ship,
            pos: {
              ...state.ship.pos,
              x: 1898,
              y: 0
            }
          }
        }
      )
    case 'ADJUST_BOTTOM_LEFT':
      // Move to bottom left
      return(
        {
          ...state,
          ship: {
            ...state.ship,
            pos: {
              ...state.ship.pos,
              x: 0,
              y: 954
            }
          }
        }
      )
    case 'ADJUST_BOTTOM_RIGHT':
      // Move to bottom right
      return(
        {
          ...state,
          ship: {
            ...state.ship,
            pos: {
              ...state.ship.pos,
              x: 1898,
              y: 954
            }
          }
        }
      )
    case 'ADJUST_LEFT':
      // Move to left side of Field
      return(
        {
          ...state,
          ship: {
            ...state.ship,
            pos: {
              ...state.ship.pos,
              x: 0,
              y: state.ship.pos.y + state.ship.vel.y
            }
          }
        }
      )
    case 'ADJUST_RIGHT':
      // Move to right side of Field
      return(
        {
          ...state,
          ship: {
            ...state.ship,
            pos: {
              ...state.ship.pos,
              x: 1898,
              y: state.ship.pos.y + state.ship.vel.y
            }
          }
        }
      )
    case 'ADJUST_TOP':
      // Move to top of Field
      return(
        {
          ...state,
          ship: {
            ...state.ship,
            pos: {
              ...state.ship.pos,
              x: state.ship.pos.x + state.ship.vel.x,
              y: 0
            }
          }
        }
      )
    case 'ADJUST_BOTTOM':
      // Move to bottom of Field
      return(
       {
          ...state,
          ship: {
            ...state.ship,
            pos: {
              ...state.ship.pos,
              x: state.ship.pos.x + state.ship.vel.x,
              y: 954
            }
          }
        }
      )
    case 'UPDATE_SHIP_LOCATION':
      // Move ship within boundaries
      return(
        {
          ...state,
          ship: {
            ...state.ship,
            pos: {
              ...state.ship.pos,
              x: state.ship.pos.x + state.ship.vel.x,
              y: state.ship.pos.y + state.ship.vel.y
            }
          }
        }
      )
    case 'INITIALIZE_ASTEROID':
    console.log("INIT AST")
      return(
        {
          ...state,
          asteroid: {
            ...state.asteroid,
            angles: action.payload.angles,
            sides: action.payload.sides
          }
        }
      )
    default:
      return state
  }
}
