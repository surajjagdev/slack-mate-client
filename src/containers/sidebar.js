import React from 'react';
import decode from 'jwt-decode';
import AddChannelModal from '../components/addchannelmodal.js';
import Channels from '../components/channels.js';
import Teams from '../components/teams.js';

export default class Sidebar extends React.Component {
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
    const { teams, team } = this.props;
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
      <Teams key="team-sidebar" teams={teams} />,
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
