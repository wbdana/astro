import React from 'react'
import Ship from './Ship'
// import AsteroidContainer from './AsteroidContainer'
import Asteroid from './Asteroid'

import { connect } from 'react-redux'
// import { Math } from 'core-js/library/web/timers';

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
      // Update Ship position
      
      // Canvas context
      let c = document.getElementById('AstroField')
      let ctx = c.getContext('2d')

      ctx.clearRect(0, 0, c.width, c.height)
      ctx.save()
      ctx.strokeStyle = '#FFFFFF'
      ctx.fillStyle = '#000000'
      ctx.lineWidth = 2
      this.drawShip(c, ctx)
      this.drawAsteroid(c, ctx)
      ctx.restore()

      // if (ctx) {

      // }
      // Ship position
      // let shipAngle = this.props.store.getState().ship.pos.d
      // let shipDrawX = this.props.store.getState().ship.pos.x
      // let shipDrawY = this.props.store.getState().ship.pos.y
      // let i

      // Field setup
      // ctx.clearRect(0,0,c.width,c.height)
      // ctx.save()
      // ctx.strokeStyle = '#FFFFFF'
      // ctx.fillStyle = '#000000'
      // ctx.lineWidth = 2

      // drawShip()
      // this.drawShip(c, ctx)

      // drawAsteroid()
      // this.drawAsteroid(c, ctx)

      // Move to Ship position and draw Ship
      // ctx.translate(shipDrawX, shipDrawY)
      // ctx.rotate(shipAngle * Math.PI/180)
      // ctx.beginPath()
      // ctx.moveTo(0,-8.5)
      // ctx.lineTo(-7,17)
      // ctx.lineTo(-4,12)
      // ctx.lineTo(4,12)
      // ctx.lineTo(7,17)
      // ctx.closePath()

      // Move to Asteroid position and draw
      // Asteroid

      // ctx.beginPath()
      // ctx.translate(this.props.store.getState().asteroid.pos.x, this.props.store.getState().asteroid.pos.y)
      // for (i = 0; i < this.props.store.getState().asteroid.angles.length; i++) {
      //   // ctx.rotate(this.props.store.getState().asteroid.angles[i] * Math.PI/180)
      //   ctx.lineTo(0,this.props.store.getState().asteroid.sides[i])
      // }
      // ctx.closePath()
      


      // Fill Field, draw Ship and Asteroids,
      // restore
      // ctx.fill()
      // ctx.stroke()
      // ctx.restore()
    }, 20) // 20ms canvas refresh
  }

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
          ref={instance => {this.ship = instance}}
        />
        <Asteroid
          store={this.props.store}
          ref={instance => {this.asteroid = instance}}
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
