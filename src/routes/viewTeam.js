import React from 'react';
import Header from '../components/header.js';
import Messages from '../components/messages.js';
import AppLayout from '../components/applayout.js';
import SideBar from '../containers/sidebar.js';
import SendMessage from '../components/input.js';

const ViewTeam = ({ match: { params } }) => {
  return (
    <AppLayout>
      <SideBar currentTeamId={params.teamId} />
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

export default ViewTeam;
