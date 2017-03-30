import React, { Component, PropTypes as T } from 'react';

/* eslint-disable no-console, max-statements, no-nested-ternary */
class CarouselNode {
  next;
  prev;
  el;

  constructor() {
    this.next = null;
    this.prev = null;
    this.el = null;
  }
}

/**
 * Carousel Container Component: Provide initial carousel components as
 * children, with the first component to be displayed provided as the first
 * child.
 *
 * @class Carousel
 * @extends {Component}
 *
 * @property {Object} state - Carousel component's state
 */
class Carousel extends Component {
  static propTypes = {
    children: T.arrayOf(T.node),
    style: T.object
  };

  /**
   * Append node to DLL as new tail
   * @memberOf Carousel
   *
   * @static
   * @param {...JSX.Element} els - Carousel component's elements
   * @param {CarouselNode} h - Current 'Head' node of Carousel
   * @param {CarouselNode} t - Current 'Tail' node of Carousel
   *
   * @return {object} New 'head' and 'tail' node of Carousel
   */
  static appendNode = (els, h, t) => {

    els.forEach(el => {
      const newNode = new CarouselNode();
      newNode.el = el;

      if (h) {
        let curr = h;
        while (curr && curr.next) {
          curr = curr.next;
        }
        curr.next = newNode;
        newNode.prev = curr;
        t = newNode;
      } else {
        h = t = newNode;
      }
    });

    return { head: h, tail: t };
  };

  constructor(props) {
    super(props);
    const { children: nodes } = props;

    this.state = {
      head: null,
      tail: null,
      curr: null,
      nodes
    };
  }

  /**
   * Called before the component is mounted to the DOM
   *
   * @return {void}
   * @memberOf Carousel
   */
  componentWillMount() {
    console.log('hello');
    const { head, tail, nodes } = this.state;

    const newState = Carousel.appendNode([...nodes], head, tail), { head: curr } = newState;

    this.setState(prev => ({ ...prev, ...newState, curr }));
  }

  /*  Component Lifecycle Methods

      componentDidMount() {
      }

      componentWillReceiveProps(nextProps) {

      }
  */

  shouldComponentUpdate(_, { curr: el, nodes: newNodes }) {
    const { curr: nEl, nodes } = this.state;

    console.log(el !== nEl || nodes.length !== newNodes.length);

    return (
      el !== nEl ||
      nodes.length !== newNodes.length
    );
  }

  /*
      componentWillUpdate(nextProps, nextState) {
      }

      componentDidUpdate(prevProps, prevState) {
      }

      componentWillUnmount() {
      }

  */

  handleLeft = () => {
    this.setState(({ tail, curr, ...rest }) => ({ ...rest, tail, curr: curr.prev || tail }));
  };

  handleRight = () => {
    this.setState(({ head, curr, ...rest }) => ({ ...rest, head, curr: curr.next || head }));
  };

  render() {
    const { curr: displayElem } = this.state;
    const { style } = this.props;

    return (
      <div style={style}>
        <button onClick={this.handleLeft}>{'<'}</button>
        <span style={{ alignSelf: 'center' }}>
          {displayElem && displayElem.el}
        </span>
        <button onClick={this.handleRight}>{'>'}</button>
      </div>
    );
  }
}

/**
 * Append a component to the Carousel.
 *
 * @param {Carousel} carousel - Carousel instance
 * @param {JSX.Element} cmp - New component to be appended to Carousel
 * @param {function} cb - Optional callback function
 * @return {void}
 */
const addComponent = (carousel, cmp, cb = () => null) => {
  const { nodes, head, tail } = carousel.state;
  let { curr } = carousel.state;

  curr =
    curr === head ? head :
      curr === tail ? tail :
        curr;

  const newHeadTail = Carousel.appendNode([cmp], head, tail);

  carousel.setState(prev => ({ ...prev, ...newHeadTail, nodes: [...nodes, cmp], curr }), cb());
};

const removeComponent = (carousel, cb = () => null) => (
  carousel.setState(({ tail, curr, ...rest }) => {
    const { prev: newTail } = tail;

    if (newTail) {
      newTail.next = null;

      if (curr === tail) { curr = newTail; }

      tail = newTail;
    }

    return { ...rest, tail, curr };
  }) && cb());


export { Carousel, addComponent, removeComponent };
