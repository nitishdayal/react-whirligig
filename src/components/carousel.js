import React, { Component, PropTypes } from 'react';


/****************************************************************************

  One ESLint no-console warning is enough, don't you think?

****************************************************************************/

const trace = console.log; // eslint-disable-line

/**
 * Node element for Carousel component.
 */
class CarouselNode {

  /**
   * Creates an instance of CarouselNode.
   * @param {component} el
   * React component to be used as CarouselNode instance's value
   * @param {CarouselNode|null} [prev=null]
   * CarouselNode instance which comes before _this_ instance in the Carousel chain
   * @param {CarouselNode|null} [next=null]
   * CarouselNode instance which comes after _this_ instance in the Carousel chain
   *
   * @memberOf CarouselNode
   */
  constructor(el, prev = null, next = null) {
    this.el = el;
    this.prev = prev;
    this.next = next;
  }

}

class Carousel extends Component {

  constructor(props) {
    super(props);
    const { children } = props;

    this.state = {
      head: null,
      tail: null,
      curr: null,
      children
    };
  }

  componentWillMount() {
    const { head, tail, children } = this.state;

    const newState = this.addNode(children, head, tail),
      { head: curr } = newState;

    this.setState(
      prev => ({ ...prev, ...newState, curr }),
      () => { trace('set state done!'); }
    );
  }

  addNode = (els, h, t) => {
    const callOnEach = (el) => {
      const newNode = new CarouselNode(el);
      if (h) {
        [t.next, newNode.prev, t] = [newNode, t, newNode];
      } else {
        h = t = newNode;
        newNode.next = t;
        t.prev = newNode;
      }
    };

    els.forEach(el => { callOnEach(el); });

    return { head: h, tail: t };
  }

  handleLeft = () => {
    trace('handling left!', this.state);
    this.setState(({ tail, curr, ...rest }) => ({ ...rest, tail, curr: curr.prev || tail }));
  }

  handleRight = () => {
    trace('handling right!', this.state);
    this.setState(({ head, curr, ...rest }) => ({ ...rest, head, curr: curr.next || head }));
  }


  render() {
    const { curr: displayElem } = this.state;
    const { style } = this.props;

    return (
      <div>
        <div style={style}>
          <button onClick={this.handleLeft}>{'<'}</button>
          <span style={{ alignSelf: 'center' }}>
            {displayElem && displayElem.el}
          </span>
          <button onClick={this.handleRight}>{'>'}</button>
        </div>
      </div>
    );
  }

}

const addComponent = (carousel, component) => {
  const newPony = new CarouselNode(component);
  carousel.setState(({ cmp, rest }) => ({ ...rest, cmp: [...cmp, newPony] }));
};

Carousel.propTypes = {
  children: PropTypes.any,
  handleLeft: PropTypes.func,
  handleRight: PropTypes.func,
  idx: PropTypes.number,
  style: PropTypes.object
};

export { Carousel, addComponent };
