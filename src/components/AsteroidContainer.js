import React from 'react'
import Asteroid from './Asteroid'

class AsteroidContainer extends React.Component {
  state = {
    asteroids: this.props.asteroids
  }

  componentDidMount() {
    this.checkIfNeedAsteroids()
    this.createAsteroids(1,2)
  }

  checkIfNeedAsteroids = () => {
    // Set interval at which to check if Field needs more asteroids
    // Current interval: 60 seconds (60,000ms)
    setInterval(()=>{
      if (this.state.asteroids.length < 3) {
        let number = Math.random(1, 4)
        this.createAsteroids(number, 2)
      }
    }, 100)

  }

  createAsteroids = (number, size) => {
    return(
      <Asteroid
        updateAsteroidContainer={this.updateAsteroidContainer}
        size={size}
      />
    )
  }

  updateAsteroidContainer = (asteroidState) => {
    this.setState({
      ...this.state,

    })
  }

  render() {
    return(
      <div className='AsteroidContainer' />
    )
  }
}

export default AsteroidContainer
