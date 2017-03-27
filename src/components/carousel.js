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

    const { children } = props;

    this.state = {
      head: null,
      tail: null,
      children
    };
  }

  componentDidMount() {

    const { children } = this.state;
    children.forEach(el => { this.addNode(el); });

  }
  addNode = (el) => {
    this.forceUpdate(() => console.log('Forced update'));
    console.log(`Working with el: `, el);
    const newNode = new CarouselNode(el);
    let head;
    let tail;

    if (this.state.head) {
      console.log(`State head found! ${this.state.head}`);
      const { tail: curr } = this.state;
      tail = newNode;
      curr.next = tail;
      tail.prev = curr;
    } else {
      console.log('No state head');
      head = tail = newNode;
      head.next = tail;
      tail.prev = head;
    }
    this.setState(prev => ({ ...prev, head, tail }), () => console.log('set state done!'));
  }

  handleLeft = () => {
    console.log('handling left!', this.state);
    this.setState(({ head, rest }) => ({ ...rest, head: head.prev }));
  }

  handleRight = () => {
    console.log('handling right!', this.state);
    this.setState(({ head, rest }) => ({ ...rest, head: head.next }));
  }


  render() {
    const { head: displayElem } = this.state;
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
  console.log(newPony);
  carousel.setState(
    ({ components, ...rest }) => ({ components: [...components, newPony], idx: rest.idx })
  );
};

// const formatIdx = (idx, arrLen) => (idx % arrLen + arrLen) % arrLen;

Carousel.propTypes = {
  children: PropTypes.any,
  handleLeft: PropTypes.func,
  handleRight: PropTypes.func,
  idx: PropTypes.number,
  style: PropTypes.object
};

export { Carousel, addComponent };
