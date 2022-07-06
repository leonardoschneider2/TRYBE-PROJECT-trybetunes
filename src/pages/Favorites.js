import React from 'react';
import Header from '../components/Header';

class Favorites extends React.Component {
  render() {
    return (
      <>
        <Header />
        <h1 data-testid="page-favorites">page-favorites</h1>
      </>
    );
  }
}

export default Favorites;
