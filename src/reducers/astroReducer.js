export default function astroReducer(state = {
  ship: {
    pos: {
      x: 0,
      y: 0,
      d: 0
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
      x: 500, // defaul testing starting position
      y: 500 // default testing starting position
    },
    vel: {

    }
  }
}, action) {
  switch(action.type) {
    default:
      return state
  }
}
