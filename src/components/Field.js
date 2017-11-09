import React from 'react'
import Ship from './Ship'

class Field extends React.Component {
  state = {
    ship: {},
    asteroids: []
  }

  render() {
    return(
      <canvas className='Field'>
      </canvas>
    )
  }
}

export default Field
