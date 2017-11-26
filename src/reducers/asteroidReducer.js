export default function asteroidReducer(state = {
    canvas: {
        c: function () {
            return (document.getElementById('AstroField'))
        },
        ctx: function () {
            return (document.getElementById('AstroField'))
        }
    },
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
        default:
            return state
    }
}