import React from 'react';
import Messages from '../components/messages.js';
import gql from 'graphql-tag';
import { Comment } from 'semantic-ui-react';
import FileUpload from '../components/fileupload.js';
import RenderText from '../components/rendertext.js';
const newChannelMessageSubscription = gql`
  subscription($channelId: Int!) {
    newChannelMessage(channelId: $channelId) {
      id
      text
      user {
        username
      }
      url
      filetype
      createdAt
    }
  }
`;
const MessageDetect = ({ message: { url, text, filetype } }) => {
  if (url) {
    if (filetype.startsWith('image/')) {
      return <img src={url} alt="" />;
    } else if (filetype === 'text/plain') {
      return <RenderText url={url} />;
    } else if (filetype.startsWith('audio/')) {
      return (
        <div>
          <audio controls>
            <source src={url} type={filetype} />
          </audio>
        </div>
      );
    } else if (filetype.startsWith('video/')) {
      return (
        <div>
          <video style={{ maxWidth: '320px', maxHeight: '240px' }} controls>
            <source src={url} type={filetype} />
          </video>
        </div>
      );
    }
  }
  return <Comment.Text>{text}</Comment.Text>;
};
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
        <FileUpload channelId={this.props.channelId} disableClick={true}>
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
                  <MessageDetect message={message} />
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
