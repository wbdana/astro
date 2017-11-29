import React from 'react'
import Asteroid from './Asteroid'

import { getRandomIntInclusive } from '../Helpers'

import { connect } from 'react-redux'
import { createAsteroids } from '../actions/asteroidActions'
import { bindActionCreators } from 'redux'
import { setInterval } from 'core-js/library/web/timers';

class AsteroidContainer extends React.Component {
  componentDidMount() {
    this.spawnAsteroids = this.spawnAsteroids.bind(this)
    this.spawnAsteroids()
    // setInterval(()=>{this.checkIfNeedAsteroids()}, 5000)
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
    let posX = getRandomIntInclusive(5,1800)
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

  createAsteroids = (number, size) => {
    let i
    let newAsteroids = []
    let numSides
    let min
    let angles
    let sides
    let posX
    let posY
    let d
    let velX
    let velY
    let newAsteroid
    let newAngle
    let newSideMultiplier
    for (i = 0; i < number; i++) {
      console.log("In loop", i, newAsteroids)
      numSides = getRandomIntInclusive(3, 9)
      min = 0
      angles = []
      sides = []
      posX = getRandomIntInclusive(5, 1800)
      posY = getRandomIntInclusive(5, 1000)
      d = getRandomIntInclusive(0, 359)
      velX = getRandomIntInclusive(1, 5)
      velY = getRandomIntInclusive(1, 5)
      // THIS LOOP ONLY RUNS ONCE
      for (i = 0; i < numSides; i++) {
        newAngle = getRandomIntInclusive(min, 45)
        newSideMultiplier = getRandomIntInclusive(10, 100)
        angles.push(newAngle)
        sides.push(size * newSideMultiplier)
        min = newAngle
      }
      newAsteroid = {
        angles: angles,
        sides: sides,
        pos: {
          x: posX,
          y: posY,
          d: d
        },
        vel: {
          velX: velX,
          velY: velY // TODO: should add spin
        }
      }
      console.log("newAsteroid:", newAsteroid)
      newAsteroids.push(newAsteroid)
      console.log("newAsteroids:", newAsteroids)
      this.props.createAsteroids(newAsteroid)
    }
    // this.props.createAsteroids(newAsteroids)
  }

  render() {
    return(
      <div className='AsteroidContainer' />
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    createAsteroids: createAsteroids
  }, dispatch)
}

const mapStateToProps = (state) => {
  return {
    asteroids: [...state.asteroidContainer]
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(AsteroidContainer)
