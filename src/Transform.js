import React, { Component } from 'react'

export default class Transform extends Component {

  constructor (props) {
    super(props)
    this.state = { x: 0, y: 0, width: 0, height: 0, angle: 0, originX: 0, originY: 0, selected: false }
    this.getComponent = this.getComponent.bind(this)
    this.onMouseDown = this.onMouseDown.bind(this)
    this.select = this.select.bind(this)
    this.unSelect = this.unSelect.bind(this)
    this.dragEnabled = false
    this.offsetX = 0
    this.offsetY = 0
  }

  componentDidMount () {
    this.setOrigin(0, 0)
    this.setPosition(0, 0)
    this.setAngle(0)
    this.setSize(this.props.width, this.props.height)
    document.addEventListener('mousemove', this.onMouseMove.bind(this), true)
    document.addEventListener('mouseup', this.onMouseUp.bind(this), true)
  }

  getComponent() {
    return this.refs.component
  }

  setOrigin (originX, originY) {
    let nstate = this.state

    nstate.originX = originX
    nstate.originY = originY

    this.setState({originX, originY})
  }

  setPosition (x, y) {
    this.setState({x, y})
    this.refs.wrapper.style.left = `${x - this.state.originX}px`
    this.refs.wrapper.style.top = `${y - this.state.originY}px`
  }

  setSize (width, height) {
    this.setState({width, height})
    this.getComponent().style.width = `${width}px`
    this.getComponent().style.height = `${height}px`
  }

  setAngle (angle) {
    this.setState({angle})
    this.getComponent().style.transform = `rotate(${angle}deg)`
    this.getComponent().style.transformOrigin = `${this.state.originX}px ${this.state.originY}px`
  }

  onMouseDown (e) {
    this.dragEnabled = true
    let bounds = this.refs.wrapper.getBoundingClientRect();

    this.offsetX = e.clientX - bounds.left
    this.offsetY = e.clientY - bounds.top
  }

  onMouseUp () {
    this.dragEnabled = false
  }

  onMouseMove (e) {
    if(this.dragEnabled) {
      let nx = (e.pageX - this.refs.wrapper.offsetParent.offsetLeft) - (this.offsetX - this.state.originX)
      let ny = (e.pageY - this.refs.wrapper.offsetParent.offsetTop) - (this.offsetY - this.state.originY)
      this.setPosition(nx, ny)

      // return dragging
      if(this.props.dragging) {
        const {x, y} = this.state
        this.props.dragging(x, y)       
      }

    }
  }

  select () {
    console.log("select")
    this.getComponent().style.outline = "2px dashed #bbb"

  }

  unSelect () {
    console.log("unselect")
    this.getComponent().style.outline = "0"


  }

  render () {
    return (
      <div ref="wrapper" style={styles.wrapper} onMouseDown = {this.onMouseDown} >
        <div ref="component" style={styles.component} tabIndex="1" onFocus = {this.select} onBlur = {this.unSelect} >
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
    backgroundColor: 'red',
  },
  wrapper: {
    position: 'absolute',
    userSelect: 'none',
  }
}