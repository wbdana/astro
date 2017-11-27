import React from 'react'
import Ship from './Ship'
// import AsteroidContainer from './AsteroidContainer'
import Asteroid from './Asteroid'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

class Field extends React.Component {

  componentDidMount() {
    this.drawField()
  }

  drawShip = (c, ctx) => {
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
  }

  resetCanvas = (c, ctx) => {
    // Reset canvas path origin for Asteroid
    ctx.translate((this.props.ship.pos.x * -1), (this.props.ship.pos.y * -1
    ))
    ctx.rotate(0 * Math.PI / 180)
  }

  drawAsteroid = (c, ctx) => {
    let i
    ctx.beginPath()
    ctx.translate(this.props.asteroid.pos.x, this.props.asteroid.pos.y)
    for (i = 0; i < this.props.asteroid.angles.length; i++) {
      ctx.rotate(this.props.asteroid.angles[i] * Math.PI / 180)
      ctx.lineTo(0, this.props.asteroid.sides[i])
    }
    ctx.closePath()
    ctx.fill()
    ctx.stroke()
  }

  drawField = () => {

    setInterval(() => {

      // Canvas context
      let c = document.getElementById('AstroField')
      let ctx = c.getContext('2d')

      // Reset and save
      ctx.clearRect(0, 0, c.width, c.height)
      ctx.save()

      // Styling
      ctx.strokeStyle = '#FFFFFF'
      ctx.fillStyle = '#000000'
      ctx.lineWidth = 2

      // Draw Ship
      this.drawShip(c, ctx)

      // Reset path origin and draw Asteroid 
      this.resetCanvas(c, ctx)
      this.drawAsteroid(c, ctx)

      // Restore
      ctx.restore()
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
        <Asteroid
          store={this.props.store}
          size={2}
        />
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
