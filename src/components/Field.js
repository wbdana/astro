import React from 'react'
import Ship from './Ship'
// import AsteroidContainer from './AsteroidContainer'
import Asteroid from './Asteroid'

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

  updateAsteroidState = (asteroidContainerState) => {
    // this.setState({
    //   ...this.state,
    //   asteroids: asteroidContainerState
    // })
    this.setState({
      ...this.state,
      asteroids: [
        ...this.state.asteroids,
        asteroidContainerState
      ]
    })
  }

  // drawField = (drawShip, drawAsteroids) => {
  //
  // }

  componentDidMount() {
    // this.drawField()
    setInterval(()=>{console.log(this.state)}, 5000)
  }
  // componentDidMount() {
  //   setTimeout(()=>{console.log(this.state)}, 4000)
  // }

  // <AsteroidContainer
  //   asteroids={this.state.asteroids}
  //   rocks={this.state.rocks}
  //   pebbles={this.state.pebbles}
  //   updateField={this.updateAsteroidContainerState}
  // />

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
        <Asteroid
          size={2}
          updateAsteroidState={this.updateAsteroidState}
        />
      </canvas>
    )
  }
}

export default Field
