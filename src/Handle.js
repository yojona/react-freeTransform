import React, { Component } from 'react'
import HandleStyles from './HandleStyles'

export default class Handle extends Component {

  onHandleDown () {
    return this.props.onHandleDown ? this.props.onHandleDown() : false
  }

  render () {
    return <div onMouseDown = {this.onHandleDown.bind(this)} className="handle" style={Object.assign({},styles.handle, eval(`styles.${this.props.position}`))}></div>
  }
}

const styles = HandleStyles