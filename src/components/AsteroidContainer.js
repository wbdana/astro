import React from 'react'
import Asteroid from './Asteroid'

import { getRandomIntInclusive } from '../Helpers'

import { connect } from 'react-redux'
import { createAsteroids, adjustTopLeft, adjustTopRight, adjustBottomLeft, adjustBottomRight, adjustLeft, adjustRight, adjustTop, adjustBottom, updateAsteroidLocation } from '../actions/asteroidActions'
import { bindActionCreators } from 'redux'
import { setInterval } from 'core-js/library/web/timers';

class AsteroidContainer extends React.Component {
  componentDidMount() {
    this.spawnAsteroids = this.spawnAsteroids.bind(this)
    this.spawnAsteroids()
    let i
    setInterval(()=>{
      for (i = 0; i < this.props.asteroids.length; i++) {
        this.updateAndConfineAsteroidToField(i)
      }
    }, 20)
  }

  async spawnAsteroids() {
    let firstAsteroid = await this.createAsteroid(2)
    let secondAsteroid = (firstAsteroid) => {
      this.createAsteroid(2)
    }
    secondAsteroid(firstAsteroid)
  }

  checkIfNeedAsteroids = () => {
    if (this.props.asteroids.length === 0) {
      console.log("Need asteroids!")
      this.spawnAsteroids()
    }
  }

  componentDidUpdate() {
    // this.checkIfNeedAsteroids()
  }

  createAsteroid = (size) => {
    let numSides = getRandomIntInclusive(3,9)
    let min = 0
    let angles = []
    let sides = []
    let posX = getRandomIntInclusive(5,1800) // TODO - move away from starting pos of ship
    let posY = getRandomIntInclusive(5,1000)
    let posD = getRandomIntInclusive(0,359)
    let velX = getRandomIntInclusive(1,5)
    let velY = getRandomIntInclusive(1,5)
    let newAngle
    let i
    let newSideMultiplier
    for (i = 0; i < numSides; i++) {
      newAngle = getRandomIntInclusive(min, 45)
      newSideMultiplier = getRandomIntInclusive(10,100)
      angles.push(newAngle)
      sides.push(size*newSideMultiplier)
      min = newAngle
    }
    let newAsteroid = {
      angles: angles,
      sides: sides,
      pos: {
        x: posX,
        y: posY,
        d: posD
      },
      vel: {
        velX: velX,
        velY: velY // TODO: should add spin
      }
    }
    this.props.createAsteroids(newAsteroid)
    return(0)
  }

  updateAndConfineAsteroidToField = (id) => {

    // CONFINE ASTEROID TO FIELD

    // If Asteroid goes off screen bottom right corner,
    // come out top left corner
    if (((this.props.asteroids[id].pos.x + this.props.asteroids[id].vel.x) >= 1898) && ((this.props.asteroids[id].pos.y + this.props.asteroids[id].vel.y) >= 954)) {
      // this.controlAsteroid('ADJUST_TOP_LEFT', { element: "asteroid" })
      this.props.asteroids[id].adjustTopLeft()
    }

    // If Asteroid goes off screen bottom left corner, come out on top right side
    else if (((this.props.asteroids[id].pos.x + this.props.asteroids[id].vel.x) <= 0) && ((this.props.asteroids[id].pos.y + this.props.asteroids[id].vel.y) >= 954)) {
      // this.controlAsteroid('ADJUST_TOP_RIGHT', { element: "asteroid" })
      this.props.asteroids[id].adjustTopRight()
    }

    // If Asteroid goes off screen top right corner, come out on bottom left corner
    else if (((this.props.asteroids[id].pos.x + this.props.asteroids[id].vel.x) >= 1898) && ((this.props.asteroids[id].pos.y + this.props.asteroids[id].vel.y) <= 0)) {
      // this.controlAsteroid('ADJUST_BOTTOM_LEFT', { element: "asteroid" })
      this.props.asteroids[id].adjustBottomLeft()
    }

    // If Asteroid goes off screen top left corner, come out on bottom right corner
    else if (((this.props.asteroids[id].pos.x + this.props.asteroids[id].vel.x) <= 0) && ((this.props.asteroids[id].pos.y + this.props.asteroids[id].vel.y) <= 0)) {
      // this.controlAsteroid('ADJUST_BOTTOM_RIGHT', { element: "asteroid" })
      this.props.asteroids[id].adjustBottomRight()
    }

    // If Asteroid goes off screen right, come out on left side
    else if ((this.props.asteroids[id].pos.x + this.props.asteroids[id].vel.x) >= 1898) {
      // this.controlAsteroid('ADJUST_LEFT', { element: "asteroid" })
      this.props.asteroids[id].adjustLeft()
    }

    // If Asteroid goes off screen left, come out on right side
    else if ((this.props.asteroids[id].pos.x + this.props.asteroids[id].vel.x) <= 0) {
      // this.controlAsteroid('ADJUST_RIGHT', { element: "asteroid" })
      this.props.asteroids[id].adjustRight()
    }

    // If Asteroid goes off screen bottom, come out on top side
    else if ((this.props.asteroids[id].pos.y + this.props.asteroids[id].vel.y) >= 954) {
      // this.controlAsteroid('ADJUST_TOP', { element: "asteroid" })
      this.props.asteroids[id].adjustTop()
    }

    // If Asteroid goes off screen top, come out on bottom side
    else if ((this.props.asteroids[id].pos.y + this.props.asteroids[id].vel.y) <= 0) {
      // this.controlAsteroid('ADJUST_BOTTOM', { element: "asteroid" })
      this.props.asteroids[id].adjustBottom()
    }

    // Or, if we are within the boundaries already...
    else {
      // this.controlAsteroid('UPDATE_ASTEROID_LOCATION', null)
      this.props.asteroids[id].updateAsteroidLocation()
    }

  }

  render() {
    return(
      <div className='AsteroidContainer' />
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    createAsteroids: createAsteroids,
    adjustTopLeft: adjustTopLeft,
    adjustTopRight: adjustTopRight,
    adjustBottomLeft: adjustBottomLeft,
    adjustBottomRight: adjustBottomRight,
    adjustLeft: adjustLeft,
    adjustRight: adjustRight,
    adjustTop: adjustTop,
    adjustBottom: adjustBottom,
    updateAsteroidLocation: updateAsteroidLocation
  }, dispatch)
}

const mapStateToProps = (state) => {
  return {
    asteroids: [...state.asteroidContainer]
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(AsteroidContainer)
