const graphql = require('graphql');
const mongoose = require('mongoose');
const EmployeeType = require('./employee_type');
const ProjectType = require('./project_type');
const TechnologyType = require('./technology_type');

const EmployeeModel = mongoose.model('employee');
const ProjectModel = mongoose.model('project');
const TechnologyModel = mongoose.model('technology');

const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLID,
} = graphql;

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addProject: {
      type: ProjectType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parentValue, { name }) {
        return ProjectModel.create({ name });
      },
    },
    assignTechnology: {
      type: EmployeeType,
      args: {
        employeeId: { type: new GraphQLNonNull(GraphQLID) },
        technologyId: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parentValue, { employeeId, technologyId }) {
        return EmployeeModel.findById(employeeId)
          .then(employee => employee.addTechnologies(technologyId));
      },
    },
    unassignTechnology: {
      type: EmployeeType,
      args: {
        employeeId: { type: new GraphQLNonNull(GraphQLID) },
        technologyId: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parentValue, { employeeId, technologyId }) {
        return EmployeeModel.findById(employeeId)
          .then(employee => employee.removeTechnologies(technologyId));
      },
    },
  },
});

module.exports = mutation;
