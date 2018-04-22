import React, { Component } from 'react'

export default class Handle extends Component {

  render () {
    return <div style={Object.assign({}, styles.pivot, {left: this.props.left+'%' || 0, top: this.props.top+'%' || 0})}></div>
  }
}

const styles = {
  pivot: {
    position: 'absolute',
    width: 5,
    height: 5,
    outline: '1px solid green'
  }
}