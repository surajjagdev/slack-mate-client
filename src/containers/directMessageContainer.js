import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import DirectMessageContainerClass from './directMessageContainerClass.js';
const directMessagesQuery = gql`
  query($teamId: Int!, $userId: String!) {
    directMessages(teamId: $teamId, otherUserId: $userId) {
      id
      sender {
        username
      }
      text
      createdAt
    }
  }
`;
const DirectMessageContainer = props => {
  console.log(props);
  return (
    <Query
      query={directMessagesQuery}
      variables={{
        teamId: props.teamId,
        userId: props.userId
      }}
      fetchPolicy="network-only"
    >
      {({ data, loading, subscribeToMore }) => {
        if (!data) {
          return null;
        }

        if (loading) {
          return <span>Loading ...</span>;
        }

        return (
          <DirectMessageContainerClass
            directMessages={data.directMessages}
            subscribeToMore={subscribeToMore}
            teamId={props.teamId}
            userId={props.userId}
          />
        );
      }}
    </Query>
  );
};
export default DirectMessageContainer;
