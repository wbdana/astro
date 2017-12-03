import React from 'react'
import Asteroid from './Asteroid'

import { getRandomIntInclusive } from '../Helpers'

import { connect } from 'react-redux'
import { createAsteroids, adjustTopLeft, adjustTopRight, adjustBottomLeft, adjustBottomRight, adjustLeft, adjustRight, adjustTop, adjustBottom, updateAsteroidLocation } from '../actions/asteroidActions'
import { bindActionCreators } from 'redux'

class AsteroidContainer extends React.Component {
  async componentDidMount() {
    this.spawnAsteroids = this.spawnAsteroids.bind(this)
    let createdAsteroids = await this.createAsteroids(2, 2)
    console.log(createdAsteroids)
    setInterval((createdAsteroids) => {
      this.updateAsteroids()
    }, 40)
  }

  async spawnAsteroids() {
    let firstAsteroid = await this.createAsteroid(2)
    let secondAsteroid = (firstAsteroid) => {
      this.createAsteroid(2)
    }
    secondAsteroid(firstAsteroid)
    return(this.props.asteroids)
  }

  updateAsteroids = () => {
    console.log("LENGTH", this.props.asteroids)
    let i
    for (i = 0; i < this.props.asteroids.length; i++) {
      this.props.updateAsteroidLocation(i)
    }
  }

  createAsteroids = (numAsteroids, size) => {
    let i, j, numSides, angles, sides, posX, posY, posD, velX, velY, newSideMultiplier, newAsteroid;
    let newAsteroids = []
    for (i = 0; i < numAsteroids; i++) {
      numSides = getRandomIntInclusive(7, 9)
      angles = []
      sides = []
      posX = getRandomIntInclusive(5, 200)
      posY = getRandomIntInclusive(5, 1000)
      posD = getRandomIntInclusive(0, 359)
      velX = getRandomIntInclusive(-5, 5)
      velY = getRandomIntInclusive(-5, 5)
      // console.log(posX, posY, posD, velX, velY)
      for (j = 0; j < numSides; j++) {
        newSideMultiplier = getRandomIntInclusive(70,80)
        angles.push(45)
        sides.push(size*newSideMultiplier)
      }
      newAsteroid = {
        angles: angles,
        sides: sides,
        pos: {
          x: posX,
          y: posY,
          d: posD
        },
        vel: {
          x: velX,
          y: velY
        },
        size: size
      }
      newAsteroids.push(newAsteroid)
    }
    this.props.createAsteroids(newAsteroids)
    return(0)    
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
