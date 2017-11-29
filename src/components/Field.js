import React from 'react'
import Ship from './Ship'
import AsteroidContainer from './AsteroidContainer'
import Asteroid from './Asteroid'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

class Field extends React.Component {

  componentDidMount() {
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

  componentDidUpdate() {
    console.log(this.props.asteroidContainer)
  }

  resetCanvas = (c, ctx) => {
    // Reset canvas path origin for Asteroid
    ctx.translate((this.props.ship.pos.x * -1), (this.props.ship.pos.y * -1
    ))
    ctx.rotate(this.props.ship.pos.d * Math.PI / 180)
  }

  drawAsteroid = (c, ctx, j) => {
    ctx.save()
    let i
    ctx.beginPath()
    ctx.translate(this.props.asteroidContainer.asteroids[j].pos.x, this.props.asteroidContainer.asteroids[j].pos.y)
    for (i = 0; i < this.props.asteroidContainer.asteroids[j].angles.length; i++) {
      ctx.rotate(this.props.asteroidContainer.asteroids[j].angles[i] * Math.PI / 180)
      ctx.lineTo(0, this.props.asteroidContainer.asteroids[j].sides[i])
    }
    ctx.closePath()
    ctx.fill()
    ctx.stroke()
    ctx.restore()
  }

  drawField = () => {

    setInterval(() => {

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
      // this.drawAsteroid(c, ctx)

    }, 20) // 20ms canvas refresh
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
      </canvas>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({

  })
}

const mapStateToProps = (state) => {
  return { ...state }
}

export default connect(mapStateToProps, mapDispatchToProps)(Field)
