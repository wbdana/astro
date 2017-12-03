import React from 'react'
import { bindActionCreators } from 'redux'
import astroReducer from '../reducers/astroReducer'
import { connect } from 'react-redux'

class GameOver extends React.Component {
    componentDidMount() {
        console.log(this.props)
    }
    
    render() {
        return(
            <div id='GameOver'>
                You lost. Your score was {this.props.score}.

            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        restartGame: astroReducer
    })
}

const mapStateToProps = (state) => {
    return {
        score: state.shotContainer.score,
        game: state.ship.game
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameOver)