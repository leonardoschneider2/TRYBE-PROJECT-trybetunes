import React from 'react';
import Header from '../components/Header';

class Profile extends React.Component {
  render() {
    return (
      <>
        <Header />
        <h1 data-testid="page-profile">page-profile</h1>
      </>
    );
  }
}

export default Profile;
