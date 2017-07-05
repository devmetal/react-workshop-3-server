const graphql = require('graphql');
const RootQueryType = require('./root_query_type');
const RootMutation = require('./root_mutation_type');

const { GraphQLSchema } = graphql;

module.exports = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutation,
});
