import React from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Carregando from '../components/Carregando';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
    };
  }

  handleCreateUser = async () => {
    this.setState({ loading: true });
    const { name } = this.props;
    await createUser({ name });
    this.setState({ loading: false });
    const { history } = this.props;
    history.push('/search');
  }

  render() {
    const { name: loginName, changeName } = this.props;
    const { loading } = this.state;
    const tam = 3;

    return (
      <div className="login">
        <h1 data-testid="page-login">page login</h1>

        <form>
          <input
            type="text"
            data-testid="login-name-input"
            onChange={ changeName }
            value={ loginName }
          />
          <button
            data-testid="login-submit-button"
            type="button"
            disabled={ loginName.length < tam }
            onClick={ this.handleCreateUser }
          >
            Entrar
          </button>
        </form>
        {
          loading && <Carregando />
        }
      </div>
    );
  }
}

Login.propTypes = {
  name: PropTypes.string,
  changeName: PropTypes.func,
}.isRequired;

export default Login;
