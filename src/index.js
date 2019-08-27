import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ApolloProvider } from 'react-apollo';
import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  HttpLink
} from 'apollo-boost';
import 'semantic-ui-css/semantic.min.css';
import * as serviceWorker from './serviceWorker';
const host = 'http://localhost:3001/graphql';
const httpLink = new HttpLink({
  uri: host
});
const authLink = new ApolloLink((operation, forward) => {
  // Retrieve the authorization token from local storage.
  if (localStorage.getItem('token') !== null) {
    const token = localStorage.getItem('token');
    const refreshToken = localStorage.getItem('refreshToken');
    console.log(refreshToken);
    // Use the setContext method to set the HTTP headers.
    operation.setContext({
      headers: {
        token: token ? `${token}` : '',
        refreshtoken: refreshToken ? `${refreshToken}` : ''
        // authorization: token ? `${token}` : ``
      }
    });
  }
  // Call the next link in the middleware chain.
  return forward(operation);
});
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});
ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
