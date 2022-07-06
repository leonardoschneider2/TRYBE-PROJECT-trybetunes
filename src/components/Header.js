import React from 'react';
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
      </header>
    );
  }
}

export default Header;
