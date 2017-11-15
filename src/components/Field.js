import React from 'react'
import Ship from './Ship'

class Field extends React.Component {
  state = {
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
    asteroids: []
  }

  updateShipState = (shipState) => {
    this.setState({
      ...this.state,
      ship: shipState
    })
  }

  render() {
    return(
      <canvas
        id='AstroField'
        width='1905px'
        height='961px'
      >
        <Ship
          pos={this.state.ship.pos}
          vel={this.state.ship.vel}
          updateField={this.updateShipState}
        />
      </canvas>
    )
  }
}

export default Field
