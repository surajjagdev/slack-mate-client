import React from 'react';
import styled from 'styled-components';
import { Input } from 'semantic-ui-react';
import { withFormik } from 'formik';

const SendMessageWrapper = styled.div`
  grid-column: 3;
  grid-row: 3;
  margin: 20px;
`;
const SendMessage = ({
  channelName,
  values,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting
}) => (
  <SendMessageWrapper>
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
  </SendMessageWrapper>
);
export default withFormik({})(SendMessage);
