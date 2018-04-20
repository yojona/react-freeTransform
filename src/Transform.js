import React, { Component } from 'react'

export default class Transform extends Component {

  constructor (props) {
    super(props)
    this.state = { x: 0, y: 0, width: 0, height: 0, angle: 0 }
    this.onMouseMove = this.onMouseMove.bind(this)
    this.onMouseDown = this.onMouseDown.bind(this)
    this.onMouseUp = this.onMouseUp.bind(this)
    this.onMouseLeave = this.onMouseLeave.bind(this)
    this.getComponent = this.getComponent.bind(this)
    this.enabled = false
    this.offsetX = 0
    this.offsetY = 0
  }

  getComponent() {
    return this.refs.component
  }

  componentDidMount () {
    this.setSize(50, 50)
    this.setPosition(10, 10)
  }

  setSize (width, height) {
   this.getComponent().style.width = `${width}px`
   this.getComponent().style.height = `${height}px`
  }

  setPosition (x, y) {
    let nstate = this.state

    nstate.x = x
    nstate.y = y

    this.setState(nstate)

    this.getComponent().style.left = `${x}px`
    this.getComponent().style.top = `${y}px`
  }

  componentDidMount () {
    this.setSize(this.props.width, this.props.height)
  }

  onMouseDown (e) {
    this.enabled = true


    e.preventDefault();
    e.stopPropagation();

    this.rect = this.getComponent().getBoundingClientRect();

    this.offsetX = e.clientX - this.rect.left
    this.offsetY = e.clientY - this.rect.top


  }

  onMouseUp () {
    this.enabled = false
  }

  onMouseLeave () {
    this.enabled = false
  }

  onMouseMove (e) {

    e.preventDefault();
    e.stopPropagation();

    if(this.enabled) {
      let x = (e.clientX - this.getComponent().offsetParent.offsetLeft) - this.offsetX
      let y = (e.clientY - this.getComponent().offsetParent.offsetTop) - this.offsetY
      this.setPosition(x, y)
    }
  }

  render () {
    return (
      <div ref="component" style={styles.component} onMouseLeave = {this.onMouseLeave} onMouseUp = {this.onMouseUp} onMouseDown = {this.onMouseDown} onMouseMove = {this.onMouseMove} >
        {this.props.children}
      </div>
    )
  }
}

let styles = {
  component: {
    position: 'absolute',
    userSelect: 'none',
    backgroundColor: 'green'
  }
}