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
import { setContext } from 'apollo-link-context';
import { onError } from 'apollo-link-error';
import 'semantic-ui-css/semantic.min.css';
import * as serviceWorker from './serviceWorker';
import { from } from 'zen-observable';
const host = 'http://localhost:3001/graphql';
const httpLink = new HttpLink({
  uri: host
});
const authLink = setContext(() => ({
  headers: {
    token: localStorage.getItem('token') || null,
    refreshtoken: localStorage.getItem('refreshToken') || null
  }
}));
const afterWare = new ApolloLink((operation, forward) => {
  return forward(operation).map(response => {
    const context = operation.getContext();
    const {
      response: { headers }
    } = context;

    if (headers) {
      const token = headers.get('token');
      const refreshToken = headers.get('refreshtoken');

      if (token) {
        localStorage.setItem('token', token);
      }

      if (refreshToken) {
        localStorage.setItem('refreshToken', refreshToken);
      }
    }
    console.log(response);
    return response;
  });
});
/*const logoutLink = onError(({ networkError }) => {
  if (networkError.statusCode === 401) {
    console.log('netwrok erro');
  }
});*/

const client = new ApolloClient({
  link: ApolloLink.from([authLink, afterWare, httpLink]),
  //link: authLink.concat(httpLink),
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
