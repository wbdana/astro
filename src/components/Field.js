import React from 'react'
import Ship from './Ship'
import AsteroidContainer from './AsteroidContainer'
import ShotContainer from './ShotContainer'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { removeAsteroid } from '../actions/asteroidActions'
import { removeShot } from '../actions/shotActions'

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
    // ctx.arc(0, 0, 150, 0, 2 * Math.PI) // hitbox
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
      ctx.strokeStyle = '#FFFFFF'
      ctx.fillStyle = '#000000'
      ctx.lineWidth = 2

      // Draw Ship
      this.drawShip(c, ctx)

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

      // Put in check for collision with Ship here
      this.checkAsteroidCollision()

      // and for hits
      this.checkHit()

    }, 20) // 20ms canvas refresh
  }

  checkAsteroidCollision = () => {
    let i
    for (i = 0; i < this.props.asteroidContainer.asteroids.length; i++) {
      if ((Math.abs(this.props.ship.pos.x - this.props.asteroidContainer.asteroids[i].pos.x) <= 130) && (Math.abs(this.props.ship.pos.y - this.props.asteroidContainer.asteroids[i].pos.y) <= 130)) {
        console.log("SHIP HIT ASTEROID")
        clearInterval(this._interval)
        break
      }
    }
  }

  async checkHit() {
    let i, j;
    // console.log(this.props.asteroidContainer.asteroids, this.props.shotContainer.shots)
    for (i = 0; i < this.props.asteroidContainer.asteroids.length; i++) {
      for (j = 0; j < this.props.shotContainer.shots.length; j++) {
        if ((Math.abs(this.props.shotContainer.shots[j].pos.x - this.props.asteroidContainer.asteroids[i].pos.x) <= 150) && (Math.abs(this.props.shotContainer.shots[j].pos.y - this.props.asteroidContainer.asteroids[i].pos.y) <= 150)) {
          console.log("SHOT HIT ASTEROID")
          let asteroidRemoved = await this.props.removeAsteroid(i)
          this.props.removeShot(j)
          break
          break
        }
      }
    }
  }

  render() {
    return(
      <canvas
        id='AstroField'
        width='1905px'
        height='961px'
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
    removeAsteroid: removeAsteroid,
    removeShot: removeShot
  }, dispatch)
}

const mapStateToProps = (state) => {
  return { ...state }
}

export default connect(mapStateToProps, mapDispatchToProps)(Field)
