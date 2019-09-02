import React from 'react';
import styled from 'styled-components';
import { Icon } from 'semantic-ui-react';
const ChannelWrapper = styled.div`
  grid-column: 2;
  grid-row: 1/4;
  background-color: #4e3a4c;
  color: #958993;
`;
//team header white
const TeamNameHeader = styled.h1`
  color: #fff;
  font-size: 20px;
`;
const paddingLeft = 'padding-left: 10px';
const SideBarListItem = styled.li`
  padding: 2px;
  ${paddingLeft};
  &:hover {
    background: #3e313c;
  }
`;
//no list decoration, full width of parent and taking off padding-left
const SideBarList = styled.ul`
  width: 100%;
  list-style: none;
  padding-left: 0px;
`;
//pads it left 10px;
const SideBarListHeader = styled.li`
  ${paddingLeft};
`;
//pads it left 10px;
const PushLeft = styled.div`
  ${paddingLeft};
`;

const Blue = styled.span`
  color: #38978d;
`;

const OnlineBubble = ({ on = true }) => (on ? <Blue>●</Blue> : '○');
const channel = ({ id, name }) => {
  return <li key={`channel-${id}`}>{`# ${name}`}</li>;
};

const user = ({ id, name }) => (
  <SideBarListItem key={`user-${id}`}>
    <OnlineBubble /> {name}
  </SideBarListItem>
);
export default ({ teamName, userName, channels, users, addChannel }) => {
  console.log(teamName, userName, channels, users);
  return (
    <ChannelWrapper>
      <PushLeft>
        <TeamNameHeader>{teamName}</TeamNameHeader>
        {userName}
      </PushLeft>
      <div>
        <SideBarList>
          <SideBarListHeader>
            Channels <Icon name="add circle" onClick={addChannel} />
          </SideBarListHeader>
          {channels.map(channel)}
        </SideBarList>
      </div>
      <div>
        <SideBarList>
          <SideBarListHeader>Direct Messages</SideBarListHeader>
          {users.map(user)}
        </SideBarList>
      </div>
    </ChannelWrapper>
  );
};
