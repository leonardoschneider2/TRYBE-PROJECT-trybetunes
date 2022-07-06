import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Album from '../pages/Album';
import Login from '../pages/Login';
import Search from '../pages/Search';
import Favorites from '../pages/Favorites';
import ProfileEdit from '../pages/ProfileEdit';
import Profile from '../pages/Profile';
import NotFound from '../pages/NotFound';

class Content extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
    };
  }

  changeName = (event) => {
    const { target } = event;
    this.setState({
      name: target.value,
    });
  }

  render() {
    const { name } = this.state;
    return (
      <Switch>
        { /* Chamando o Login */ }
        <Route
          exact
          path="/"
          render={ (props) => (
            <Login
              { ...props }
              name={ name }
              changeName={ this.changeName }
            />
          ) }
        />

        <Route path="/search" component={ Search } />
        <Route path="/album/:id" component={ Album } />
        <Route path="/favorites" component={ Favorites } />
        <Route exact path="/profile" component={ Profile } />
        <Route path="/profile/edit" component={ ProfileEdit } />
        <Route exact path="" component={ NotFound } />

      </Switch>
    );
  }
}

export default Content;
