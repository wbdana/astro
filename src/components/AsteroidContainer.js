import React from 'react'
import Asteroid from './Asteroid'

import { getRandomIntInclusive } from '../Helpers'

import { connect } from 'react-redux'
import { createAsteroids, adjustTopLeft, adjustTopRight, adjustBottomLeft, adjustBottomRight, adjustLeft, adjustRight, adjustTop, adjustBottom, updateAsteroidLocation } from '../actions/asteroidActions'
import { bindActionCreators } from 'redux'

class AsteroidContainer extends React.Component {
  async componentDidMount() {
    this.spawnAsteroids = this.spawnAsteroids.bind(this)
    let createdAsteroids = await this.spawnAsteroids()
    setInterval((createdAsteroids) => {
      this.updateAsteroids()
    }, 20)
  }

  async spawnAsteroids() {
    let firstAsteroid = await this.createAsteroid(2)
    let secondAsteroid = (firstAsteroid) => {
      this.createAsteroid(2)
    }
    secondAsteroid(firstAsteroid)
    console.log(this.props.asteroids)
    return(this.props.asteroids)
  }

  checkIfNeedAsteroids = () => {
    if (this.props.asteroids.length === 0) {
      this.spawnAsteroids()
    }
  }

  async updateAsteroids() {
    // if (this.props.asteroids.length) {
      let firstAsteroid = await this.updateAndConfineAsteroidToField(0)
      let secondAsteroid = (firstAsteroid) => {
        this.updateAndConfineAsteroidToField(1)
      }
      secondAsteroid(firstAsteroid)
    // }
    return(0)
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
        x: velX,
        y: velY // TODO: should add spin
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
      this.props.adjustTopLeft(id)
    }

    // If Asteroid goes off screen bottom left corner, come out on top right side
    else if (((this.props.asteroids[id].pos.x + this.props.asteroids[id].vel.x) <= 0) && ((this.props.asteroids[id].pos.y + this.props.asteroids[id].vel.y) >= 954)) {
      this.props.adjustTopRight(id)
    }

    // If Asteroid goes off screen top right corner, come out on bottom left corner
    else if (((this.props.asteroids[id].pos.x + this.props.asteroids[id].vel.x) >= 1898) && ((this.props.asteroids[id].pos.y + this.props.asteroids[id].vel.y) <= 0)) {
      this.props.adjustBottomLeft(id)
    }

    // If Asteroid goes off screen top left corner, come out on bottom right corner
    else if (((this.props.asteroids[id].pos.x + this.props.asteroids[id].vel.x) <= 0) && ((this.props.asteroids[id].pos.y + this.props.asteroids[id].vel.y) <= 0)) {
      this.props.adjustBottomRight(id)
    }

    // If Asteroid goes off screen right, come out on left side
    else if ((this.props.asteroids[id].pos.x + this.props.asteroids[id].vel.x) >= 1898) {
      this.props.adjustLeft(id)
    }

    // If Asteroid goes off screen left, come out on right side
    else if ((this.props.asteroids[id].pos.x + this.props.asteroids[id].vel.x) <= 0) {
      this.props.adjustRight(id)
    }

    // If Asteroid goes off screen bottom, come out on top side
    else if ((this.props.asteroids[id].pos.y + this.props.asteroids[id].vel.y) >= 954) {
      this.props.adjustTop(id)
    }

    // If Asteroid goes off screen top, come out on bottom side
    else if ((this.props.asteroids[id].pos.y + this.props.asteroids[id].vel.y) <= 0) {
      this.props.adjustBottom(id)
    }

    // Or, if we are within the boundaries already...
    else {
      this.props.updateAsteroidLocation(id)
    }

    return(0) // for async purposes
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
    asteroids: [...state.asteroidContainer.asteroids]
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AsteroidContainer)
