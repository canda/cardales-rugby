import React from 'react';
import qs from 'qs';

import { getAccountsRef } from '../../services/firebase';
import Layout from '../../components/Layout';

export default class Accounts extends React.Component {
  state = { accounts: [] };
  componentDidMount() {
    const { location } = this.props;
    const { id } = qs.parse(location.search, { ignoreQueryPrefix: true });
    getAccountsRef().then(accountsRef => {
      accountsRef.doc(id).onSnapshot(accountSnapshot => {
        console.log({ accountSnapshot });
        this.setState({
          account: accountSnapshot.data()
        });
      });
    });
  }
  render() {
    const { account } = this.state;
    return (
      <Layout>
        <h1>Account</h1>
        {JSON.stringify(account, null, 2)}
      </Layout>
    );
  }
}
