import React, { Component, PropTypes as T } from 'react';


/* eslint-disable no-console */
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

  static propTypes = {
    children: T.arrayOf(T.node),
    style: T.object
  };

  constructor(props) {
    console.groupCollapsed('constructor');
    super(props);

    const { children } = props;

    this.state = {
      head: null,
      tail: null,
      curr: null,
      children
    };
    console.groupEnd();
  }

  componentWillMount() {
    console.groupCollapsed('componentWillMount');
    const { head, tail, children } = this.state;

    const newState = this.addNode(children, head, tail),
      { head: curr } = newState;

    this.setState(prev => ({ ...prev, ...newState, curr }));
    console.groupEnd();
  }

  componentDidMount() {
    console.groupCollapsed('componentDidMount');
    console.log('#Mounted');
    console.groupEnd();
  }

  componentWillReceiveProps(nextProps) {
    console.groupCollapsed('componentWillReceiveProps');
    console.log(`Receiving props!`, nextProps);

    console.log(`\nCurrent State: `, this.state);
    console.groupEnd();
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.groupCollapsed('shouldComponentUpdate');
    console.log(nextProps);
    console.log(nextState);
    console.groupEnd();
    return true;
  }

  componentWillUpdate(nextProps, nextState) {
    console.groupCollapsed('componentWillUpdate');
    console.log(nextProps);
    console.log(nextState);
    console.groupEnd();
  }

  componentDidUpdate(prevProps, prevState) {
    console.groupCollapsed('componentDidUpdate');
    console.log(prevProps);
    console.log(prevState);
    console.log(this.state);
    console.assert(prevState !== this.state, 'Previous and current states do not match');
    console.groupEnd();
  }

  componentWillUnmount() {
    console.group('componentWillUnmount');
    console.groupEnd();
  }

  addNode = (els, h, t) => {
    console.groupCollapsed('In addNode');

    const callOnEach = (el) => {
      const newNode = new CarouselNode(el);

      if (h) {
        [t.next, newNode.prev, t] = [newNode, t, newNode];
      } else {
        h = t = newNode;
        [h.next, t.prev] = [t, h];
        h.prev = t.next = null;
      }
    };

    els.forEach(el => { callOnEach(el); });
    console.groupEnd();

    return { head: h, tail: t };
  }

  handleLeft = () => {
    console.log('handling left!', this.state);
    this.setState(({ tail, curr, ...rest }) =>
      ({ ...rest, tail, curr: curr.prev || tail }));
  }

  handleRight = () => {
    console.log('handling right!', this.state);
    this.setState(({ head, curr, ...rest }) =>
      ({ ...rest, head, curr: curr.next || head }));
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

const addComponent = (carousel, component, cb) => {
  const newPony = new CarouselNode(component);
  carousel.setState(({ children, ...rest }) => ({ ...rest, children: [...children, newPony] }));
  if (cb) {
    cb();
  }
};

export { Carousel, addComponent };
