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
        channels {
          id
          name
        }
      }
    }
  }
`;
