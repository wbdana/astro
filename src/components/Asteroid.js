import React from 'react'
import { getRandomIntInclusive } from '../Helpers'
import { connect } from 'react-redux'

class Asteroid extends React.Component {

  componentDidMount() {
    // this.props.updateAsteroidContainer(this.state)

    // this.drawAsteroid()
    // Generate asteroid number of sides for drawing
    // this.initializeAsteroid(this.props)
    // this.updateAndConfineAsteroidsToField(this.props)
    // console.log(this.props)
    // this.updateAndConfineAsteroidsToField()
    // this.props.updateAsteroidState(this.state)
    this.initializeAsteroid()
  }

  controlAsteroid = (actionType, payload) => {
    this.props.store.dispatch({
      type: actionType,
      payload
    })
  }

  initializeAsteroid = (props)  => {
    let numSides = getRandomIntInclusive(3,9)
    console.log("numSides " + numSides)
    let min = 0;
    let i;
    // Assign angles and sides for the asteroid, making sure that
    // each angle is greater than the last angle (so it makes a nice closed
    // shape) using min
    let angles = []
    let sides = []
    for (i = 0; i < numSides; i++) {
      let newAngle = getRandomIntInclusive(min,45)
      let newSideMultiplier = getRandomIntInclusive(10,100)
      angles.push(newAngle)
      sides.push(this.props.size*newSideMultiplier)
      min = newAngle
    }
    this.controlAsteroid('INITIALIZE_ASTEROID', {
      angles,
      sides
    })
  }

  // setAngles = (min) => {
  //   let newAngle =
  //   Math.random(min, 137)
  //   this.setState({
  //     angles: [
  //       ...this.props.store.getState().asteroid.angles,
  //       newAngle
  //     ]
  //   })
  // }

  drawAsteroid = (props) => {
    let c = document.getElementById('AstroField')
    let ctx = c.getContext('2d')

    ctx.clearRect(0,0,c.width,c.height)
    ctx.save()
    ctx.strokeStyle = '#FFFFFF'
    ctx.fillStyle = '#000000'
    ctx.lineWidth = 1;
    ctx.translate(500,500)
    // ctx.rotate(angle*Math.PI/180)
    ctx.beginPath()
    ctx.moveTo(0,0)

    let i;
    for (i = 0; i < this.props.store.getState().asteroid.angles.length; i++) {
      console.log(this.props.store.getState().asteroid.angles[i])
      ctx.rotate(this.props.store.getState().asteroid.angles[i]*Math.PI/180)
      ctx.lineTo(0,this.props.store.getState().asteroid.sides[i])
    }
    ctx.closePath()
    ctx.fill()
    ctx.stroke()
    ctx.restore()
  }

  updateAndConfineAsteroidsToField = (props) => {
    this.drawAsteroid(this.props)
  }

  render() {
    return(
      <div className='Asteroid' />
    )
  }
}

const mapStateToProps = (state) => {
return { asteroid: { ...state } }
}

export default connect(mapStateToProps)(Asteroid)
