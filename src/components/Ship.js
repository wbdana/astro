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
    // console.log("DidMount")

    // Redraw ship every 20ms, applying velocity to position each time
    //(TODO: Check that this actually works)
    setInterval(() => {
      this.setState({
        pos: {
          ...this.state.pos,
          x: this.state.pos.x + this.state.vel.x,
          y: this.state.pos.y + this.state.vel.y,
        },
        vel: {
          ...this.state.vel
        }
      })
      this.drawShip()
    }, 5)

    // Add keydown event listener to facilitate control
    window.addEventListener('keydown', (event) => {

      let keypress = event.key

      // If keypress is a (left), rotate ship counterclockwise
      if (keypress === 'a') {
        this.setState({
          pos: {
            ...this.state.pos,
            d: this.state.pos.d - 7
          },
          vel: {
            ...this.state.vel
          }
        }, ()=>{console.log(this.state)})
      }

      // If keypress is d (right), rotate ship clockwise
      if (keypress === 'd') {
        this.setState({
          pos: {
            ...this.state.pos,
            d: this.state.pos.d + 7
          },
          vel: {
            ...this.state.vel
          }
        }, ()=>{console.log(this.state)})
      }
      // If keypress is w (forward), calculate x- and y-components of current
      // vector and add them to velocity
      // The current value of pixels (force) to be added per keypress is 1
      // (see multiplier below)
      if (keypress === 'w') {
        console.log("Current this.state.pos.d: ", this.state.pos.d)
        // this.updateOrLimitVelocity()
        this.setState({
          pos: {
            ...this.state.pos
          },
          vel: {
            x: this.state.vel.x + (0.5*(Math.sin(this.state.pos.d*Math.PI/180))),
            y: this.state.vel.y - (0.5*(Math.cos(this.state.pos.d*Math.PI/180)))
          }
        }, ()=>{console.log(this.state.vel.x);console.log(this.state.vel.y)})
      }
    })
  }

  updateOrLimitVelocity = () => {
    console.log("updateOrLimitVelocity()")
    let newVelX = this.state.vel.x + (0.5*(Math.sin(this.state.pos.d*Math.PI/180)))
    let newVelY = this.state.vel.y - (0.5*(Math.sin(this.state.pos.d*Math.PI/180)))
    if (newVelX >= 2 && this.state.vel.x > 0) {
      this.setState({
        pos: {
          ...this.state.pos
        },
        vel: {
          ...this.state.vel,
          x: 2
        }
      })
    } else if (newVelX <= -2 && this.state.vel.x < 0) {
      this.setState({
        pos: {
          ...this.state.pos
        },
        vel: {
          ...this.state.vel,
          x: -2
        }
      })
    } else {
      this.setState({
        pos: {
          ...this.state.pos
        },
        vel: {
          ...this.state.vel,
          x: newVelX
        }
      })
    }
    if (newVelY >= 2 && this.state.vel.y > 0) {
      this.setState({
        pos: {
          ...this.state.pos
        },
        vel: {
          ...this.state.vel,
          y: 2
        }
      })
    } else if (newVelY <= -2 && this.state.vel.y < 0){
      this.setState({
        pos: {
          ...this.state.pos
        },
        vel: {
          ...this.state.vel,
          y: -2
        }
      })
    } else {
      this.setState({
        pos: {
          ...this.statepos
        },
        vel: {
          ...this.state.vel,
          y: newVelY
        }
      })
    }
    console.log(this.state.vel.x)
    console.log(this.state.vel.y)
  }

  drawShip = () => {
      // console.log("drawShip()")
      let c = document.getElementById('AstroField')
      let ctx = c.getContext('2d')
      let angle = this.state.pos.d
      ctx.clearRect(0,0,c.width,c.height)
      ctx.save()
      ctx.strokeStyle = '#FFFFFF'
      ctx.fillStyle = '#000000'
      ctx.lineWidth = 2;
      ctx.translate((this.state.pos.x + this.state.vel.x), (this.state.pos.y + this.state.vel.y))
      // console.log("Rotating... I hope")
      // console.log(angle)
      // console.log(this.state.pos.d)
      ctx.rotate(angle*Math.PI/180)
      // console.log("Rotated")
      ctx.beginPath()
      // ctx.move()
      ctx.moveTo(0,-7)
      ctx.lineTo(-5,15)
      ctx.lineTo(-4,12)
      ctx.lineTo(4,12)
      ctx.lineTo(5,15)
      // ctx.moveTo(this.state.pos.x, this.state.pos.y)
      // ctx.lineTo(this.state.pos.x - 5, this.state.pos.y + 17)
      // ctx.lineTo(this.state.pos.x - 4, this.state.pos.y + 14)
      // ctx.lineTo(this.state.pos.x + 4, this.state.pos.y + 14)
      // ctx.lineTo(this.state.pos.x + 5, this.state.pos.y + 17)
      ctx.closePath()
      ctx.fill()
      ctx.stroke()
      ctx.restore()
  }

  componentDidUpdate() {
    // console.log("DidUpdate")
    this.drawShip()
  }

  render() {
    // console.log("RENDERING")
    return(
      <div className='Ship'>

      </div>
    )
  }
}

export default Ship
