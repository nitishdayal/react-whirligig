import React, { Component, PropTypes } from 'react';

class Carousel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      idx: 0 || props.idx,
      components: props.children
    };
  }

  componentWillReceiveProps(nextProps) {
    let { idx } = nextProps;

    if (idx < 0) {
      idx = nextProps.children.length + idx;
    } else {
      idx = formatIdx(idx, nextProps.children.length);
    }

    this.setState((prev) => {
      return { idx: prev.idx !== idx ? idx : prev.idx };
    });
  }

  render() {
    const { idx, components } = this.state;
    const { style, handleLeft, handleRight } = this.props;
    const DisplayElem = components[idx];

    return (
      <div style={style}>
        <button onClick={handleLeft}>{'<'}</button>
        <span style={{ alignSelf: 'center' }}>
          {DisplayElem}
          <p>Current IDX: {idx}</p>
        </span>
        <button onClick={handleRight}>{'>'}</button>
      </div>
    );
  }
}

const formatIdx = (idx, arrLen) => Math.abs(idx % arrLen);

Carousel.propTypes = {
  children: PropTypes.node,
  handleLeft: PropTypes.func,
  handleRight: PropTypes.func,
  idx: PropTypes.number,
  style: PropTypes.object
};

export default Carousel;
