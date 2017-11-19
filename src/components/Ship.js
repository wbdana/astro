import React from 'react'
import { connect } from 'react-redux'

class Ship extends React.Component {

  componentDidMount() {
    // Redraw ship every 20ms, applying velocity to position each time
    console.log(this.props.store.getState())
    this.updateAndConfineShipToField()

		// If keypress is 'w', 'a', or 'd', set state to begin applying acceleration
		// while the key is down
		window.addEventListener('keydown', (event) => {
			let keypress = event.key
      
      if (keypress === 'w' || keypress === 'a' || keypress === 'd') {
        this.controlShip('MOVE_SHIP', keypress)
      }


      // If keypress is 's', stop the Ship!
      if (keypress === 's') {
        this.controlShip('STOP_SHIP', null)
      }

		})

		// On keyup for 'w', 'a', or 'd', set state to stop applying acceleration
		window.addEventListener('keyup', (event) => {
			let keypress = event.key
			if (keypress === 'w' || keypress === 'a' || keypress === 'd') {
        this.controlShip('STOP_MOVE_SHIP', keypress)
				// this.setState({
				// 	...this.state,
				// 	keys: {
				// 		...this.state.keys,
				// 		[keypress]: false
				// 	}
				// }, ()=>{console.log(this.state.keys)})
			}
		})
  }

  controlShip = (actionType, payload) => {
    this.props.store.dispatch({
      type: actionType,
      payload
    })
  }

  // REDUX updateOrLimitVelocity
  // Increase the velocity in the current direction when 'w' is
  // pressed, provided that the Ship is not going too fast.
  updateOrLimitVelocity = () => {

    // Assign newVelX (new x velocity) and newVelY (new y velocity)
    // Multiplier is currently 0.25: adjust to change rate of acceleration of Ship
    let newVelX = this.props.store.getState().ship.vel.x + (0.25*(Math.sin(this.props.store.getState().ship.pos.d*Math.PI/180)))
    let newVelY = this.props.store.getState().ship.vel.y - (0.25*(Math.cos(this.props.store.getState().ship.pos.d*Math.PI/180)))

    // Set new x value for Ship velocity, ensuring that velocity does not
    // exceed 20
    // If you're already going right (x is positive), and the new total speed is
    // >= 20, limit speed in that direction to 20
    if (newVelX >= 20 && this.props.store.getState().ship.vel.x > 0) {
      this.controlShip('INCREASE_VELX_POS_LIMITED', null)
    }

    // If you're aready going left (x is negative), and the new total speed is
    // <= -20, limit speed in that direction to -20
    else if (newVelX <= -20 && this.props.store.getState().ship.vel.x < 0) {
      this.controlShip('INCREASE_VELX_NEG_LIMITED', null)
    }

    // Otherwise (i.e., you're EITHER A. not moving, B. moving against your
    // current vector, c) moving with your current vector, but not above the
    // speed limit), allow normal acceleration
    else {
      this.controlShip('SET_NEW_VELX', newVelX)
    }

    // Set new y value for Ship velocity, ensuring that velocity does not
    // exceed 20
    // If you're already going down (y is positive), and the new total speed is
    // >= 20, limit speed in that direction to 20
    if (newVelY >= 20 && this.props.store.getState().ship.vel.y > 0) {
      this.controlShip('INCREASE_VELY_POS_LIMITED', null)
    }

    // If you're already going up (y is negative), and the new total speed is
    // <= -20, limit speed in that direction to -20
    else if (newVelY <= -20 && this.props.store.getState().ship.vel.y < 0) {
      this.controlShip('INCREASE_VELY_NEG_LIMITED', null)
    }

    // Otherwise (i.e., you're EITHER A. not moving, B. moving against your
    // current vector, c) moving with your current vector, but not above the
    // speed limit), allow normal acceleration
    else {
      this.controlShip('SET_NEW_VELY', newVelY)
    }
  }

  updateAndConfineShipToField = () => {

    // Set interval to position (redraw) the ship based on
    // this.props.getState()ship, as adjusted by the boundaries
    // of the Field

    setInterval(() => {

      // SHIP CONTROLS

      // Increase velocity while 'w' is held down
      if (this.props.store.getState().ship.keys.w === true) {
        this.updateOrLimitVelocity()
      }

      // Adjust direction counterclockwise while 'a' is held down
      if (this.props.store.getState().ship.keys.a === true) {
        this.controlShip('ROTATE_COUNTERCLOCKWISE', null)
      }

      // Adjust direction clockwise while 'd' is held down
      if (this.props.store.getState().ship.keys.d === true) {
        this.controlShip('ROTATE_CLOCKWISE', null)
      }

      // CONFINE SHIP TO FIELD

      // If Ship goes off screen bottom right corner,
      // come out top left corner
      if (((this.props.store.getState().ship.pos.x + this.props.store.getState().ship.vel.x) >= 1898) && ((this.props.store.getState().ship.pos.y +this.props.store.getState().ship.vel.y) >= 954)) {
        this.controlShip('ADJUST_TOP_LEFT', null)
      }

      // If Ship goes off screen bottom left corner, come out on top right side
      else if (((this.props.store.getState().ship.pos.x + this.props.store.getState().ship.vel.x) <= 0) && ((this.props.store.getState().ship.pos.y + this.props.store.getState().ship.vel.y) >= 954)) {
        this.controlShip('ADJUST_TOP_RIGHT', null)
      }

      // If Ship goes off screen top right corner, come out on bottom left corner
      else if (((this.props.store.getState().ship.pos.x + this.props.store.getState().ship.vel.x) >= 1898) && ((this.props.store.getState().ship.pos.y + this.props.store.getState().ship.vel.y) <= 0)) {
        this.controlShip('ADJUST_BOTTOM_LEFT', null)
      }

      // If Ship goes off screen top left corner, come out on bottom right corner
      else if (((this.props.store.getState().ship.pos.x + this.props.store.getState().ship.vel.x) <= 0) && ((this.props.store.getState().ship.pos.y + this.props.store.getState().ship.vel.y) <= 0)) {
        this.controlShip('ADJUST_BOTTOM_RIGHT', null)
      }

      // If Ship goes off screen right, come out on left side
      else if ((this.props.store.getState().ship.pos.x + this.props.store.getState().ship.vel.x) >= 1898) {
        this.controlShip('ADJUST_LEFT', null)
      }

      // If Ship goes off screen left, come out on right side
      else if ((this.props.store.getState().ship.pos.x + this.props.store.getState().ship.vel.x) <= 0) {
        this.controlShip('ADJUST_RIGHT', null)
      }

      // If Ship goes off screen bottom, come out on top side
      else if ((this.props.store.getState().ship.pos.y + this.props.store.getState().ship.vel.y) >= 954) {
        this.controlShip('ADJUST_TOP', null)
      }

      // If Ship goes off screen top, come out on bottom side
      else if ((this.props.store.getState().ship.pos.y + this.props.store.getState().ship.vel.y) <= 0) {
        this.controlShip('ADJUST_BOTTOM', null)
      }

      // Or, if we are within the boundaries already...
      else {
        this.controlShip('UPDATE_SHIP_LOCATION', null)
      }
    
      this.drawShip()

    }, 20) // 20ms refresh interval
  }

  drawShip = () => {
    // console.log("this.drawShip()")
      let c = document.getElementById('AstroField')
      let ctx = c.getContext('2d')
      // let angle = this.state.pos.d
      console.log(this.props.store.getState().ship)
      let angle = this.props.store.getState().ship.pos.d
      let drawX = this.props.store.getState().ship.pos.x + this.props.store.getState().ship.vel.x
      let drawY = this.props.store.getState().ship.pos.y + this.props.store.getState().ship.vel.y
      ctx.clearRect(0,0,c.width,c.height)
      ctx.save()
      ctx.strokeStyle = '#FFFFFF'
      ctx.fillStyle = '#000000'
      ctx.lineWidth = 2;
      ctx.translate(drawX, drawY)
      ctx.rotate(angle*Math.PI/180)

      ctx.beginPath()
      ctx.moveTo(0,-8.5)
      ctx.lineTo(-7,17)
      ctx.lineTo(-4,12)
      ctx.lineTo(4,12)
      ctx.lineTo(7,17)
      ctx.closePath()
      ctx.fill()
      ctx.stroke()
      ctx.restore()
  }

  render() {
    return(
      <div className='Ship'>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { ship: { ...state } }
}

export default connect(mapStateToProps)(Ship)
