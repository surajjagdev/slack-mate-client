import gql from 'graphql-tag';
export const allTeamsQuery = gql`
  {
    allTeams {
      id
      owner
      name
      channels {
        id
        name
      }
    }
    teamInvitedTo {
      id
      owner
      name
      channels {
        id
        name
      }
    }
  }
`;
