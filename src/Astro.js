import React from 'react'
import './Astro.css'

import Field from './components/Field'

import { connect } from 'react-redux'

class Astro extends React.Component {
  render() {
    return (
      <div className="Astro">
        <span id='Score'>
          Score: {this.props.shotContainer.score}
        </span>
        <Field store={this.props.store} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { ...state }
}

export default connect(mapStateToProps)(Astro);
