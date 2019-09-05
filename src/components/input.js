import React from 'react';
import styled from 'styled-components';
import { Input } from 'semantic-ui-react';
import { withFormik } from 'formik';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { flowRight } from 'lodash';

const InputWrapper = styled.div`
  background-color: #362234;
  grid-row: 3;
  grid-column: 3;
  margin: 20px;
  color: 'black';
`;
const sendMessageMutation = gql`
  mutation($channelId: Int!, $text: String!) {
    createMessage(channelId: $channelId, text: $text)
  }
`;
const SendMessage = ({
  channelName,
  values,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting
}) => (
  <InputWrapper>
    <Input
      onKeyDown={e => {
        if (e.keyCode === 13 && !isSubmitting) {
          handleSubmit();
        }
      }}
      name="message"
      value={values.message}
      onBlur={handleBlur}
      onChange={handleChange}
      fluid
      placeholder={`Message ${channelName}`}
    />
  </InputWrapper>
);
export default flowRight(
  graphql(sendMessageMutation),
  withFormik({
    mapPropsToValues: () => ({ message: '' }),
    handleSubmit: async (
      values,
      { props: { channelId, mutate }, setSubmitting, resetForm }
    ) => {
      //if message doesnt exist dont submit
      if (!values.message || values.message.trim()) {
        setSubmitting(false);
      }
      await mutate({
        variables: { channelId, text: values.message }
      });
      resetForm(false);
    }
  })
)(SendMessage);
