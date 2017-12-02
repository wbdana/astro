import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { newShot } from '../actions/shotActions'

class Shot extends React.Component {
    componentDidMount(){
        window.addEventListener('keydown', (event) => {
            if (event.key === " ") {
                console.log("Space")
                this.takeShot()
            }
        })
    }

    takeShot = () => {
        this.props.newShot({
            pos: {
                x: this.props.ship.pos.x,
                y: this.props.ship.pos.y,
                d: this.props.ship.pos.d
            },
            vel: {
                x: 40,
                y: 40
            }
        })
    }

    render() {
        return(
            <div className="Shot" />
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        newShot: newShot
    }, dispatch)
}

const mapStateToProps = (state) => {
    return {
        ship: {
            ...state.ship
        },
        shots: [...state.shots]
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Shot)