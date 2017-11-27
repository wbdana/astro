import React from 'react'
import Asteroid from './Asteroid'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

class AsteroidContainer extends React.Component {
  componentDidMount() {
    console.log(this.props)
    // this.checkIfNeedAsteroids()
    // this.createAsteroids(1,2)
  }

  checkIfNeedAsteroids = () => {
    // Set interval at which to check if Field needs more asteroids
    // Current interval: 60 seconds (60,000ms)
    setInterval(()=>{
      if (this.state.asteroids.length < 3) {
        let number = Math.random(1, 4)
        this.createAsteroids(number, 2)
      }
    }, 60000)

  }

  createAsteroids = (number, size) => {
    return(
      <Asteroid
        size={size}
      />
    )
  }

  render() {
    return(
      <div className='AsteroidContainer' />
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({

  })
}

const mapStateToProps = (state) => {
  return {
    asteroids: [state.asteroid]
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(AsteroidContainer)
