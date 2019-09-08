import React from 'react';
import styled from 'styled-components';
import { Input } from 'semantic-ui-react';
import { withFormik } from 'formik';

const InputWrapper = styled.div`
  background-color: #362234;
  grid-row: 3;
  grid-column: 3;
  margin: 20px;
  color: 'black';
`;
const SendMessage = ({
  placeholder,
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
      placeholder={`Message ${placeholder}`}
    />
  </InputWrapper>
);
export default withFormik({
  mapPropsToValues: () => ({ message: '' }),
  handleSubmit: async (
    values,
    { props: { onSubmit }, setSubmitting, resetForm }
  ) => {
    //if message doesnt exist dont submit
    if (!values.message || values.message.trim()) {
      setSubmitting(false);
    }
    await onSubmit(values.message);
    /*await mutate({
      variables: { channelId, text: values.message }
    });*/
    resetForm(false);
  }
})(SendMessage);
