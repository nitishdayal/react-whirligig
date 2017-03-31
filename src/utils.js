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

  /**
   * Traverse DLL and return element w/ key property that matches provided 'key' argument
   *
   * @param {object} node
   * Current carousel display element.
   * @param {boolean} ltr
   * Determines if DLL is traversed LTR or RTL.
   * @param {string} key
   * Key property of DLL node element to find.
   * @return {object} node
   */
  const traverse = (node, ltr, key) => {
    while (node && node.el.key !== key) {
      node = ltr ? node.next : node.prev;
    }

    return node;
  };

  carousel.setState(({ curr, nodes, ...rest }) => {
    let newCurr;
    const [elExists] = nodes.filter(node => node.key === nodeKey);

    if (elExists) {
      newCurr = curr;

      /**
       * This is a shit implementation and needs to be optimized.
       * As it stands, if the key provided as an argument to
       * 'showComponent' is of a lower value than the current
       * active carousel element, we start traversing the DLL
       * from the _head_ of the DLL. So, if the current active
       * node item is key 35, and the user wants to see the
       * node item w/ key 34, instead of just going back one
       * it will start from the head of the DLL and traverse
       * until it finds the node item. So 34 traversals instead of 1.
       *
       *
       * The preferred implementation:
       *
       * If the key argument is of a lower value than the active
       * node's key AND the difference between the active node key
       * and key argument is GREATER THAN THE SUM of the node list length
       * minus the active node key plus the provided argument key
       * then start looking for the element from the head of the DLL.
       *
       * If the key argument is of a lower value than the active
       * node's key AND the difference between the active node key
       * and key argument is LESS THAN THE SUM of node list length
       * minus the active node key plus the provided argument key,
       * then start looking for the element from the current node item
       * by traversing RTL.
       *
       * Similar logic if key argument is of a higher value than the
       * active node's key.
       */

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
