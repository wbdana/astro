import React from 'react'
import { getRandomIntInclusive } from '../Helpers'
import { connect } from 'react-redux'

class Asteroid extends React.Component {
  // 7 angles for 8 sides; 8th angle is ctx.closePath()
  state = {
    size: this.props.size,
    // angles: [null, null, null, null, null, null, null]
    angles: [],
    sides: [],
    pos: {
      x: 500,
      y: 500
    },
    vel: {
      x: 0,
      y: 0
    }
  }

  componentDidMount() {
    // this.props.updateAsteroidContainer(this.state)

    // this.drawAsteroid()
    // Generate asteroid number of sides for drawing
    this.initializeAsteroid()
    // this.updateAndConfineAsteroidsToField()
    // this.props.updateAsteroidState(this.state)




    // this.setState({
    //   ...this.state,
    //   numSides: Math.random(3,9)
    // }, ()=>{
    //   // Then generate angles to draw
    //   this.setState({
    //     var i;
    //     let min = 0;
    //     for (i = 0; i < this.state.numSides; i++) {
    //       this.setAngles(min)
    //       min = this.state.angles[this.state.angles.length - 1]
    //     }
    //   }, ()=>{
    //     // Then generate the length of each side
    //     for (i = 0; i < this.state.numSides; i++) {
    //       this.setState({
    //         ...this.state,
    //         sides: [
    //           ...this.state.sides,
    //           Math.random(10,100)
    //         ]
    //       })
    //     }
    //   })
    // })
  }

  initializeAsteroid = ()  => {
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
      sides.push(this.state.size*newSideMultiplier)
      console.log(newAngle)
      console.log("newAngle " + newAngle)
      console.log("this.state.size*newSideMultiplier " + this.state.size*newSideMultiplier)
      min = newAngle
    }
    this.setState({
      ...this.state,
      angles: angles,
      sides: sides
    }, ()=>{this.props.updateAsteroidState(this.state)})
    setTimeout(()=>{console.log(this.state)}, 5000)
  }

  // setAngles = (min) => {
  //   let newAngle =
  //   Math.random(min, 137)
  //   this.setState({
  //     angles: [
  //       ...this.state.angles,
  //       newAngle
  //     ]
  //   })
  // }

  drawAsteroid = () => {
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
    for (i = 0; i < this.state.angles.length; i++) {
      console.log(this.state.angles[i])
      ctx.rotate(this.state.angles[i]*Math.PI/180)
      ctx.lineTo(0,this.state.sides[i])
    }

    ctx.lineTo(10, this.state.angles[0])
    // ctx.lineTo(10, this.state.angles[1])
    // ctx.lineTo(10, this.state.angles[2])
    // ctx.lineTo(10, this.state.angles[3])
    // ctx.lineTo(10, this.state.angles[4])
    // ctx.lineTo(10, this.state.angles[5])
    // ctx.lineTo(10, this.state.angles[6])
    // ctx.lineTo(10, this.state.angles[7])
    ctx.closePath()
    ctx.fill()
    ctx.stroke()
    ctx.restore()
  }

  updateAndConfineAsteroidsToField = () => {
    setInterval(() => {
      this.drawAsteroid()
    }, 20)
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
