import { createSchema } from 'graphql-yoga';
import _ from 'lodash';
import { typeDef as User, resolvers as userResolvers } from '../../models/user.js';

export const queries = createSchema({
  typeDefs: /* GraphQL */ `
    type Query {
      hello: String
    }
  `,
});

const resolvers = {
  Query: {
    hello: () => 'Juan',
  },
};

export const schema = createSchema({
  typeDefs: [queries, User],
  resolvers: _.merge(resolvers, userResolvers)
});
