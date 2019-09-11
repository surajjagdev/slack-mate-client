import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Comment } from 'semantic-ui-react';
import Messages from '../components/messages.js';

class DirectMessageContainer extends React.Component {
  /*componentDidMount() {
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
*/
  render() {
    const {
      data: { loading, directMessages }
    } = this.props;
    console.log(directMessages);
    return loading ? null : (
      <Messages>
        <Comment.Group>
          {directMessages.map(m => (
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

export default graphql(directMessagesQuery, {
  variables: props => ({
    teamId: props.teamId,
    otherUserId: props.userId
  }),
  options: {
    fetchPolicy: 'network-only'
  }
})(DirectMessageContainer);
