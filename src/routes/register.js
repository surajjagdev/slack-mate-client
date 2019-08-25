import React from 'react';
import { Input, Button, Container, Header } from 'semantic-ui-react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
class Register extends React.Component {
  state = {
    username: '',
    email: '',
    password: ''
  };
  onChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  onSubmit = e => {
    e.preventDefault();
  };
  validateData = () => {
    const { username, email, password } = this.state;
    if (username.length > 4 && email.length > 4 && password.length > 4) {
      return true;
    } else {
      return false;
    }
  };
  render() {
    const { username, email, password } = this.state;
    return (
      <Container text>
        <Header as="h2">Register</Header>
        <Input
          name="username"
          value={this.state.username}
          placeholder="Username"
          onChange={this.onChange}
          fluid
        />
        <Input
          name="email"
          value={this.state.email}
          placeholder="Email"
          onChange={this.onChange}
          fluid
        />
        <Input
          name="password"
          value={this.state.password}
          type="password"
          placeholder="Password"
          onChange={this.onChange}
          fluid
        />
        <Mutation
          mutation={REGISTER_MUTATION}
          variables={{ username, email, password }}
          onCompleted={data => console.log(data)}
        >
          {postMutation => (
            <Button
              disabled={this.validateData() ? false : true}
              onClick={postMutation}
            >
              Register
            </Button>
          )}
        </Mutation>
      </Container>
    );
  }
}
const REGISTER_MUTATION = gql`
  mutation($username: String!, $email: String!, $password: String!) {
    register(username: $username, email: $email, password: $password)
  }
`;
export default Register;
