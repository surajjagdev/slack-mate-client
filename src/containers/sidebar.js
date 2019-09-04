import React from 'react';
import decode from 'jwt-decode';
import AddChannelModal from '../components/addchannelmodal.js';
import InviteMateModal from '../components/invitematemodal.js';
import Channels from '../components/channels.js';
import Teams from '../components/teams.js';

export default class Sidebar extends React.Component {
  state = {
    openAddChannelModal: false,
    openAddInviteModal: false
  };
  handleAddChannel = e => {
    if (e) {
      e.preventDefault();
    }
    this.setState(prevState => ({
      openAddChannelModal: !prevState.openAddChannelModal
    }));
  };
  handleInviteMate = e => {
    if (e) {
      e.preventDefault();
    }
    this.setState(prevState => ({
      openAddInviteModal: !prevState.openAddInviteModal
    }));
  };
  render() {
    const { teams, team } = this.props;
    let username = '';
    try {
      const token = localStorage.getItem('token');
      const { user } = decode(token);
      username = user.username;
    } catch (err) {
      console.log('err: ', err);
    }

    return [
      <Teams key="team-sidebar" teams={teams} />,
      <Channels
        key="channels-sidebar"
        teamName={team.name}
        userName={username}
        teamId={team.id}
        channels={team.channels}
        users={[{ id: 1, name: 'slackbot' }, { id: 2, name: 'user1' }]}
        addChannel={this.handleAddChannel}
        handleInviteMate={this.handleInviteMate}
      />,
      <AddChannelModal
        key="addchannelmodal-sidebar"
        open={this.state.openAddChannelModal}
        teamId={parseInt(team.id, 10)}
        close={this.handleAddChannel}
      />,
      <InviteMateModal
        key="invitematemodal-sidebar"
        open={this.state.openAddInviteModal}
        teamId={parseInt(team.id, 10)}
        close={this.handleInviteMate}
      />
    ];
  }
}
