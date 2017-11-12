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
    // console.log(this.props)
    // console.log(this.state.context)
    // console.log(this.state)
    // console.log(this.context)
    this.drawShip()
  }

  componentWillReceiveProps() {
    let ctx = document.getElementById('AstroField').getContext('2d')
    ctx.restore()
  }

  drawShip = () => {
      let c = document.getElementById('AstroField')
      console.log(c)
      let ctx = c.getContext('2d')
      console.log(ctx)
      ctx.strokeStyle = '#FFFFFF'
      ctx.fillStyle = '#000000'
      ctx.lineWidth = 2;
      // ctx.beginPath()
      ctx.moveTo(this.state.pos.x, this.state.pos.y)
      // draw left side
      ctx.lineTo(this.state.pos.x - 5, this.state.pos.y + 17)
      // reset point
      ctx.moveTo(this.state.pos.x, this.state.pos.y)
      // draw right side
      ctx.lineTo(this.state.pos.x + 5, this.state.pos.y + 17)
      // TODO: draw arc
      // ctx.closePath()
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

export default Ship
