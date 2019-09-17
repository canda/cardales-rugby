import React from 'react';
import qs from 'qs';

import { getAccountsRef } from '../../services/firebase';
import Layout from '../../components/Layout';
import Balance from '../../components/Balance';

export default class Accounts extends React.Component<{ location: Location }> {
  state = { account: null, error: null };
  componentDidMount() {
    this.getAccount();
  }

  getAccount = async () => {
    const { location } = this.props;
    const { id } = qs.parse(location.search, { ignoreQueryPrefix: true });
    const accountsRef = await getAccountsRef();

    accountsRef.doc(id).onSnapshot(accountSnapshot => {
      if (accountSnapshot.exists) {
        this.setState({
          account: { ...accountSnapshot.data(), id: accountSnapshot.id },
          error: null
        });
      } else {
        this.setState({ error: 'Esta cuenta no existe' });
      }
    });
  };

  render() {
    const { account, error } = this.state;
    console.log({ account, error });
    return (
      <Layout>
        <section className="section">
          <div className="container">
            <div className="content">
              <h1>Estado de Cuenta</h1>
              {error && <div className="notification is-danger">{error}</div>}
              {!error && !!account && (
                <React.Fragment>
                  <span>
                    {account.firstname} {account.lastname} - {account.dni}
                  </span>
                  <Balance account={account} />
                </React.Fragment>
              )}
            </div>
          </div>
        </section>
      </Layout>
    );
  }
}
