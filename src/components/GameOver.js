import React from 'react'
import { bindActionCreators } from 'redux'
import { resetShip } from '../actions/shipActions'
import { resetAsteroids } from '../actions/asteroidActions'
import { resetShots } from '../actions/shotActions'
import { restartGame } from '../actions/astroActions'
import { connect } from 'react-redux'

class GameOver extends React.Component {
    componentDidMount() {
        console.log(this.props.restartGame)
    }

    // I've really got to figure this one out
    restartGame = () => {
        // return Promise.all(
        //     [this.props.resetShip(),
        //     this.props.resetAsteroids(),
        //     this.props.resetShots()]
        // )
        this.props.restartGame()
        console.log(this.props)
        // window.location.reload()
    }
    
    render() {
        return(
            <div id='GameOver'>
                Dang that came out of nowhere! Your score was {this.props.score}.<br/><br/>
                <button onClick={this.restartGame}>
                    Reset
                </button>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        resetShip: resetShip,
        resetAsteroids: resetAsteroids,
        resetShots: resetShots,
        restartGame: restartGame
    }, dispatch)
}

const mapStateToProps = (state) => {
    return {
        score: state.shotContainer.score,
        game: state.ship.game
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameOver)