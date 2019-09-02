import React from 'react';
import Header from '../components/header.js';
import Messages from '../components/messages.js';
import AppLayout from '../components/applayout.js';
import SideBar from '../containers/sidebar.js';
import SendMessage from '../components/input.js';

export default () => {
  return (
    <AppLayout>
      <SideBar currentTeamId={8} />
      <Header channelName="announcements" />
      <Messages>
        <ul className="message-list">
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </Messages>
      <SendMessage>
        <input type="text" placeholder="dd" />
      </SendMessage>
    </AppLayout>
  );
};
