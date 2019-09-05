import React from 'react';
import Messages from '../components/messages.js';

const MessageContainer = ({ channelId }) => (
  <Messages channelId={channelId}>
    <ul className="message-list">
      <li />
      <li />
    </ul>
  </Messages>
);

export default MessageContainer;
