/* eslint-disable no-nested-ternary, no-console */
import { Carousel } from './components/carousel';

/**
 * Append a component to the Carousel.
 *
 * @param {Carousel} carousel
 * Carousel instance
 *
 * @param {JSX.Element} cmp
 * New component to be appended to Carousel
 *
 * @param {function} cb
 * Optional callback function
 *
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

  carousel.setState(prev => ({ ...prev, ...newHeadTail, nodes: [...nodes, cmp], curr }), cb);
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

const showComponent = (carousel, nodeKey) => {

  const traverse = (node, ltr, key) => {
    while (node && node.el.key !== key) {
      node = ltr ? node.next : node.prev;
      console.log('looking for matching node...\n', node, key);
    }
    return node;
  };

  carousel.setState(({ curr, nodes, ...rest }) => {
    let newCurr;
    const [elExists] = nodes.filter(node => node.key === nodeKey);

    if (elExists) {
      newCurr = curr;

      if (parseInt(nodeKey) > parseInt(curr.el.key)) {
        newCurr = traverse(newCurr, true, nodeKey);
      } else if (parseInt(nodeKey) < parseInt(curr.el.key)) {
        newCurr = rest.head;
        newCurr = traverse(newCurr, true, nodeKey);
      }
    }

    return { ...rest, nodes, curr: newCurr || curr };
  });

};

export { addComponent, removeComponent, showComponent };
