export const typeDef = /* GraphQL */`
    type Query {
        user: User
    }

    type Mutation {
      createUser(user: newUserInput!): User
    }

    input newUserInput {
      name: String!
      age: Int!
    }

    type User {
        id: Int
        name: String
        age: Int
    }
`;

export const resolvers = {
  Query: {
    user: () => {
      return {
        id: 1,
        name: 'Juanix',

      }
    }
  },
  Mutation: {
    createUser: (_, { user }) => {
      return {
        id: 1,
        ...user
      }
    }
  },
  User: {
    name: (obj) => {
      return obj.name.toUpperCase();
    }
  }
};
