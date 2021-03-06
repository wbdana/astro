import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { newShot, updateShotLocation } from '../actions/shotActions'

class ShotContainer extends React.Component {
    componentDidMount(){
        this.takeShot = this.takeShot.bind(this)
        this.updateShots = this.updateShots.bind(this)
        window.addEventListener('keydown', (event) => {
            if (event.key === " ") {
                this.takeShot()
                setTimeout(()=>{this.takeShot()}, 100)
            }
        })
        this._interval = setInterval(()=>{
            this.updateShots()
        }, 20)
    }

    async takeShot() {
        let newShot = {
            pos: {
                x: this.props.ship.pos.x,
                y: this.props.ship.pos.y,
                d: this.props.ship.pos.d
            },
            vel: {
                x: (20 * (Math.sin(this.props.ship.pos.d*Math.PI/180))),
                y: (20 * (Math.cos(this.props.ship.pos.d*Math.PI/180)))
            }
        }
        let shotFired = await this.props.newShot(newShot)
    }

    async updateShots() {
        let i
        let shots = await this.props.shots
        for (i = 0; i < this.props.shots.length; i++) {
            this.updateShotLocation(i)
        }
    }

    updateShotLocation = (id) => {
        this.props.updateShotLocation(id)
    }

    render() {
        return(
            <div className="Shot" />
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        newShot: newShot,
        updateShotLocation: updateShotLocation
    }, dispatch)
}

const mapStateToProps = (state) => {
    // console.log("In mapStateToProps", state)
    return {
        ship: {
            ...state.ship
        },
        shots: [...state.shotContainer.shots]
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShotContainer)