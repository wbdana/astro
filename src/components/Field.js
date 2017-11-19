import React from 'react'
import Ship from './Ship'
// import AsteroidContainer from './AsteroidContainer'
import Asteroid from './Asteroid'

import { connect } from 'react-redux'

class Field extends React.Component {
  state = {
    ...this.props.store.getState()
    // ship: {
    //   pos: {
    //     x: 950,
    //     y: 550,
    //     d: 360
    //   },
    //   vel: {
    //     x: 0,
    //     y: 0
    //   },
    //   keys: {
  	// 		w: false,
  	// 		a: false,
  	// 		d: false
    //   }
    // },
    // asteroids: []
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
    this.updateField()
  }

  updateField = () => {
    this.refs.Asteroid.initializeAsteroid(this.props)
    setInterval(() => {
      this.refs.Ship.updateAndConfineShipToField()
      // this.refs.Asteroid.updateAndConfineAsteroidToField(this.props)
    }, 20)
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
          store={this.props.store}
          ref="Ship"
        />
        <Asteroid
          store={this.props.store}
          ref="Asteroid"
          size={2}
        />
      </canvas>
    )
  }
}

const mapStateToProps = (state) => {
  return { state }
}

export default connect(mapStateToProps)(Field)
