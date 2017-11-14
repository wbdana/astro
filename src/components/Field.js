import React from 'react'
import Ship from './Ship'

class Field extends React.Component {
  state = {
    ship: {
      pos: {
        x: 950,
        y: 550,
        d: 0
      },
      vel: {
        x: 0,
        y: 0
      }
    },
    asteroids: []
  }

  // componentDidMount() {
  //   window.addEventListener('keydown', (event) => {
  //
  //     let keypress = event.key
  //
  //     const keybindings = {
  //       'w': 0,
  //       'd': 90,
  //       's': 180,
  //       'a': 270
  //     }
  //
  //     // if keypress is a (left), rotate ship counterclockwise
  //     if (keypress === 'a') {
  //       this.setState({
  //         ship: {
  //           pos: {
  //             ...this.state.ship.pos,
  //             d: this.state.ship.pos.d - 1,
  //           },
  //           vel: {
  //             ...this.state.ship.vel
  //           }
  //         }
  //       }, ()=>{console.log(this.state.ship)})
  //     }
  //     // if keypress is d (right), rotate ship clockwise
  //     if (keypress === 'd') {
  //       this.setState({
  //         ship: {
  //           pos: {
  //             ...this.state.ship.pos,
  //             d: this.state.ship.pos.d + 1,
  //           },
  //           vel: {
  //             ...this.state.ship.vel
  //           }
  //         }
  //       }, ()=>{console.log(this.state.ship)})
  //     }
  //   })
  // }

  render() {
    return(
      <canvas
        id='AstroField'
        width='1905px'
        height='961px'
      >
        <Ship
          pos={this.state.ship.pos}
          vel={this.state.ship.vel}
        />
      </canvas>
    )
  }
}

export default Field
