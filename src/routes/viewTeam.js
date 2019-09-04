import React from 'react';
import Header from '../components/header.js';
import Messages from '../components/messages.js';
import AppLayout from '../components/applayout.js';
import SideBar from '../containers/sidebar.js';
import { Redirect } from 'react-router-dom';
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
  //if no teams exist redirect to create team
  if (!allTeams) {
    return <Redirect to="/createteam" />;
  }
  console.log('teamId: ', teamId);
  const teamIdInteger = parseInt(teamId, 10);
  const teamIdx = teamIdInteger
    ? findIndex(allTeams, ['id', teamIdInteger])
    : 0;
  const team = allTeams[teamIdx];
  const channelIdInteger = parseInt(channelId, 10);
  const channelIdx = channelIdInteger
    ? findIndex(team.channels, ['id', channelIdInteger])
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
      {channel && <Header channelName={channel.name} />}
      {channel && (
        <Messages channelId={channel.id}>
          <ul className="message-list">
            <li />
            <li />
          </ul>
        </Messages>
      )}
      {channel && <SendMessage channelName={channel.name} />}
    </AppLayout>
  );
};

export default graphql(allTeamsQuery)(ViewTeam);
