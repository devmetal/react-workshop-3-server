const graphql = require('graphql');
const mongoose = require('mongoose');
const ProjectType = require('./project_type');
const EmployeeType = require('./employee_type');
const TechnologyType = require('./technology_type');

const projectModel = mongoose.model('project');
const employeeModel = mongoose.model('employee');
const technologyModel = mongoose.model('technology');

const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLID,
  GraphQLList,
  GraphQLString,
} = graphql;

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    projects: {
      type: new GraphQLList(ProjectType),
      resolve() {
        return projectModel.find({});
      },
    },
    project: {
      type: ProjectType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parentValue, { id }) {
        return projectModel.findById(id);
      },
    },
    searchProject: {
      type: new GraphQLList(ProjectType),
      args: {
        name: { type: GraphQLString },
      },
      resolve(parentValue, { name }) {
        return projectModel.searchByName(name);
      },
    },
    employees: {
      type: new GraphQLList(EmployeeType),
      resolve() {
        return employeeModel.find({});
      },
    },
    employee: {
      type: EmployeeType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parentValue, { id }) {
        return employeeModel.findById(id);
      },
    },
    technologies: {
      type: new GraphQLList(TechnologyType),
      resolve() {
        return technologyModel.find({});
      },
    },
    technology: {
      type: TechnologyType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parentValue, { id }) {
        return technologyModel.findById(id);
      },
    },
  }),
});

module.exports = RootQuery;
