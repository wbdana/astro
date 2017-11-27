export default function shipReducer(state = {
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
}, action) {
  let newState
  switch(action.type) {
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
    default:
      return state
  }
}
