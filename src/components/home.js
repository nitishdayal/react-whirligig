import React, { PropTypes as T } from 'react';
import Helmet from 'react-helmet';

import Carousel from './carousel';
import Container from './container';

class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = { idx: 0 };
  }

  onHandleRight = () => {
    this.setState((prev) => ({ idx: prev.idx + 1 }));
  }

  onHandleLeft = () => {
    this.setState((prev) => ({ idx: prev.idx - 1 }));
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
          <Name name="Mom" />
          <Name name="Dad" />
          <Name name="Dog" />
        </Carousel>
      </Container >
    );
  }
}

const Name = ({ name }) => <span>Hello {name}!</span>;

Name.propTypes = {
  name: T.string
};

export default Home;
