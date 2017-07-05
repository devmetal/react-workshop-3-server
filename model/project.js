const mongoose = require('mongoose');

const { Schema } = mongoose;

const ProjectSchema = new Schema({
  name: String,
  required: [{
    type: Schema.Types.ObjectId,
    ref: 'technology',
    default: [],
  }],
  inthere: [{
    type: Schema.Types.ObjectId,
    ref: 'employee',
    default: [],
  }],
});

ProjectSchema.statics.findByName = function findByName(name) {
  return this.findOne({ name });
};

ProjectSchema.statics.searchByName = function searchByName(name) {
  return this.find({ name: { $regex: name, $options: 'i' } });
};

ProjectSchema.statics.findRequirements = function findRequirements(id) {
  return this.findById(id).populate('required')
    .then(project => project.required);
};

ProjectSchema.statics.findEmployees = function findEmployees(id) {
  return this.findById(id).populate('inthere')
    .then(project => project.inthere);
};

ProjectSchema.methods.addEmployees = function addEmployees(...employees) {
  this.inthere.push(...employees);
  return this.save();
};

ProjectSchema.methods.addRequirements = function addRequirements(...technologies) {
  this.required.push(...technologies);
  return this.save();
};

mongoose.model('project', ProjectSchema);

module.exports = ProjectSchema;
