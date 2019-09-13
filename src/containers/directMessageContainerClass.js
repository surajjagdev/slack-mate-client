import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Comment } from 'semantic-ui-react';
import Messages from '../components/messages.js';

const newDirectMessageSubscription = gql`
  subscription($teamId: Int!, $userId: String!) {
    newDirectMessage(teamId: $teamId, userId: $userId) {
      id
      sender {
        username
      }
      text
      createdAt
    }
  }
`;
class DirectMessageContainerClass extends React.Component {
  componentDidMount() {
    this.subscribe(this.props.teamId, this.props.userId);
  }
  componentDidUpdate(prevProps) {
    if (this.props.userId !== prevProps.userId) {
      this.subscribe(this.props.teamId, this.props.userId);
    } else {
      console.log('nothing changed');
    }
  }
  unsubscribe = (teamId, userId) => {
    return this.subscribe(teamId, userId);
  };
  subscribe = (teamId, userId) => {
    this.props.subscribeToMore({
      document: newDirectMessageSubscription,
      variables: {
        teamId,
        userId
      },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData) {
          return prev;
        }
        console.log(subscriptionData.data.newDirectMessage);
        console.log('subscriptionData: ', subscriptionData);
        const idAlreadyExists =
          prev.directMessages.filter(item => {
            return item.id === subscriptionData.data.newDirectMessage.id;
          }).length > 0;
        //if (!idAlreadyExists) {
        return {
          ...prev,
          directMessages: [
            ...prev.directMessages,
            subscriptionData.data.newDirectMessage
          ]
        };
        //}
        //return concat of messages available and new messages
      }
    });
  };
  render() {
    return (
      <Messages>
        <Comment.Group>
          {this.props.directMessages.map(m => (
            <Comment key={`${m.id}-direct-message`}>
              <Comment.Content>
                <Comment.Author as="a">{m.sender.username}</Comment.Author>
                <Comment.Metadata>
                  <div>{m.createdAt}</div>
                </Comment.Metadata>
                <Comment.Text>{m.text}</Comment.Text>
                <Comment.Actions>
                  <Comment.Action>Reply</Comment.Action>
                </Comment.Actions>
              </Comment.Content>
            </Comment>
          ))}
        </Comment.Group>
      </Messages>
    );
  }
}

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

export default DirectMessageContainerClass;
