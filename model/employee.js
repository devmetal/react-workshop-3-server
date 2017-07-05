const mongoose = require('mongoose');

const { Schema } = mongoose;

const EmployeeSchema = new Schema({
  name: String,
  stack: [{
    type: Schema.Types.ObjectId,
    ref: 'technology',
  }],
});

EmployeeSchema.statics.findStack = function findStack(id) {
  return this.findById(id).populate('stack')
    .then(employeee => employeee.stack);
};

EmployeeSchema.methods.addTechnologies = function addTechnologies(...technologies) {
  this.stack.addToSet(...technologies);
  return this.save();
};

EmployeeSchema.methods.removeTechnologies = function removeTechnologies(...technologies) {
  this.stack.pull(...technologies);
  return this.save();
};

EmployeeSchema.methods.getProjects = function getProjects() {
  const model = mongoose.model('project');
  return model.find({ inthere: this._id });
};

mongoose.model('employee', EmployeeSchema);

module.exports = EmployeeSchema;
