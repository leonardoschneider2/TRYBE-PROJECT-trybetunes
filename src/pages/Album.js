import React from 'react';
import Header from '../components/Header';

class Album extends React.Component {
  render() {
    return (
      <>
        <Header />
        <h1 data-testid="page-album">page-album</h1>
      </>
    );
  }
}

export default Album;
