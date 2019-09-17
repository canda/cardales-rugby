import React from 'react';
import { Link, navigate } from 'gatsby';
import { getAccountsRef } from '../../../services/firebase';
import Layout from '../../../components/Layout';
import AccountForm from '../../../components/AccountForm';
import { Account } from '../../../types/Account';

const BACK_URL = '/socio/accounts';

export default class Accounts extends React.Component {
  state: { account: Account; loading: Boolean } = { account: {}, loading: false };

  onAccountChange = (account: Account) => {
    this.setState({ account });
  };

  submit = async () => {
    this.setState({ loading: true });

    const { account } = this.state;
    const accountsRef = await getAccountsRef();
    await accountsRef.add(account);

    this.setState({ loading: false });

    navigate(BACK_URL);
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
                  <Link className="button" to={BACK_URL}>
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
