import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  render() {
    return (
      <>
        <Header />
        <h1 data-testid="page-search">page-search</h1>
      </>
    );
  }
}

export default Search;
