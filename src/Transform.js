import React, { Component } from 'react'
import Handle from './Handle'

export default class Transform extends Component {

  constructor (props) {
    super(props)
    this.state = { x: 0, y: 0, width: 0, height: 0, angle: 0, originX: 0, originY: 0, selected: false }
    this.getComponent = this.getComponent.bind(this)
    this.onMouseDown = this.onMouseDown.bind(this)
    this.onContextMenu = this.onContextMenu.bind(this)
    this.select = this.select.bind(this)
    this.unSelect = this.unSelect.bind(this)
    this.onHandleDown = this.onHandleDown.bind(this)
    this.dragEnabled = false
    this.offsetX = 0
    this.offsetY = 0
    this.resizing = false
    this.lastX = 0
    this.lastY = 0
    this.onTopEdge = false
    this.onLeftEdge = false
    this.onRightEdge = false
    this.onBottomEdge = false
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
    this.lastX = e.pageX || e.clientX + document.documentElement.scrollLeft
    this.lastY = e.pageY || e.clientY + document.documentElement.scrollTop
    
    this.dragEnabled = true
    let bounds = this.refs.wrapper.getBoundingClientRect();

    this.offsetX = e.clientX - bounds.left
    this.offsetY = e.clientY - bounds.top
    let b = this.getComponent().getBoundingClientRect();
    let x = e.clientX - b.left;
    let y = e.clientY - b.top;
    let MARGINS = 8
    this.onTopEdge = y < MARGINS;
    this.onLeftEdge = x < MARGINS;
    this.onRightEdge = x >= b.width - MARGINS;
    this.onBottomEdge = y >= b.height - MARGINS;
  }

  onMouseUp () {
    this.dragEnabled = false
    this.resizing = false
    this.onTopEdge = false
    this.onLeftEdge = false
    this.onRightEdge = false
    this.onBottomEdge = false
  }

  onMouseMove (e) {
    //Drag
    if(this.dragEnabled && !this.resizing) {
      let nx = (e.pageX - this.refs.wrapper.offsetParent.offsetLeft) - (this.offsetX - this.state.originX)
      let ny = (e.pageY - this.refs.wrapper.offsetParent.offsetTop) - (this.offsetY - this.state.originY)
      this.setPosition(nx, ny)

      // Drag callback
      if(this.props.dragging) {
        const {x, y} = this.state
        this.props.dragging(x, y)       
      }
    }

    //Resize
    if (this.resizing) {
      let b = this.getComponent().getBoundingClientRect();
      let x = e.clientX - b.left;
      let y = e.clientY - b.top;
      let MARGINS = 8

      let minWidth = 10
      let minHeight = 10

      if (this.onRightEdge) this.setSize(x, this.state.height)
      if (this.onBottomEdge) this.setSize(this.state.width, y)
      
      if (this.onLeftEdge){
        let dx = e.pageX - this.refs.wrapper.offsetParent.offsetLeft - this.state.x
        this.setSize(parseInt(this.state.width) - dx, this.state.height)
        this.setPosition(e.pageX - this.refs.wrapper.offsetParent.offsetLeft, this.state.y)
      }
      if (this.onTopEdge) {
        let dy = e.pageY - this.refs.wrapper.offsetParent.offsetTop - this.state.y
        this.setSize(this.state.width, parseInt(this.state.height) - dy)
        this.setPosition(this.state.x, e.pageY - this.refs.wrapper.offsetParent.offsetTop)
      }
      console.log('resizing')
    }
  }

  onContextMenu (e) {
    e.preventDefault();
    this.dragEnabled = false
  }

  select () {
    this.setState({selected: true})
    this.getComponent().style.outline = 'dashed 2px #98d4f4'

    Array.from(this.getComponent().childNodes).forEach(child => {
      if (child.className === 'handle') {
        child.style.display = 'block'
      }
    })

  }

  unSelect () {
    this.setState({selected: false})
    this.getComponent().style.outline = 0

    Array.from(this.getComponent().childNodes).forEach(child => {
      if (child.className === 'handle') {
        child.style.display = 'none'
      }
    })
  }

  onHandleDown () {
    this.resizing = true
  }

  render () {
    return (
      <div ref="wrapper" style={styles.wrapper} onMouseDown = {this.onMouseDown} onContextMenu = {this.onContextMenu} >
        <div ref="component" style={styles.component} tabIndex="1" onFocus = {this.select} onBlur = {this.unSelect} >
          <Handle onHandleDown = {this.onHandleDown} position="left" />
          <Handle onHandleDown = {this.onHandleDown} position="top" />
          <Handle onHandleDown = {this.onHandleDown} position="right" />
          <Handle onHandleDown = {this.onHandleDown} position="bottom" />
          <Handle onHandleDown = {this.onHandleDown} position="left" />
          <Handle onHandleDown = {this.onHandleDown} position="topLeft" />
          <Handle onHandleDown = {this.onHandleDown} position="topRight" />
          <Handle onHandleDown = {this.onHandleDown} position="bottomLeft" />
          <Handle onHandleDown = {this.onHandleDown} position="bottomRight" />
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
  },
}