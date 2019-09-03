import React from 'react';
import { graphql } from 'react-apollo';
import { findIndex } from 'lodash';
import decode from 'jwt-decode';
import AddChannelModal from '../components/addchannelmodal.js';
import Channels from '../components/channels.js';
import Teams from '../components/teams.js';
import { allTeamsQuery } from '../graphql/team.js';

class Sidebar extends React.Component {
  state = {
    openAddChannelModal: false
  };
  handleAddChannel = () => {
    console.log('handleaddchannel');
    this.setState(prevState => ({
      openAddChannelModal: !prevState.openAddChannelModal
    }));
  };
  render() {
    const {
      data: { loading, allTeams },
      currentTeamId
    } = this.props;
    if (loading) {
      return null;
    }
    console.log('currentTeamId: ', currentTeamId);

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
        teamId={team.id}
        channels={team.channels}
        addChannel={this.addChannel}
        users={[{ id: 1, name: 'slackbot' }, { id: 2, name: 'user1' }]}
        addChannel={this.handleAddChannel}
      />,
      <AddChannelModal
        key="addchannelmodal-sidebar"
        open={this.state.openAddChannelModal}
        teamId={parseInt(team.id, 10)}
        close={this.handleAddChannel}
      />
    ];
  }
}

export default graphql(allTeamsQuery)(Sidebar);
