/* eslint-disable no-console */
import React, { Component, PropTypes as T } from 'react';

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
      nodes: [...nodes]
    };
  }

  /**
   * Called before the component is mounted to the DOM
   *
   * @return {void}
   * @memberOf Carousel
   */
  componentWillMount() {
    const { head, tail, nodes } = this.state;

    const newState = Carousel.appendNode([...nodes], head, tail),
      { head: curr } = newState;

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

    return (el !== nEl || nodes.length !== newNodes.length);
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

export { Carousel, CarouselNode };
