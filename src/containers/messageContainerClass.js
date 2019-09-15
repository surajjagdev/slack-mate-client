import React from 'react';
import Messages from '../components/messages.js';
import gql from 'graphql-tag';
import { Comment } from 'semantic-ui-react';
import FileUpload from '../components/fileupload.js';
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
  componentDidUpdate(prevProps) {
    if (this.props.channelId !== prevProps.channelId) {
      this.subscribe(this.props.channelId);
    } else {
      console.log('nothing changed');
    }
  }
  unsubscribe = channelId => {
    return this.subscribe(channelId);
  };
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
        const idAlreadyExists =
          prev.messages.filter(item => {
            return item.id === subscriptionData.data.newChannelMessage.id;
          }).length > 0;
        if (!idAlreadyExists) {
          return {
            ...prev,
            messages: [
              ...prev.messages,
              subscriptionData.data.newChannelMessage
            ]
          };
        }
        //return concat of messages available and new messages
      }
    });
  };

  /*componentDidUpdate(prevProps) {
    if (prevProps.channelId !== this.props.channelId) {
      this.subscribe(this.props.channelId);
    }
  }*/
  render() {
    return (
      <Messages>
        <FileUpload disableClick={true}>
          <Comment.Group>
            {this.props.messages.map(message => (
              <Comment key={`message-${message.id}`}>
                <Comment.Content>
                  <Comment.Author as="a">
                    {message.user.username}
                  </Comment.Author>
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
        </FileUpload>
      </Messages>
    );
  }
}
export default MessageContainerClass;
