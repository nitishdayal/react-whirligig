import React, { Component, PropTypes } from 'react';


class CarouselNode {

  constructor(el, prev = null, next = null) {
    this.el = el;
    this.prev = prev;
    this.next = next;
  }

}

class Carousel extends Component {

  constructor(props) {
    super(props);

    const { children, idx } = props;
    const components =
      children.map((el, i, arr) => new CarouselNode(el, arr[i - 1], arr[i + 1]));

    this.state = {
      idx,
      components
    };
  }

  componentWillReceiveProps(nextProps) {
    const { children, idx } = nextProps;
    const { components } = this.state;

    const innerIdx = formatIdx(idx, Math.ceil((components.length + children.length) / 2));

    this.setState((prev) => ({ prev, idx: innerIdx }));
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
            {DisplayElem.el}
          </span>
          <button onClick={handleRight}>{'>'}</button>
        </div>
        <p>Current IDX: {idx}</p>
      </div>
    );
  }

}

const addComponent = (carousel, component) => {

  const newPony = new CarouselNode(component);
  console.log(newPony);
  carousel.setState(
    ({ components, ...rest }) => ({ components: [...components, newPony], idx: rest.idx })
  );
};

const formatIdx = (idx, arrLen) => (idx % arrLen + arrLen) % arrLen;

Carousel.propTypes = {
  children: PropTypes.any,
  handleLeft: PropTypes.func,
  handleRight: PropTypes.func,
  idx: PropTypes.number,
  style: PropTypes.object
};

export { Carousel, addComponent };
