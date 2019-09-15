import React from 'react';
import { getAccountsRef } from '../../services/firebase';
import { Link } from 'gatsby';
import Layout from '../../components/Layout';

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
        <h1>Accounts</h1>
        {accounts.map(a => (
          <Link key={a.id} to={`/socio/account?id=${a.id}`}>
            {a.dni}
          </Link>
        ))}
      </Layout>
    );
  }
}
