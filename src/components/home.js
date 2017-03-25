import React from 'react';
import Helmet from 'react-helmet';

import Carousel from './carousel';
import Container from './container';

class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = { idx: 0 };
  }

  onHandleRight = () => {
    this.setState((prev) => {
      return { idx: prev.idx + 1 };
    });
  }

  onHandleLeft = () => {
    this.setState((prev) => {
      return { idx: prev.idx - 1 };
    });
  }

  render() {

    const { idx } = this.state;
    const style = { display: 'flex', justifyContent: 'space-between', height: '500px' };

    return (
      <Container>
        <Helmet title="Home" />

        <Carousel
          idx={idx}
          style={style}
          handleRight={this.onHandleRight}
          handleLeft={this.onHandleLeft}
        >
          <Mom />
          <Dad />
          <Dog />
        </Carousel>

      </Container >
    );
  }
}

const Mom = () => <span>Hello mom!</span>;

const Dad = () => <span>Hi dad!</span>;

const Dog = () => <span>Hi dog!</span>;

export default Home;
