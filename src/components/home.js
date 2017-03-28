import React, { PropTypes as T } from 'react';
import Helmet from 'react-helmet';
import { Carousel, addComponent } from './carousel';

import Container from './container';


class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = { key: 0 };
  }

  handleClick = () => (
    addComponent(
      this.carousel,
      <Name
        name={`Butter ${this.state.key}`}
        key={this.state.key}
      />,
      this.setState(({ key, ...rest }) => ({ ...rest, key: ++key }))
    )
  );

  render() {

    const style = {
      display: 'flex',
      justifyContent: 'space-between',
      height: '500px'
    };

    const elems = [
      <Name name="Mom" key="Mom" />,
      <Name name="Dad" key="Dad" />,
      <Name name="Dog" key="Dog" />
    ];

    return (
      <Container>
        <Helmet title="Home" />
        <Carousel
          style={style}
          ref={car => { this.carousel = car; }}
        >
          {elems}
        </Carousel>
        <button onClick={this.handleClick}>Add Component</button>
      </Container>
    );
  }
}

const Name = ({ name }) => <span>Hello {name}!</span>; // eslint-disable-line

Name.propTypes = {
  name: T.string
};

export default Home;
