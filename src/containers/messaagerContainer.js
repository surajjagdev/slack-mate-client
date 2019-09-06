import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import MessageContainerClass from './messageContainerClass.js';
const messagesQuery = gql`
  query($channelId: Int!) {
    messages(channelId: $channelId) {
      id
      text
      user {
        username
      }
      createdAt
    }
  }
`;
const MessageContainer = props => {
  console.log(props);
  return (
    <Query query={messagesQuery} variables={{ channelId: props.channelId }}>
      {({ data, loading, subscribeToMore }) => {
        if (!data) {
          return null;
        }

        if (loading) {
          return <span>Loading ...</span>;
        }

        return (
          <MessageContainerClass
            messages={data.messages}
            subscribeToMore={subscribeToMore}
            channelId={props.channelId}
          />
        );
      }}
    </Query>
  );
};
export default MessageContainer;
