import React from 'react'
import { bindActionCreators } from 'redux'
import { reset } from '../actions/astroActions'
import { connect } from 'react-redux'

class GameOver extends React.Component {
    componentDidMount() {
        console.log(this.props.restartGame)
    }

    // I've really got to figure this one out
    restartGame = () => {
        // this.props.restartGame()
        window.location.reload()
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
        restartGame: reset
    }, dispatch)
}

const mapStateToProps = (state) => {
    return {
        score: state.shotContainer.score,
        game: state.ship.game
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameOver)