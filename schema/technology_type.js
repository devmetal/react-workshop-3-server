const graphql = require('graphql');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
} = graphql;

const TechnologyType = new GraphQLObjectType({
  name: 'Technology',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    logo: { type: GraphQLString },
    usedIn: {
      type: new GraphQLList(require('./project_type')),
      resolve(parentValue) {
        return parentValue.getProjects();
      },
    },
    usedBy: {
      type: new GraphQLList(require('./employee_type')),
      resolve(parentValue) {
        return parentValue.getUsers();
      },
    },
  }),
});

module.exports = TechnologyType;
