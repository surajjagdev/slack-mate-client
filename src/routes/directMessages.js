import React from 'react';
import Header from '../components/header.js';
import AppLayout from '../components/applayout.js';
import SideBar from '../containers/sidebar.js';
import DirectMessageContainer from '../containers/directMessageContainer.js';
import { Redirect } from 'react-router-dom';
import SendMessage from '../components/input.js';
import { findIndex } from 'lodash';
import { getUserQuery } from '../graphql/team.js';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { flowRight } from 'lodash';
const createDirectMessage = gql`
  mutation($receiverId: String!, $text: String!, $teamId: Int!) {
    createDirectMessage(receiverId: $receiverId, text: $text, teamId: $teamId)
  }
`;

const DirectMessages = ({
  mutate,
  data: { loading, getUser },
  match: {
    params: { teamId, userId }
  }
}) => {
  if (loading) {
    return null;
  }
  let teamsList = null;
  try {
    if (typeof getUser !== undefined) {
      teamsList = getUser.teams;
    }
  } catch (err) {
    return <Redirect to="/createteam" />;
  }
  const username = getUser.username;
  if (!teamsList.length) {
    return <Redirect to="/createteam" />;
  }
  //if no teams exist redirect to create team
  //merge all teams owned and teams invited to.
  const teamIdInteger = parseInt(teamId, 10); //--working
  const teamIdx = teamIdInteger
    ? findIndex(teamsList, ['id', teamIdInteger])
    : 0;
  console.log('teamIdx:', teamIdx);
  const team = teamIdx === -1 ? teamsList[0] : teamsList[teamIdx];
  return (
    <AppLayout>
      <SideBar
        teams={teamsList.map(t => ({
          id: t.id,
          name: t.name.charAt(0).toUpperCase()
        }))}
        team={team}
        userName={username}
      />
      <Header channelName={'placeholder user'} />
      <DirectMessageContainer teamId={parseInt(teamId, 10)} userId={userId} />
      <SendMessage
        placeholder={userId}
        onSubmit={async text => {
          const intTeamId = parseInt(teamId, 10);
          await mutate({
            variables: {
              text,
              receiverId: userId,
              teamId: intTeamId
            }
          });
        }}
      />
      />
    </AppLayout>
  );
};

export default flowRight(
  graphql(getUserQuery, {
    options: { fetchPolicy: 'network-only' }
  }),
  graphql(createDirectMessage)
)(DirectMessages);
