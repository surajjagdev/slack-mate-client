import React from 'react';
import Messages from '../components/messages.js';
import gql from 'graphql-tag';
import { Comment } from 'semantic-ui-react';
const newChannelMessageSubscription = gql`
  subscription($channelId: Int!) {
    newChannelMessage(channelId: $channelId) {
      id
      text
      user {
        username
      }
      createdAt
    }
  }
`;

class MessageContainerClass extends React.Component {
  componentDidMount() {
    this.subscribe(this.props.channelId);
  }
  subscribe = channelId => {
    this.props.subscribeToMore({
      document: newChannelMessageSubscription,
      variables: {
        channelId: channelId
      },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData) {
          return prev;
        }
        //return concat of messages available and new messages
        return {
          ...prev,
          messages: [...prev.messages, subscriptionData.data.newChannelMessage]
        };
      }
    });
  };
  render() {
    return (
      <Messages>
        <Comment.Group>
          {this.props.messages.map(message => (
            <Comment key={`message-${message.id}`}>
              <Comment.Content>
                <Comment.Author as="a">{message.user.username}</Comment.Author>
                <Comment.Metadata>
                  <div>{message.createdAt}</div>
                </Comment.Metadata>
                <Comment.Text>{message.text}</Comment.Text>
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
export default MessageContainerClass;
