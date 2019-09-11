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
