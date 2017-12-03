import React from 'react'
import './Astro.css'

import Field from './components/Field'
import GameOver from './components/GameOver'

import { connect } from 'react-redux'

class Astro extends React.Component {
  render() {
    return (
      <div className="Astro">
        <span id='Score'>
          Score: {this.props.shotContainer.score}
        </span>
        <span id='Title'>
          Asteroids Online
        </span>
        <span id='Source'>
          <a href='https://github.com/wbdana/astro' target='_blank' rel="noopener noreferrer">Source</a>
        </span>
        <Field store={this.props.store} />
        {this.props.ship.game === false && <GameOver />}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { ...state }
}

export default connect(mapStateToProps)(Astro);
