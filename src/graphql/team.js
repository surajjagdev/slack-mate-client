import gql from 'graphql-tag';
export const allTeamsQuery = gql`
  {
    allTeams {
      id
      name
      channels {
        id
        name
      }
    }
    teamInvitedTo {
      id
      name
      channels {
        id
        name
      }
    }
  }
`;
