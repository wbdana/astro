import React from 'react'

class Ship extends React.Component {
  state = {
    pos: {
      x: this.props.pos.x,
      y: this.props.pos.y,
      d: this.props.pos.d
    },
    vel: {
      x: this.props.vel.x,
      y: this.props.vel.y
    }
  }

  componentDidMount() {
    // Redraw ship every 20ms, applying velocity to position each time
    this.updateAndConfineShipToField()

    // Add keydown event listener to facilitate control of Ship
    window.addEventListener('keydown', (event) => {
      let keypress = event.key
      // If keypress is 'a' (left), rotate ship counterclockwise
      if (keypress === 'a') {
        this.setState({
          ...this.state,
          pos: {
            ...this.state.pos,
            d: this.state.pos.d - 5
          }
        }, ()=>{console.log(this.state)})
      }
      // If keypress is 'd' (right), rotate ship clockwise
      if (keypress === 'd') {
        this.setState({
          ...this.state,
          pos: {
            ...this.state.pos,
            d: this.state.pos.d + 5
          }
        }, ()=>{console.log(this.state)})
      }
      // If keypress is 'w' (forward), calculate x- and y-components of current
      // vector and add them to velocity
      // The current value of pixels (force) to be added per keypress is 1
      // (see multiplier below)
      if (keypress === 'w') {
        // this.updateOrLimitVelocity()
        this.setState({
          ...this.state,
          vel: {
            x: this.state.vel.x + (0.25*(Math.sin(this.state.pos.d*Math.PI/180))),
            y: this.state.vel.y - (0.25*(Math.cos(this.state.pos.d*Math.PI/180)))
          }
        }, ()=>{console.log(this.state.vel.x);console.log(this.state.vel.y)})
      }
    })
  }

  // Intended to increase the velocity in the current direction when 'w' is
  // pressed, provided that the Ship is not going too fast. Does not
  // work as intended.
  updateOrLimitVelocity = () => {
    console.log("updateOrLimitVelocity()")
    let newVelX = this.state.vel.x + (0.5*(Math.sin(this.state.pos.d*Math.PI/180)))
    let newVelY = this.state.vel.y - (0.5*(Math.sin(this.state.pos.d*Math.PI/180)))
    if (newVelX >= 2 && this.state.vel.x > 0) {
      this.setState({
        ...this.state,
        vel: {
          ...this.state.vel,
          x: 2
        }
      })
    } else if (newVelX <= -2 && this.state.vel.x < 0) {
      this.setState({
        ...this.state,
        vel: {
          ...this.state.vel,
          x: -2
        }
      })
    } else {
      this.setState({
        ...this.state,
        vel: {
          ...this.state.vel,
          x: newVelX
        }
      })
    }
    if (newVelY >= 2 && this.state.vel.y > 0) {
      this.setState({
        ...this.state,
        vel: {
          ...this.state.vel,
          y: 2
        }
      })
    } else if (newVelY <= -2 && this.state.vel.y < 0){
      this.setState({
        ...this.state,
        vel: {
          ...this.state.vel,
          y: -2
        }
      })
    } else {
      this.setState({
        ...this.state,
        vel: {
          ...this.state.vel,
          y: newVelY
        }
      })
    }
    console.log(this.state.vel.x)
    console.log(this.state.vel.y)
  }

  updateAndConfineShipToField = () => {
    setInterval(() => {
      // If Ship goes off screen bottom right corner, come out top left corner
      if (((this.state.pos.x + this.state.vel.x) >= 1898) && ((this.state.pos.y + this.state.vel.y) >= 954)) {
        this.setState({
          ...this.state,
          pos: {
            ...this.state.pos,
            x: 0,
            y: 0,
          }
        }, ()=>{this.props.updateField(this.state)})
      // If Ship goes off screen right, come out on left side
      } else if ((this.state.pos.x + this.state.vel.x) >= 1898) {
        this.setState({
          ...this.state,
          pos: {
            ...this.state.pos,
            x: 0,
            y: this.state.pos.y + this.state.vel.y
          }
        }, ()=>{this.props.updateField(this.state)})
      // If Ship goes off screen left, come out on right side
      } else if ((this.state.pos.x + this.state.vel.x) <= 0) {
        this.setState({
          ...this.state,
          pos: {
            ...this.state.pos,
            x: 1898,
            y: this.state.pos.y + this.state.vel.y
          }
        }, ()=>{this.props.updateField(this.state)})
      // If Ship goes off screen bottom, come out on top side
      } else if ((this.state.pos.y + this.state.vel.y) >= 954) {
        this.setState({
          ...this.state,
          pos: {
            ...this.state.pos,
            x: this.state.pos.x + this.state.vel.x,
            y: 0,
          }
        }, ()=>{this.props.updateField(this.state)})
      // If Ship goes off screen top, come out on bottom side
      } else if ((this.state.pos.y + this.state.vel.y) <= 0) {
        this.setState({
          ...this.state,
          pos: {
            ...this.state.pos,
            x: this.state.pos.x + this.state.vel.x,
            y: 954
          }
        }, ()=>{this.props.updateField(this.state)})
      // If Ship goes off screen bottom left corner, come out on top right side
      } else if (((this.state.pos.x + this.state.vel.x) <= 0) && ((this.state.pos.y + this.state.vel.y) >= 954)) {
        this.setState({
          ...this.state,
          pos: {
            ...this.state.pos,
            x: 1898,
            y: 0
          }
        }, ()=>{this.props.updateField(this.state)})
      // If Ship goes off screen top right corner, come out on bottom left corner
      } else if (((this.state.pos.x + this.state.vel.x) >= 1898) && ((this.state.pos.y + this.state.vel.y) <= 0)) {
        this.setState({
          ...this.state,
          pos: {
            ...this.state.pos,
            x: 0,
            y: 954
          }
        }, ()=>{this.props.updateField(this.state)})
      // If Ship goes off screen top left corner, come out on bottom right corner
      } else if (((this.state.pos.x + this.state.vel.x) <= 0) && ((this.state.pos.y + this.state.vel.y) <= 0)) {
        this.setState({
          ...this.state,
          pos: {
            ...this.state.pos,
            x: 1898,
            y: 954
          }
        }, ()=>{this.props.updateField(this.state)})
      } else {
        this.setState({
          ...this.state,
          pos: {
            ...this.state.pos,
            x: this.state.pos.x + this.state.vel.x,
            y: this.state.pos.y + this.state.vel.y,
          }
        }, ()=>{this.props.updateField(this.state)})
      }
      this.drawShip()
    }, 5)
  }

  drawShip = () => {
      let c = document.getElementById('AstroField')
      let ctx = c.getContext('2d')
      let angle = this.state.pos.d
      ctx.clearRect(0,0,c.width,c.height)
      ctx.save()
      ctx.strokeStyle = '#FFFFFF'
      ctx.fillStyle = '#000000'
      ctx.lineWidth = 2;
      ctx.translate((this.state.pos.x + this.state.vel.x), (this.state.pos.y + this.state.vel.y))
      ctx.rotate(angle*Math.PI/180)
      ctx.beginPath()
      ctx.moveTo(0,-9)
      ctx.lineTo(-7,17)
      ctx.lineTo(-4,12)
      ctx.lineTo(4,12)
      ctx.lineTo(7,17)
      ctx.closePath()
      ctx.fill()
      ctx.stroke()
      ctx.restore()
  }

  // componentDidUpdate() {
  //   console.log("DidUpdate")
  //   this.drawShip()
  // }

  render() {
    // console.log("RENDERING")
    return(
      <div className='Ship'>
        <span className='VectorVelocity'>x: {this.state.vel.x}</span>
        <span className='VectorVelocity'>y: {this.state.vel.y}</span>
      </div>
    )
  }
}

export default Ship
