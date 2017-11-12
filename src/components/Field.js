import React from 'react'
import Ship from './Ship'

class Field extends React.Component {
  state = {
    ship: {
      pos: {
        x: 500,
        y: 500,
        d: 0
      },
      vel: {
        x: 0,
        y: 0
      }
    },
    asteroids: []
  }

  componentDidMount() {
    // console.log(this.context)
    // setTimeout(
    //   this.setState({
    //     ship: {
    //       pos: {
    //         x: 900,
    //         y: 567,
    //         d: 90
    //       },
    //       vel: {
    //         x: 20,
    //         y: 20
    //       }
    //     }
    //   }),
    // 3500)
    window.addEventListener('keydown', (event) => {
      console.log(event.key)
      if (event.key === 'a') {
        this.setState({
          ship: {
            pos: {
              d: 270
            },
            ...this.state.ship
          }
        }, ()=>{console.log(this.state.ship)})
      }
    })
  }

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
