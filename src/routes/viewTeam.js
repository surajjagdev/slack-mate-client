import React from 'react';
import Channels from '../components/channels.js';
import Header from '../components/header.js';
import Messages from '../components/messages.js';
import AppLayout from '../components/applayout.js';
import Teams from '../components/teams.js';
import SendMessage from '../components/input.js';

export default () => {
  return (
    <AppLayout>
      <Teams teams={[{ id: 1, name: 'T' }, { id: 2, name: 'B' }]} />
      <Channels
        teamName="testTeam"
        userName="username"
        channels={[{ id: 1, name: 'general' }, { id: 2, name: 'random' }]}
        users={[{ id: 1, name: 'slackbot' }, { id: 2, name: 'tester1' }]}
      />
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
