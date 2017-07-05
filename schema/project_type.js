const graphql = require('graphql');
const mongoose = require('mongoose');
const EmployeeType = require('./employee_type');
const TechnologyType = require('./technology_type');

const ProjectModel = mongoose.model('project');

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList,
} = graphql;

const ProjectType = new GraphQLObjectType({
  name: 'Project',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    required: {
      type: new GraphQLList(TechnologyType),
      resolve(parentValue) {
        return ProjectModel.findRequirements(parentValue._id);
      },
    },
    inthere: {
      type: new GraphQLList(EmployeeType),
      resolve(parentValue) {
        return ProjectModel.findEmployees(parentValue._id);
      },
    },
  }),
});

module.exports = ProjectType;
