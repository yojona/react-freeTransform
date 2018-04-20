import React, { Component } from 'react'

export default class Transform extends Component {

  constructor (props) {
    super(props)
    this.state = { x: 0, y: 0, width: 0, height: 0, angle: 0, originX: 0, originY: 0 }
    this.onMouseMove = this.onMouseMove.bind(this)
    this.onMouseDown = this.onMouseDown.bind(this)
    this.onMouseUp = this.onMouseUp.bind(this)
    this.onMouseLeave = this.onMouseLeave.bind(this)
    this.getComponent = this.getComponent.bind(this)
    this.enabled = false
    this.offsetX = 0
    this.offsetY = 0
  }

  componentDidMount () {
    this.setOrigin(0, 0)
    this.setPosition(0, 0)
    this.setAngle(0)
    this.setSize(this.props.width, this.props.height)
  }

  getComponent() {
    return this.refs.component
  }

  setOrigin (x, y) {
    let nstate = this.state

    nstate.originX = x
    nstate.originY = y

    this.setState(nstate)
  }

  setPosition (x, y) {
    let nstate = this.state

    nstate.x = x 
    nstate.y = y

    this.setState(nstate)

    this.refs.wrapper.style.left = `${x - this.state.originX}px`
    this.refs.wrapper.style.top = `${y - this.state.originY}px`
  }

  setSize (width, height) {
    let nstate = this.state
    nstate.width = width
    nstate.height = height
    this.setState(nstate)
    this.getComponent().style.width = `${width}px`
    this.getComponent().style.height = `${height}px`
  }

  setAngle (angle) {
    let nstate = this.state
    nstate.angle = angle
    nstate.angle = angle
    this.setState(nstate)
    this.getComponent().style.transform = `rotate(${angle}deg)`
    this.getComponent().style.transformOrigin = `${this.state.originX}px ${this.state.originY}px`
  }

  onMouseDown (e) {
    this.enabled = true

    e.preventDefault();
    e.stopPropagation();

    this.rect = this.refs.wrapper.getBoundingClientRect();

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
    console.log(this.state)

    e.preventDefault();
    e.stopPropagation();

    if(this.enabled) {
      let x = (e.clientX - this.refs.wrapper.offsetParent.offsetLeft) - (this.offsetX - this.state.originX)
      let y = (e.clientY - this.refs.wrapper.offsetParent.offsetTop) - (this.offsetY - this.state.originY)
      this.setPosition(x, y)
    }
  }

  render () {
    return (
      <div ref="wrapper" style={styles.component} onMouseLeave = {this.onMouseLeave} onMouseUp = {this.onMouseUp} onMouseDown = {this.onMouseDown} onMouseMove = {this.onMouseMove} >
        <div ref="component" style={styles.component} onMouseLeave = {this.onMouseLeave} onMouseUp = {this.onMouseUp} onMouseDown = {this.onMouseDown} onMouseMove = {this.onMouseMove} >
          {this.props.children}
        </div>      
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