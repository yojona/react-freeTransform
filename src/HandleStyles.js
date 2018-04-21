
const styles = {
  handle: {
    position: 'absolute',
    width: 6,
    height: 6,
    backgroundColor: '#2196F3',
    border: '1px solid white',
    borderRadius: '50%',
    display: 'none',
  },
  topLeft: {
    left: '-4px',
    top: '-4px',
    cursor: 'nwse-resize',
  },
  topRight: {
    right: '-4px',
    top: '-4px',
    cursor: 'nesw-resize',
  },
  bottomLeft: {
    left: '-4px',
    bottom: '-4px',
    cursor: 'nesw-resize',
  },
  bottomRight: {
    right: '-4px',
    bottom: '-4px',
    cursor: 'nwse-resize',
  },  
  top: {
    right: 'calc(50% - 5px)',
    top: '-5px',
    cursor: 'ns-resize',
  },
  right: {
    right: '-5px',
    bottom: 'calc(50% - 4px)',
    cursor: 'ew-resize',
  },
  bottom: {
    right: 'calc(50% - 5px)',
    bottom: '-5px',
    cursor: 'ns-resize',
  },
  left: {
    left: '-5px',
    bottom: 'calc(50% - 5px)',
    cursor: 'ew-resize',
  },
}

export default styles