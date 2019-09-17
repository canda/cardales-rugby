import React from 'react';
import Layout from '../../components/Layout';
import { Link } from 'gatsby';

export default class Index extends React.Component {
  render() {
    return (
      <Layout>
        <h1>Login</h1>
        <Link to="/socio/accounts">Accounts</Link>
      </Layout>
    );
  }
}
