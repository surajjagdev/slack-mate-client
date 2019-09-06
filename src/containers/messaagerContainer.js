import React from 'react';
import Messages from '../components/messages.js';
import { graphql } from 'react-apollo';
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
class MessageContainer extends React.Component {
  componentDidUpdate(prevProps) {
    //when updating
    //available through graphql apollo
    this.props.data.subscribeToMore({
      document: newChannelMessageSubscription,
      variables: {
        channelId: this.props.channelId
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
  }
  render() {
    const {
      data: { loading, messages }
    } = this.props;
    return loading ? null : (
      <Messages>
        <Comment.Group>
          {messages.map(message => (
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
export default graphql(messagesQuery, {
  variables: props => ({
    channelId: props.channelId
  })
})(MessageContainer);
