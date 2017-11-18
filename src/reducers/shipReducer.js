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
  asteroids: []
}, action) {
  switch(action.type) {
    case 'INCREASE_SHIP_X_POS' {
      return
    }
  }
}
