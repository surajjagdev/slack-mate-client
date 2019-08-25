import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const getAllUsers = gql`
  query {
    allUsers {
      id
      email
    }
  }
`;
const Home = () => (
  <Query query={getAllUsers}>
    {({ loading, error, data: { allUsers = [] } }) => {
      if (loading) return 'Loading...';
      if (error) return `Error! ${error.message}`;
      return allUsers.map(u => {
        return <h1 key={u.id}>{u.email}</h1>;
      });
    }}
  </Query>
);
/*
const Home = ({ data: { loading, allUsers } }) =>
  loading
    ? null
    : allUsers.map(u => {
        return <h1 key={u.id}>{u.email}</h1>;
      });*/
export default Home;
