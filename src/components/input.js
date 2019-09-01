import React from 'react';
import styled from 'styled-components';
import { Input } from 'semantic-ui-react';
const InputWrapper = styled.div`
  background-color: #362234;
  grid-row: 3;
  grid-column: 3;
  margin: 20px;
  color: 'black';
`;

export default ({ channelName }) => {
  return (
    <InputWrapper>
      <Input fluid placeholder={`Message #${channelName || 'fill'}`} />
    </InputWrapper>
  );
};
