import React from 'react';
import { extendObservable } from 'mobx';
import { observer } from 'mobx-react';
import { Input, Button, Container, Header } from 'semantic-ui-react';

export default observer(
  class Login extends React.Component {
    constructor(props) {
      super(props);

      extendObservable(this, {
        email: '',
        password: ''
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
    render() {
      const { email, password } = this;
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
          <Button disabled={this.validateData() ? false : true}>Login</Button>
        </Container>
      );
    }
  }
);
/* <Mutation
          mutation={REGISTER_MUTATION}
          variables={{ username, email, password }}
          onCompleted={data => this.postFormRegister(data)}
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
