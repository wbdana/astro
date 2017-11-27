import React from 'react'
import { getRandomIntInclusive } from '../Helpers'
import { initializeAsteroid, adjustTopLeft, adjustTopRight, adjustBottomLeft, adjustBottomRight, adjustLeft, adjustRight, adjustTop, adjustBottom, updateAsteroidLocation } from '../actions/asteroidActions'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

class Asteroid extends React.Component {

  componentDidMount() {
    this.initializeAsteroid()
    this.updateAndConfineAsteroidToField()
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
    let d = getRandomIntInclusive(0,359)
    let velX = getRandomIntInclusive(1,10)
    let velY = getRandomIntInclusive(1,10)
    for (i = 0; i < numSides; i++) {
      let newAngle = getRandomIntInclusive(min,45)
      let newSideMultiplier = getRandomIntInclusive(10,100)
      angles.push(newAngle)
      sides.push(this.props.size*newSideMultiplier)
      min = newAngle
    }
    this.props.initializeAsteroid({
      angles: angles,
      sides: sides,
      d: d,
      velX: velX,
      velY: velY
    })
    // this.controlAsteroid('INITIALIZE_ASTEROID', {
    //   angles,
    //   sides,
    //   d,
    //   velX,
    //   velY
    // })
  }

  updateAndConfineAsteroidToField = () => {

    // Set interval to position (redraw) the asteroid based on
    // this.props.getState().asteroid, as adjusted by the boundaries
    // of the Field
    setInterval(() => {

      // CONFINE ASTEROID TO FIELD

      // If Asteroid goes off screen bottom right corner,
      // come out top left corner
      if (((this.props.pos.x + this.props.vel.x) >= 1898) && ((this.props.pos.y + this.props.vel.y) >= 954)) {
        // this.controlAsteroid('ADJUST_TOP_LEFT', { element: "asteroid" })
        this.props.adjustTopLeft()
      }

      // If Asteroid goes off screen bottom left corner, come out on top right side
      else if (((this.props.pos.x + this.props.vel.x) <= 0) && ((this.props.pos.y + this.props.vel.y) >= 954)) {
        // this.controlAsteroid('ADJUST_TOP_RIGHT', { element: "asteroid" })
        this.props.adjustTopRight()
      }

      // If Asteroid goes off screen top right corner, come out on bottom left corner
      else if (((this.props.pos.x + this.props.vel.x) >= 1898) && ((this.props.pos.y + this.props.vel.y) <= 0)) {
        // this.controlAsteroid('ADJUST_BOTTOM_LEFT', { element: "asteroid" })
        this.props.adjustBottomLeft()
      }

      // If Asteroid goes off screen top left corner, come out on bottom right corner
      else if (((this.props.pos.x + this.props.vel.x) <= 0) && ((this.props.pos.y + this.props.vel.y) <= 0)) {
        // this.controlAsteroid('ADJUST_BOTTOM_RIGHT', { element: "asteroid" })
        this.props.adjustBottomRight()
      }

      // If Asteroid goes off screen right, come out on left side
      else if ((this.props.pos.x + this.props.vel.x) >= 1898) {
        // this.controlAsteroid('ADJUST_LEFT', { element: "asteroid" })
        this.props.adjustLeft()
      }

      // If Asteroid goes off screen left, come out on right side
      else if ((this.props.pos.x + this.props.vel.x) <= 0) {
        // this.controlAsteroid('ADJUST_RIGHT', { element: "asteroid" })
        this.props.adjustRight()
      }

      // If Asteroid goes off screen bottom, come out on top side
      else if ((this.props.pos.y + this.props.vel.y) >= 954) {
        // this.controlAsteroid('ADJUST_TOP', { element: "asteroid" })
        this.props.adjustTop()
      }

      // If Asteroid goes off screen top, come out on bottom side
      else if ((this.props.pos.y + this.props.vel.y) <= 0) {
        // this.controlAsteroid('ADJUST_BOTTOM', { element: "asteroid" })
        this.props.adjustBottom()
      }

      // Or, if we are within the boundaries already...
      else {
        // this.controlAsteroid('UPDATE_ASTEROID_LOCATION', null)
        this.props.updateAsteroidLocation()
      }

    }, 20) // 20ms refresh rate

  }

  render() {
    return(
      <div className='Asteroid' />
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    initializeAsteroid: initializeAsteroid,
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


adjustTopLeft, adjustTopRight, adjustBottomLeft, adjustBottomRight, adjustLeft, adjustRight, adjustTop, adjustBottom, updateAsteroidLocation

const mapStateToProps = (state) => {
  return { ...state.asteroid }
}

export default connect(mapStateToProps, mapDispatchToProps)(Asteroid)
