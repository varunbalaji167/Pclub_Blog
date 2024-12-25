// models/teamModel.js
const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  instagram: {
    type: String,
    required: true,
  },
  linkedin: {
    type: String,
    required: true,
  },
  github: {
    type: String,
    required: false, // Optional
  },
  image: {
    type: String,
    required: true,
  },
});

const Team = mongoose.model('Team', teamSchema);

module.exports = Team;