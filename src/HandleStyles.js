
const styles = {
  handle: {
    position: 'absolute',
    width: 6,
    height: 6,
    backgroundColor: 'white',
    border: '1px solid #74c6f0',
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
    right: 'calc(50% - 4px)',
    top: '-4px',
    cursor: 'ns-resize',
  },
  right: {
    right: '-4px',
    bottom: 'calc(50% - 4px)',
    cursor: 'ew-resize',
  },
  bottom: {
    right: 'calc(50% - 4px)',
    bottom: '-4px',
    cursor: 'ns-resize',
  },
  left: {
    left: '-4px',
    bottom: 'calc(50% - 4px)',
    cursor: 'ew-resize',
  },
}

export default styles