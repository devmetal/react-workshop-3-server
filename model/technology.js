const mongoose = require('mongoose');

const { Schema } = mongoose;

const TechnolonySchema = new Schema({
  name: String,
  logo: {
    type: String,
    default: '',
  },
});

TechnolonySchema.methods.getProjects = function getProjects() {
  const model = mongoose.model('project');
  return model.find({ required: this._id });
};

TechnolonySchema.methods.getUsers = function getUsers() {
  const model = mongoose.model('employee');
  return model.find({ stack: this._id });
};

mongoose.model('technology', TechnolonySchema);

module.exports = TechnolonySchema;
