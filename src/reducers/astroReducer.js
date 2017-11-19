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
  switch(action.type) {
    // Something is breaking here. It breaks everything. This is a bad reducer. It doesn't work because I did it wrong.
    case 'ACCELERATE_SHIP':
      return(
        {
          ...state,
          ship: {
            ...state.ship,
            keys: {
              ...state.ship.keys,
              w: true
            }
          }
        }
      )
    case 'STOP_ACCELERATING':
      return(
        {
          ...state,
          ship: {
            ...state.ship,
            keys: {
              ...state.ship.keys,
              w: false
            }
          }
        }
      )
    case 'STOP_SHIP':
      console.log("reducer hit!")
      console.log(state)
      return({ ship: { vel: { x: 0, y: 0 } }})
    default:
      return state
  }
}
