import React from 'react';
import { Link } from 'gatsby';
import { getAccountsRef } from '../../../services/firebase';
import Layout from '../../../components/Layout';

export default class Accounts extends React.Component {
  state = { accounts: [] };
  componentDidMount() {
    getAccountsRef().then(accountsRef => {
      accountsRef.onSnapshot(accountsSnapshot => {
        console.log({ accountsSnapshot });
        this.setState({
          accounts: accountsSnapshot.docs.map(a => ({ id: a.id, ...a.data() }))
        });
      });
    });
  }
  render() {
    const { accounts } = this.state;
    return (
      <Layout>
        <section className="section">
          <div className="container">
            <div className="content">
              <h1>Accounts</h1>
              <Link className="button is-primary" to="/socio/accounts/add">
                Crear Cuenta
              </Link>
              <ul>
                {accounts.map(acc => (
                  <li>
                    <Link key={acc.id} to={`/socio/account?id=${acc.id}`}>
                      {acc.dni}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </Layout>
    );
  }
}
