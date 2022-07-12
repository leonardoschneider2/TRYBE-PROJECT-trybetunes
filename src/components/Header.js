import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Carregando from './Carregando';

class Header extends React.Component {
  constructor() {
    super();
    this.state = ({
      user: {
        name: '',
        loading: true,
      },
    });
  }

  funcaozinha = async () => {
    const response = await getUser();
    const { name } = await response;
    this.setState({
      user: {
        name,
      },
    });
  }

  render() {
    this.funcaozinha();
    const { user } = this.state;
    return (
      <header
        data-testid="header-component"
      >
        {
          user.name !== '' ? (
            <p>
              Name:
              <span data-testid="header-user-name">{ user.name }</span>
            </p>
          ) : <Carregando />
        }
        <Link
          to="/search"
          data-testid="link-to-search"
          className="nav-bar-ancor"
          id="nav-bar-ancor-search"
        >
          Search
        </Link>
        <Link
          to="/favorites"
          data-testid="link-to-favorites"
          className="nav-bar-ancor"
          id="nav-bar-ancor-favorites"
        >
          Favorite List
        </Link>
        <Link
          to="/profile"
          data-testid="link-to-profile"
          className="nav-bar-ancor"
          id="nav-bar-ancor-profile"
        >
          Profile
        </Link>
      </header>
    );
  }
}

export default Header;
