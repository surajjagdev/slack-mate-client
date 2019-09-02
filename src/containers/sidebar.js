import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { findIndex } from 'lodash';
import decode from 'jwt-decode';

import Channels from '../components/channels.js';
import Teams from '../components/teams.js';

const Sidebar = ({ data: { loading, allTeams }, currentTeamId }) => {
  if (loading) {
    return null;
  }
  const teamIdx = currentTeamId
    ? findIndex(allTeams, ['id', parseInt(currentTeamId, 10)])
    : 0;
  const team = allTeams[teamIdx];
  console.log('team: ', team);
  let username = '';
  try {
    const token = localStorage.getItem('token');
    const { user } = decode(token);
    username = user.username;
    console.log(username);
  } catch (err) {
    console.log('err: ', err);
  }

  return [
    <Teams
      key="team-sidebar"
      teams={allTeams.map(t => ({
        id: t.id,
        name: t.name.charAt(0).toUpperCase()
      }))}
    />,
    <Channels
      key="channels-sidebar"
      teamName={team.name}
      userName={username}
      channels={team.channels}
      users={[{ id: 1, name: 'slackbot' }, { id: 2, name: 'user1' }]}
    />
  ];
};

const allTeamsQuery = gql`
  {
    allTeams {
      id
      name
      channels {
        id
        name
      }
    }
  }
`;

export default graphql(allTeamsQuery)(Sidebar);
