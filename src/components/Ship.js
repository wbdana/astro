import React from 'react'
import { bindActionCreators } from 'redux'
import { moveShip, stopMoveShip, stopShip, increaseVelXPosLimited, increaseVelXNegLimited, setNewVelX, increaseVelYPosLimited, increaseVelYNegLimited, setNewVelY, rotateCounterClockwise, rotateClockwise, adjustTopLeft, adjustTopRight, adjustBottomLeft, adjustBottomRight, adjustLeft, adjustRight, adjustTop, adjustBottom, updateShipLocation } from '../actions/shipActions'
import { connect } from 'react-redux'

class Ship extends React.Component {

  componentDidMount() {
    // Redraw ship every 20ms, applying velocity to position each time
    console.log(this.props)
    // this.updateAndConfineShipToField()

		// If keypress is 'w', 'a', or 'd', set state to begin applying acceleration
		// while the key is down
		window.addEventListener('keydown', (event) => {
			let keypress = event.key
      
      if (keypress === 'w' || keypress === 'a' || keypress === 'd') {
        console.log(this.props)
        // this.controlShip('MOVE_SHIP', keypress)
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
        // this.controlShip('STOP_MOVE_SHIP', keypress)
        this.props.stopMoveShip(keypress)
			}
		})
  }

  controlShip = (actionType, payload) => {
    this.props.dispatch({
      type: actionType,
      payload
    })
  }

  // Increase the velocity in the current direction when 'w' is
  // pressed, provided that the Ship is not going too fast.
  updateOrLimitVelocity = () => {

    // Assign newVelX (new x velocity) and newVelY (new y velocity)
    // Multiplier is currently 0.25: adjust to change rate of acceleration of Ship
    let newVelX = this.props.ship.vel.x + (0.25*(Math.sin(this.props.ship.pos.d*Math.PI/180)))
    let newVelY = this.props.ship.vel.y - (0.25*(Math.cos(this.props.ship.pos.d*Math.PI/180)))

    // Set new x value for Ship velocity, ensuring that velocity does not
    // exceed 20
    // If you're already going right (x is positive), and the new total speed is
    // >= 20, limit speed in that direction to 20
    if (newVelX >= 20 && this.props.ship.vel.x > 0) {
      this.props.increaseVelXPosLimited()
      // this.controlShip('INCREASE_VELX_POS_LIMITED', null)
    }

    // If you're aready going left (x is negative), and the new total speed is
    // <= -20, limit speed in that direction to -20
    else if (newVelX <= -20 && this.props.ship.vel.x < 0) {
      // this.controlShip('INCREASE_VELX_NEG_LIMITED', null)
      this.props.increaseVelXNegLimited()
    }

    // Otherwise (i.e., you're EITHER A. not moving, B. moving against your
    // current vector, c) moving with your current vector, but not above the
    // speed limit), allow normal acceleration
    else {
      this.props.setNewVelX(newVelX)
      // this.controlShip('SET_NEW_VELX', newVelX)
    }

    // Same for Y
    if (newVelY >= 20 && this.props.ship.vel.y > 0) {
      // this.controlShip('INCREASE_VELY_POS_LIMITED', null)
      this.props.increaseVelYPosLimited()
    }

    // Same for Y
    else if (newVelY <= -20 && this.props.ship.vel.y < 0) {
      this.props.increaseVelYNegLimited()
      // this.controlShip('INCREASE_VELY_NEG_LIMITED', null)
    }

    // Same for Y
    else {
      this.props.setNewVelY(newVelY)
      // this.controlShip('SET_NEW_VELY', newVelY)
    }
  }

  updateAndConfineShipToField = () => {

    // Set interval to position (redraw) the ship based on
    // this.props.getState().ship, as adjusted by the boundaries
    // of the Field
    setInterval( () => {

      // Increase velocity while 'w' is held down
      if (this.props.ship.keys.w === true) {
        this.updateOrLimitVelocity()
      }

      // Adjust direction counterclockwise while 'a' is held down
      if (this.props.ship.keys.a === true) {
        // this.controlShip('ROTATE_COUNTERCLOCKWISE', null)
        this.props.rotateCounterClockwise()
      }

      // Adjust direction clockwise while 'd' is held down
      if (this.props.ship.keys.d === true) {
        // this.controlShip('ROTATE_CLOCKWISE', null)
        this.props.rotateClockwise()
      }

      // CONFINE SHIP TO FIELD

      // If Ship goes off screen bottom right corner,
      // come out top left corner
      if (((this.props.ship.pos.x + this.props.ship.vel.x) >= 1898) && ((this.props.ship.pos.y + this.props.ship.vel.y) >= 954)) {
        // this.controlShip('ADJUST_TOP_LEFT', { element: "ship" })
        this.props.adjustTopLeft()
      }

      // If Ship goes off screen bottom left corner, come out on top right side
      else if (((this.props.ship.pos.x + this.props.ship.vel.x) <= 0) && ((this.props.ship.pos.y + this.props.ship.vel.y) >= 954)) {
        // this.controlShip('ADJUST_TOP_RIGHT', { element: "ship" })
        this.props.adjustTopRight()
      }

      // If Ship goes off screen top right corner, come out on bottom left corner
      else if (((this.props.ship.pos.x + this.props.ship.vel.x) >= 1898) && ((this.props.ship.pos.y + this.props.ship.vel.y) <= 0)) {
        // this.controlShip('ADJUST_BOTTOM_LEFT', { element: "ship" })
        this.props.adjustBottomLeft()
      }

      // If Ship goes off screen top left corner, come out on bottom right corner
      else if (((this.props.ship.pos.x + this.props.ship.vel.x) <= 0) && ((this.props.ship.pos.y + this.props.ship.vel.y) <= 0)) {
        // this.controlShip('ADJUST_BOTTOM_RIGHT', { element: "ship" })
        this.props.adjustBottomRight()
      }

      // If Ship goes off screen right, come out on left side
      else if ((this.props.ship.pos.x + this.props.ship.vel.x) >= 1898) {
        // this.controlShip('ADJUST_LEFT', { element: "ship" })
        this.props.adjustLeft()
      }

      // If Ship goes off screen left, come out on right side
      else if ((this.props.ship.pos.x + this.props.ship.vel.x) <= 0) {
        // this.controlShip('ADJUST_RIGHT', { element: "ship" })
        this.props.adjustRight()
      }

      // If Ship goes off screen bottom, come out on top side
      else if ((this.props.ship.pos.y + this.props.ship.vel.y) >= 954) {
        // this.controlShip('ADJUST_TOP', { element: "ship" })
        this.props.adjustTop()
      }

      // If Ship goes off screen top, come out on bottom side
      else if ((this.props.ship.pos.y + this.props.ship.vel.y) <= 0) {
        // this.controlShip('ADJUST_BOTTOM', { element: "ship" })
        this.props.adjustBottom()
      }

      // Or, if we are within the boundaries already...
      else {
        // this.controlShip('UPDATE_SHIP_LOCATION', null)
        this.props.updateShipLocation()
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

// const mapDispatchToProps = (dispatch) => {
//   return bindActionCreators({
//     getSingleUserByID: getSingleUserByID,
//     getUserCharacters: getUserCharacters,
//     getSecondUsersCharacters: getSecondUsersCharacters
//   }, dispatch);
// }


const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    moveShip: moveShip,
    stopMoveShip: stopMoveShip,
    stopShip: stopShip
  }, dispatch)
}

const mapStateToProps = (state) => {
  return { ...state.ship }
}

export default connect(mapStateToProps, mapDispatchToProps)(Ship)
