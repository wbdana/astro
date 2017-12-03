import React from 'react'
import { bindActionCreators } from 'redux'
import { moveShip, stopMoveShip, stopShip, increaseVelXPosLimited, increaseVelXNegLimited, setNewVelX, increaseVelYPosLimited, increaseVelYNegLimited, setNewVelY, rotateCounterClockwise, rotateClockwise, adjustTopLeft, adjustTopRight, adjustBottomLeft, adjustBottomRight, adjustLeft, adjustRight, adjustTop, adjustBottom, updateShipLocation } from '../actions/shipActions'
import { connect } from 'react-redux'

class Ship extends React.Component {

  componentDidMount() {
    // Redraw ship every 20ms, applying velocity to position each time
    this.updateAndConfineShipToField()

		// If keypress is 'w', 'a', or 'd', set state to begin applying acceleration
		// while the key is down
		window.addEventListener('keydown', (event) => {
			let keypress = event.key
      
      if (keypress === 'w' || keypress === 'a' || keypress === 'd') {
        this.props.moveShip(keypress)
      }


      // If keypress is 's', stop the Ship!
      if (keypress === 's') {
        this.props.stopShip()
      }

		})

		// On keyup for 'w', 'a', or 'd', set state to stop applying acceleration
		window.addEventListener('keyup', (event) => {
			let keypress = event.key
			if (keypress === 'w' || keypress === 'a' || keypress === 'd') {
        this.props.stopMoveShip(keypress)
			}
		})
  }

  // Increase the velocity in the current direction when 'w' is
  // pressed, provided that the Ship is not going too fast.
  updateOrLimitVelocity = () => {

    // Assign newVelX (new x velocity) and newVelY (new y velocity)
    // Multiplier is currently 0.25: adjust to change rate of acceleration of Ship
    let newVelX = this.props.vel.x + (0.25*(Math.sin(this.props.pos.d*Math.PI/180)))
    let newVelY = this.props.vel.y - (0.25*(Math.cos(this.props.pos.d*Math.PI/180)))

    // Set new x value for Ship velocity, ensuring that velocity does not
    // exceed 20
    // If you're already going right (x is positive), and the new total speed is
    // >= 20, limit speed in that direction to 20
    if (newVelX >= 20 && this.props.vel.x > 0) {
      this.props.increaseVelXPosLimited()
    }

    // If you're aready going left (x is negative), and the new total speed is
    // <= -20, limit speed in that direction to -20
    else if (newVelX <= -20 && this.props.vel.x < 0) {
      this.props.increaseVelXNegLimited()
    }

    // Otherwise (i.e., you're EITHER A. not moving, B. moving against your
    // current vector, c) moving with your current vector, but not above the
    // speed limit), allow normal acceleration
    else {
      this.props.setNewVelX(newVelX)
    }

    // Same for Y
    if (newVelY >= 20 && this.props.vel.y > 0) {
      this.props.increaseVelYPosLimited()
    }

    // Same for Y
    else if (newVelY <= -20 && this.props.vel.y < 0) {
      this.props.increaseVelYNegLimited()
    }

    // Same for Y
    else {
      this.props.setNewVelY(newVelY)
    }
  }

  updateAndConfineShipToField = () => {

    // Set interval to position (redraw) the ship based on
    // this.props.ship, as adjusted by the boundaries
    // of the Field
    this._interval = setInterval( () => {

      // Increase velocity while 'w' is held down
      if (this.props.keys.w === true) {
        this.updateOrLimitVelocity()
      }

      // Adjust direction counterclockwise while 'a' is held down
      if (this.props.keys.a === true) {
        this.props.rotateCounterClockwise()
      }

      // Adjust direction clockwise while 'd' is held down
      if (this.props.keys.d === true) {
        this.props.rotateClockwise()
      }

      // CONFINE SHIP TO FIELD

      // If Ship goes off screen bottom right corner,
      // come out top left corner
      if (((this.props.pos.x + this.props.vel.x) >= window.innerWidth) && ((this.props.pos.y + this.props.vel.y) >= window.innerHeight)) {
        this.props.adjustTopLeft()
      }

      // If Ship goes off screen bottom left corner, come out on top right side
      else if (((this.props.pos.x + this.props.vel.x) <= 0) && ((this.props.pos.y + this.props.vel.y) >= window.innerHeight)) {
        this.props.adjustTopRight()
      }

      // If Ship goes off screen top right corner, come out on bottom left corner
      else if (((this.props.pos.x + this.props.vel.x) >= window.innerWidth) && ((this.props.pos.y + this.props.vel.y) <= 0)) {
        this.props.adjustBottomLeft()
      }

      // If Ship goes off screen top left corner, come out on bottom right corner
      else if (((this.props.pos.x + this.props.vel.x) <= 0) && ((this.props.pos.y + this.props.vel.y) <= 0)) {
        this.props.adjustBottomRight()
      }

      // If Ship goes off screen right, come out on left side
      else if ((this.props.pos.x + this.props.vel.x) >= window.innerWidth) {
        this.props.adjustLeft()
      }

      // If Ship goes off screen left, come out on right side
      else if ((this.props.pos.x + this.props.vel.x) <= 0) {
        this.props.adjustRight()
      }

      // If Ship goes off screen bottom, come out on top side
      else if ((this.props.pos.y + this.props.vel.y) >= window.innerHeight) {
        this.props.adjustTop()
      }

      // If Ship goes off screen top, come out on bottom side
      else if ((this.props.pos.y + this.props.vel.y) <= 0) {
        this.props.adjustBottom()
      }

      // Or, if we are within the boundaries already...
      else {
        this.props.updateShipLocation()
      }

  
      if (this.props.game === false) {
        clearInterval(this._interval)
      }

    }, 20) // 20ms refresh rate
  }

  render() {
    return(
      <div className='Ship'>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    moveShip: moveShip,
    stopMoveShip: stopMoveShip,
    stopShip: stopShip,
    increaseVelXPosLimited: increaseVelXPosLimited,
    increaseVelXNegLimited: increaseVelXNegLimited,
    setNewVelX: setNewVelX,
    increaseVelYPosLimited: increaseVelYPosLimited,
    increaseVelYNegLimited: increaseVelYNegLimited,
    setNewVelY: setNewVelY,
    rotateCounterClockwise: rotateCounterClockwise,
    rotateClockwise: rotateClockwise,
    adjustTopLeft: adjustTopLeft,
    adjustTopRight: adjustTopRight,
    adjustBottomLeft: adjustBottomLeft,
    adjustBottomRight: adjustBottomRight,
    adjustLeft: adjustLeft,
    adjustRight: adjustRight,
    adjustTop: adjustTop,
    adjustBottom: adjustBottom,
    updateShipLocation: updateShipLocation
  }, dispatch)
}

const mapStateToProps = (state) => {
  return {
    pos: {
      x: state.ship.pos.x,
      y: state.ship.pos.y,
      d: state.ship.pos.d
    },
    vel: {
      x: state.ship.vel.x,
      y: state.ship.vel.y
    },
    keys: {
      w: state.ship.keys.w,
      a: state.ship.keys.a,
      d: state.ship.keys.d
    },
    game: state.ship.game
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Ship)
