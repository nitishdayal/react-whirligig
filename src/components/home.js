import React, { PropTypes as T } from 'react';
import Helmet from 'react-helmet';

import { Carousel, addComponent } from './carousel';
import Container from './container';

class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = { idx: 0, key: 0 };
  }

  onHandleRight = () => {
    this.setState((prev) => ({ idx: prev.idx + 1 }));
  }

  onHandleLeft = () => {
    this.setState((prev) => ({ idx: prev.idx - 1 }));
  }

  handleClick = () => {
    addComponent(this.carousel, <Name name={`Butter ${this.state.key}`} key={this.state.key} />);
    // this.setState((prev) => ({ key: prev.key++, ...prev }));
  }

  render() {
    const { idx } = this.state;
    const style = { display: 'flex', justifyContent: 'space-between', height: '500px' };

    const elems = [
      <Name name="Mom" key="Mom" />,
      <Name name="Dad" key="Dad" />,
      <Name name="Dog" key="Dog" />
    ];

    return (
      <Container>
        <Helmet title="Home" />
        <Carousel
          idx={idx}
          style={style}
          handleRight={this.onHandleRight}
          handleLeft={this.onHandleLeft}
          ref={(car) => { this.carousel = car; }}
        >
          {elems}
        </Carousel>
        <button onClick={this.handleClick}>Add Component</button>
      </Container >
    );
  }
}

const Name = ({ name }) => <span>Hello {name}!</span>;

Name.propTypes = {
  name: T.string
};

export default Home;
