import gql from 'graphql-tag';
export const getUserQuery = gql`
  {
    getUser {
      id
      username
      teams {
        id
        admin
        name
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
export const getTeamMembersQuery = gql`
  query($teamId: Int!) {
    getTeamMembers(teamId: $teamId) {
      id
      username
    }
  }
`;
