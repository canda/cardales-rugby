import React from 'react';
import { Link } from 'gatsby';
import { getAccountsRef } from '../../../services/firebase';
import Layout from '../../../components/Layout';
import AccountForm from '../../../components/AccountForm';

export default class Accounts extends React.Component {
  state = { account: {} };

  onAccountChange = account => {
    this.setState({ account });
  };

  submit = async () => {
    const accountsRef = await getAccountsRef();
  };

  render() {
    const { account } = this.state;
    return (
      <Layout>
        <section className="section">
          <div className="container">
            <div className="content">
              <h1>Crear Cuenta</h1>

              <AccountForm account={account} onChange={this.onAccountChange} />

              <div className="field is-grouped">
                <div className="control">
                  <button onClick={this.submit} className="button is-link">
                    Guardar
                  </button>
                </div>
                <div className="control">
                  <Link className="button" to="/socio/accounts">
                    Cancelar
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    );
  }
}
