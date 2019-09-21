import React from 'react';
import { Form, Button, Modal } from 'semantic-ui-react';
import { graphql } from 'react-apollo';
import { flowRight } from 'lodash';
import { withRouter } from 'react-router-dom';
import { withFormik } from 'formik';
import gql from 'graphql-tag';
import SelectUsers from './selectUser.js';

const DirectMessageModal = ({
  open,
  onClose,
  teamId,
  currentUserId,
  values,
  handleSubmit,
  isSubmitting,
  resetForm,
  setFieldValue
}) => (
  <Modal open={open} onClose={onClose}>
    <Modal.Header>Direct Message</Modal.Header>
    <Modal.Content>
      <Form>
        <Form.Field>
          <SelectUsers
            value={values.members}
            currentUserId={currentUserId}
            handleChange={(e, { value }) => setFieldValue('members', value)}
            teamId={teamId}
            placeholder="select members to invite"
          />
        </Form.Field>
        <Form.Group>
          <Button
            type="submit"
            disabled={isSubmitting}
            fluid
            onClick={e => {
              resetForm();
              onClose(e);
            }}
          >
            Cancel
          </Button>
          <Button disabled={isSubmitting} fluid onClick={handleSubmit}>
            Start Messaging
          </Button>
        </Form.Group>
      </Form>
    </Modal.Content>
  </Modal>
);
const getOrCreateChannelMutation = gql`
  mutation($teamId: Int!, $members: [String!]!) {
    getOrCreateChannel(teamId: $teamId, members: $members)
  }
`;
export default flowRight(
  withRouter,
  graphql(getOrCreateChannelMutation),
  withFormik({
    mapPropsToValues: () => ({ members: [] }),
    handleSubmit: async (
      { members },
      { props: { onClose, teamId, mutate }, setSubmitting }
    ) => {
      const response = await mutate({ variables: { members, teamId } });
      console.log(response);
      onClose();
      setSubmitting(false);
    }
  })
)(DirectMessageModal);
