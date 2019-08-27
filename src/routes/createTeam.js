import React from 'react';
import { extendObservable } from 'mobx';
import { observer } from 'mobx-react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import {
  Message,
  Form,
  Input,
  Button,
  Container,
  Header
} from 'semantic-ui-react';

export default observer(
  class CreateTeam extends React.Component {
    constructor(props) {
      super(props);

      extendObservable(this, {
        name: '',
        errors: {}
      });
    }
    onChange = e => {
      const { name, value } = e.target;
      //mobxlike this.setState
      this[name] = value;
    };
    validateData = () => {
      const { name } = this;
      if (name.length > 0) {
        return true;
      } else {
        return false;
      }
    };
    postFormLogin = data => {
      const response = data.createTeam;
      let { name } = this;
      console.log(data);
      if (response.ok === true) {
        this.errors = {};
        name = '';
        return this.props.history.push('/');
      } else {
        const err = {};
        response.errors.forEach(({ path, message }) => {
          err[`${path}Error`] = message;
          //err['passwordError]
        });
        this.errors = err;
      }
    };
    render() {
      const {
        name,
        errors: { nameError }
      } = this;
      const errorList = [];
      if (nameError) {
        errorList.push(nameError);
      }
      return (
        <Container text>
          <Header as="h2">Create A Team</Header>
          <Form>
            <Form.Field error={!!nameError}>
              <Input
                name="name"
                value={name}
                placeholder="Name"
                onChange={this.onChange}
                fluid
              />
            </Form.Field>
            <Form.Field>
              <Mutation
                mutation={CREATE_TEAM}
                variables={{ name }}
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
            </Form.Field>
          </Form>
          {errorList.length ? (
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

const CREATE_TEAM = gql`
  mutation($name: String!) {
    createTeam(name: $name) {
      ok
      errors {
        path
        message
      }
    }
  }
`;
