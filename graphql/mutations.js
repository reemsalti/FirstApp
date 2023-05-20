import gql from 'graphql-tag';

export const createUserMutation = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      id
      email
      # Add additional fields as needed
    }
  }
`;
