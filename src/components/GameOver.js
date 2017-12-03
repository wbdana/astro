import React from 'react'
import { bindActionCreators } from 'redux'
import { reset } from '../actions/astroActions'
import { connect } from 'react-redux'

class GameOver extends React.Component {
    componentDidMount() {
        console.log(this.props.restartGame)
    }

    restartGame = () => {
        this.props.restartGame()
    }
    
    render() {
        return(
            <div id='GameOver'>
                You lost. Your score was {this.props.score}.
                <button onClick={this.restartGame} />
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