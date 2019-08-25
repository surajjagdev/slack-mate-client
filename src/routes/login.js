import React from 'react';
import { extendObservable } from 'mobx';
import { observer } from 'mobx-react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { Message, Input, Button, Container, Header } from 'semantic-ui-react';

export default observer(
  class Login extends React.Component {
    constructor(props) {
      super(props);

      extendObservable(this, {
        email: '',
        password: '',
        emailError: '',
        passwordError: ''
      });
    }
    onChange = e => {
      const { name, value } = e.target;
      //mobxlike this.setState
      this[name] = value;
    };
    validateData = () => {
      const { email, password } = this;
      if (email.length > 4 && password.length > 4) {
        return true;
      } else {
        return false;
      }
    };
    postFormLogin = data => {
      const response = data.login;
      console.log(data.login);
      this.passwordError = '';
      this.emailError = '';
      if (response.ok === true) {
        this.passwordError = '';
        this.emailError = '';
        this.email = '';
        this.password = '';
        localStorage.setItem('token', response.token);
        localStorage.setItem('refreshToken', response.refreshToken);
        return this.props.history.push('/');
      } else {
        const err = {};
        response.errors.forEach(({ path, message }) => {
          err[`${path}Error`] = message;
          //err['passwordError]
        });
        this.setState(err, () => {
          console.log(this.state);
        });
      }
    };
    render() {
      const { email, password, emailError, passwordError } = this;
      const errorList = [];
      if (emailError) {
        errorList.push(emailError);
      }
      if (passwordError) {
        errorList.push(passwordError);
      }
      return (
        <Container text>
          <Header as="h2">Login</Header>
          <Input
            name="email"
            value={email}
            placeholder="Email"
            onChange={this.onChange}
            fluid
          />
          <Input
            name="password"
            value={password}
            type="password"
            placeholder="Password"
            onChange={this.onChange}
            fluid
          />
          <Mutation
            mutation={LOGIN_MUTATION}
            variables={{ email, password }}
            onCompleted={data => this.postFormLogin(data)}
          >
            {postMutation => (
              <Button
                disabled={this.validateData() ? false : true}
                onClick={postMutation}
              >
                Login
              </Button>
            )}
          </Mutation>
          {emailError || passwordError ? (
            <Message
              error
              header="There was some errors with your submission"
              list={errorList}
            />
          ) : null}
        </Container>
      );
    }
  }
);

const LOGIN_MUTATION = gql`
  mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      ok
      refreshToken
      token
      errors {
        path
        message
      }
    }
  }
`;
/* <Mutation
          mutation={LOGIN_MUTATION}
          variables={{ email, password }}
          onCompleted={data => this.postFormLogin(data)}
        >
          {postMutation => (
            <Button
              disabled={this.validateData() ? false : true}
              onClick={postMutation}
            >
              Register
            </Button>
          )}
        </Mutation>*/
