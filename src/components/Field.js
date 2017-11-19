import React from 'react'
import Ship from './Ship'
// import AsteroidContainer from './AsteroidContainer'
import Asteroid from './Asteroid'

import { connect } from 'react-redux'

class Field extends React.Component {

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

  componentDidMount() {
    this.drawField()
  }

  drawShip = (c, ctx) => {
    let shipAngle = this.props.store.getState().ship.pos.d
    let shipDrawX = this.props.store.getState().ship.pos.x
    let shipDrawY = this.props.store.getState().ship.pos.y
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

    // Reset canvas path origin for Asteroid
    ctx.translate((shipDrawX * -1), (shipDrawY * -1))
  }

  drawAsteroid = (c, ctx) => {
    let i
    ctx.beginPath()
    ctx.translate(this.props.store.getState().asteroid.pos.x, this.props.store.getState().asteroid.pos.y)
    for (i = 0; i < this.props.store.getState().asteroid.angles.length; i++) {
      ctx.rotate(this.props.store.getState().asteroid.angles[i] * Math.PI / 180)
      ctx.lineTo(0, this.props.store.getState().asteroid.sides[i])
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
        <Ship
          store={this.props.store}
        />
        <Asteroid
          store={this.props.store}
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
