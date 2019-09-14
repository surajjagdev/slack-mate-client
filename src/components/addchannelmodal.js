import React from 'react';
import { Form, Input, Button, Modal } from 'semantic-ui-react';
import { withFormik } from 'formik';
import gql from 'graphql-tag';
import { findIndex } from 'lodash';
import { graphql } from 'react-apollo';
import { flowRight } from 'lodash';
import { getUserQuery } from '../graphql/team.js';

const AddChannelModal = ({
  open,
  close,
  values,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting,
  resetForm
}) => (
  <Modal
    open={open}
    onClose={e => {
      resetForm();
      close(e);
    }}
  >
    <Modal.Header>Add Channel</Modal.Header>
    <Modal.Content>
      <Form>
        <Form.Field>
          <Input
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            name="name"
            fluid
            placeholder="Channel name"
          />
        </Form.Field>
        <Form.Group widths="equal">
          <Button
            type="submit"
            disabled={isSubmitting}
            fluid
            onClick={e => {
              resetForm();
              close(e);
            }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
            onClick={handleSubmit}
            fluid
          >
            Create Channel
          </Button>
        </Form.Group>
      </Form>
    </Modal.Content>
  </Modal>
);

const createChannelMutation = gql`
  mutation($teamId: Int!, $name: String!) {
    createChannel(teamId: $teamId, name: $name) {
      ok
      channel {
        id
        name
      }
      errors {
        path
        message
      }
    }
  }
`;

export default flowRight(
  graphql(createChannelMutation),
  withFormik({
    mapPropsToValues: () => ({ name: '' }),
    handleSubmit: async (
      values,
      { props: { close, teamId, mutate }, setSubmitting }
    ) => {
      await mutate({
        variables: { teamId, name: values.name },
        optimisticResponse: {
          createChannel: {
            __typename: 'Mutation',
            ok: true,
            channel: {
              __typename: 'Channel',
              id: -1,
              name: values.name
            }
          }
        },
        update: (store, { data: { createChannel } }) => {
          const { ok, channel } = createChannel;
          if (!ok) {
            return;
          }
          const data = store.readQuery({ query: getUserQuery });
          const teamIdx = findIndex(data.getUser.teams, ['id', teamId]);
          data.getUser.teams[teamIdx].channels.push(channel);
          store.writeQuery({ query: getUserQuery, data });
        }
      });
      close();
      setSubmitting(false);
    }
  })
)(AddChannelModal);
