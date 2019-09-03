import React from 'react';
import Header from '../components/header.js';
import Messages from '../components/messages.js';
import AppLayout from '../components/applayout.js';
import SideBar from '../containers/sidebar.js';
import SendMessage from '../components/input.js';
import { findIndex } from 'lodash';
import { graphql } from 'react-apollo';
import { allTeamsQuery } from '../graphql/team.js';

const ViewTeam = ({
  data: { loading, allTeams },
  match: {
    params: { teamId, channelId }
  }
}) => {
  if (loading) {
    return null;
  }
  const teamIdx = teamId
    ? findIndex(allTeams, ['id', parseInt(teamId, 10)])
    : 0;
  const team = allTeams[teamIdx];
  const channelIdx = channelId
    ? findIndex(team.channels, ['id', parseInt(channelId, 10)])
    : 0;
  const channel = team.channels[channelIdx];
  return (
    <AppLayout>
      <SideBar
        teams={allTeams.map(t => ({
          id: t.id,
          name: t.name.charAt(0).toUpperCase()
        }))}
        team={team}
      />
      <Header channelName={channel.name} />
      <Messages channelId={channel.id}>
        <ul className="message-list">
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </Messages>
      <SendMessage channelName={channel.name} />
    </AppLayout>
  );
};

export default graphql(allTeamsQuery)(ViewTeam);
