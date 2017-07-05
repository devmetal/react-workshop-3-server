const graphql = require('graphql');
const mongoose = require('mongoose');
const TechnologyType = require('./technology_type');

const EmployeeModel = mongoose.model('employee');

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLList,
  GraphQLString,
} = graphql;

const EmployeeType = new GraphQLObjectType({
  name: 'Employee',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    stack: {
      type: new GraphQLList(TechnologyType),
      resolve(parentValue) {
        return EmployeeModel.findStack(parentValue._id);
      },
    },
    projects: {
      type: new GraphQLList(require('./project_type')),
      resolve(parentValue) {
        return parentValue.getProjects();
      },
    },
  }),
});

module.exports = EmployeeType;
