import React from 'react'
import Ship from './Ship'
import AsteroidContainer from './AsteroidContainer'
import ShotContainer from './ShotContainer'
import GameOver from './GameOver'
import { getRandomIntInclusive } from '../Helpers'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { createAsteroids, removeAsteroid } from '../actions/asteroidActions'
import { removeShot } from '../actions/shotActions'
import { endGame } from '../actions/shipActions'

class Field extends React.Component {

  componentDidMount() {
    this.checkHit = this.checkHit.bind(this)
    this.drawField()
  }

  drawShip = (c, ctx) => {
    ctx.save()
    let shipAngle = this.props.ship.pos.d
    let shipDrawX = this.props.ship.pos.x
    let shipDrawY = this.props.ship.pos.y
    ctx.translate(shipDrawX, shipDrawY)
    ctx.rotate(shipAngle * Math.PI / 180)
    ctx.beginPath()
    ctx.moveTo(0, -8.5)
    ctx.lineTo(-7, 17)
    ctx.lineTo(-4, 12)
    ctx.lineTo(4, 12)
    ctx.lineTo(7, 17)
    ctx.closePath()
    ctx.fill()
    ctx.stroke()
    ctx.restore()
  }

  drawAsteroid = (c, ctx, j) => {
    ctx.save()
    let i
    ctx.beginPath()
    ctx.translate(this.props.asteroidContainer.asteroids[j].pos.x, this.props.asteroidContainer.asteroids[j].pos.y)
    // ctx.arc(0, 0, (this.props.asteroidContainer.asteroids[j].size * 65), 0, 2 * Math.PI) // hitbox
    // ctx.arc(0, 0, 10, 0, 2 * Math.PI) // center
    ctx.moveTo(0,this.props.asteroidContainer.asteroids[j].sides[0]) // move away from center
    for (i = 0; i < this.props.asteroidContainer.asteroids[j].angles.length; i++) {
      ctx.rotate(this.props.asteroidContainer.asteroids[j].angles[i] * Math.PI / 180)
      ctx.lineTo(0, this.props.asteroidContainer.asteroids[j].sides[i])
      ctx.rotate(0 * Math.PI / 180)
    }
    ctx.closePath()
    ctx.fill()
    ctx.stroke()
    ctx.restore()
  }

  drawShot = (c, ctx, i) => {
    ctx.save()
    ctx.fillStyle = '#FFFFFF'
    ctx.fillRect(this.props.shotContainer.shots[i].pos.x, this.props.shotContainer.shots[i].pos.y,2,2)
    ctx.restore()
  }

  drawField = () => {
    this._interval = setInterval(() => {

      // Canvas context
      let c = document.getElementById('AstroField')
      let ctx = c.getContext('2d')

      // Reset and save
      ctx.clearRect(0, 0, c.width, c.height)

      // Styling
      // ctx.strokeStyle = '#1CC8EF' // blue ship
      ctx.strokeStyle = '#09B703' // green ship
      ctx.fillStyle = '#000000'
      ctx.lineWidth = 2

      // Draw Ship
      this.drawShip(c, ctx)

      // ctx.strokeStyle = '#EF9E1C' // orange asteroids
      ctx.strokeStyle = '#5E04CC' // purple asteroids
      // Draw Asteroid 
      let i
      for (i = 0; i < this.props.asteroidContainer.asteroids.length; i++) {
        this.drawAsteroid(c, ctx, i)
      }

      // Draw Shots
      let j
      for (j = 0; j < this.props.shotContainer.shots.length; j++) {
        this.drawShot(c, ctx, j)
      }

      // Check for collision with Ship here
      this.checkAsteroidCollision()

      // and for hits
      this.checkHit()

    }, 20) // 20ms canvas refresh
  }

  checkAsteroidCollision = () => {
    let i
    for (i = 0; i < this.props.asteroidContainer.asteroids.length; i++) {
      if ((Math.abs(this.props.ship.pos.x - this.props.asteroidContainer.asteroids[i].pos.x) <= (this.props.asteroidContainer.asteroids[i].size * 65)) && (Math.abs(this.props.ship.pos.y - this.props.asteroidContainer.asteroids[i].pos.y) <= (this.props.asteroidContainer.asteroids[i].size * 65))) {
        clearInterval(this._interval)
        this.props.endGame()
        break
      }
    }
  }

  async checkHit() {
    let i, j;
    for (i = 0; i < this.props.asteroidContainer.asteroids.length; i++) {
      for (j = 0; j < this.props.shotContainer.shots.length; j++) {
        if ((Math.abs(this.props.shotContainer.shots[j].pos.x - this.props.asteroidContainer.asteroids[i].pos.x) <= (this.props.asteroidContainer.asteroids[i].size * 65)) && (Math.abs(this.props.shotContainer.shots[j].pos.y - this.props.asteroidContainer.asteroids[i].pos.y) <= (this.props.asteroidContainer.asteroids[i].size * 65))) {
          if (this.props.asteroidContainer.asteroids[i].size >= .5) {
            this.breakAsteroidInTwo(this.props.asteroidContainer.asteroids[i].size / 2, this.props.asteroidContainer.asteroids[i].pos.x, this.props.asteroidContainer.asteroids[i].pos.y)
          }
          let asteroidRemoved = await this.props.removeAsteroid(i)
          let shotRemoved = await this.props.removeShot(j)
          break
          // break
        }
      }
    }
  }

  breakAsteroidInTwo = (newSize, posX, posY) => {
    let i, j, numSides, angles, sides, posD, velX, velY, newSideMultiplier, newAsteroid;
    let newAsteroids = []
    for (i = 0; i < 2; i++) {
      numSides = getRandomIntInclusive(7,9)
      angles = []
      sides = []
      posD = getRandomIntInclusive(0,359)
      velX = getRandomIntInclusive(-5,5)
      velY = getRandomIntInclusive(-5,5)
      for (j = 0; j < numSides; j++) {
        newSideMultiplier = getRandomIntInclusive(70,80)
        angles.push(45)
        sides.push(newSize*newSideMultiplier)
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
        size: newSize
      }
      newAsteroids.push(newAsteroid)
    }
    this.props.createAsteroids(newAsteroids)
  }

  render() {
    return(
      <canvas
        id='AstroField'
        width={window.innerWidth}
        height={window.innerHeight}
      >
        <Ship />
        <AsteroidContainer />
        <ShotContainer />
      </canvas>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    createAsteroids: createAsteroids,
    removeAsteroid: removeAsteroid,
    removeShot: removeShot,
    endGame: endGame
  }, dispatch)
}

const mapStateToProps = (state) => {
  return { ...state }
}

export default connect(mapStateToProps, mapDispatchToProps)(Field)
