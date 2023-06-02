import gql from 'graphql-tag';

export const createUserMutation = gql`
  mutation CreateUser($user_id: ID!, $email: String!, $first_name: String!, $last_name: String!, $time_created: AWSDateTime!) {
    createUser(input: { user_id: $id, email: $email, first_name: $first_name, last_name: $last_name, time_created: $time_created }) {
      user_id
      email
      first_name
      last_name
      time_created
    }
  }
`;
