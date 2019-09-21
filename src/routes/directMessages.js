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
const directMessageAndMeQuery = gql`
  query($userId: String!) {
    getMessagedUser(userId: $userId) {
      username
    }
    getUser {
      id
      username
      teams {
        id
        name
        admin
        directMessageMembers {
          id
          username
        }
        channels {
          id
          name
        }
      }
    }
  }
`;

const DirectMessages = ({
  mutate,
  data: { loading, getUser, getMessagedUser },
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
  const currentUserId = getUser.id;
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
        currentUserId={currentUserId}
        userName={username}
      />
      <Header channelName={getMessagedUser.username} />
      <DirectMessageContainer teamId={parseInt(teamId, 10)} userId={userId} />
      <SendMessage
        placeholder={userId}
        onSubmit={async text => {
          const response = await mutate({
            variables: {
              text,
              receiverId: userId,
              teamId: parseInt(teamId, 10)
            },
            optimisticResponse: {
              createDirectMessage: true
            },
            update: store => {
              const data = store.readQuery({ query: getUserQuery });
              const teamIdx2 = findIndex(data.getUser.teams, ['id', team.id]);
              const notAlreadyThere = data.getUser.teams[
                teamIdx2
              ].directMessageMembers.every(member => member.id !== userId);
              if (notAlreadyThere) {
                data.getUser.teams[teamIdx2].directMessageMembers.push({
                  __typename: 'User',
                  id: userId,
                  username: getMessagedUser.username
                });
                store.writeQuery({ query: getUserQuery, data });
              }
            }
          });
          console.log(response);
        }}
      />
    </AppLayout>
  );
};

export default flowRight(
  graphql(directMessageAndMeQuery, {
    options: props => ({
      variables: { userId: props.match.params.userId },
      fetchPolicy: 'network-only'
    })
  }),
  graphql(createDirectMessage)
)(DirectMessages);
