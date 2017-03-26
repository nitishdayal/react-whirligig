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
    idx = formatIdx(idx, nextProps.children.length);

    this.setState({ idx });
  }

  render() {
    const { idx, components } = this.state;
    const { style, handleLeft, handleRight } = this.props;

    const DisplayElem = components[idx];

    return (
      <div>
        <div style={style}>
          <button onClick={handleLeft}>{'<'}</button>
          <span style={{ alignSelf: 'center' }}>
            {DisplayElem}
          </span>
          <button onClick={handleRight}>{'>'}</button>
        </div>
        <p>Current IDX: {idx}</p>
      </div>
    );
  }

}

const formatIdx = (idx, arrLen) => (idx % arrLen + arrLen) % arrLen;

Carousel.propTypes = {
  children: PropTypes.any,
  handleLeft: PropTypes.func,
  handleRight: PropTypes.func,
  idx: PropTypes.number,
  style: PropTypes.object
};

export default Carousel;
