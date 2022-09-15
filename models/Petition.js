const mongoose = require('mongoose');

const PetitionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String
  },
  address: {
    type: String,
    required: true
  },
  interests: {
    type: String
  },
  actionType: {
    // Users will pick from Commence new rulemaking, Amendment of existing rule, or Deregulation
    type: String,
    required: true
  },
  actionPurpose: {
    // What's the purpose of the users' adding/changing/deregulating? Why do they want to add/change/delete?
    type: String
  },
  actionChanges: {
    // What do you want to change in the existing rule?
    type: String
  },
  actionInterest: {
    // How will this change/addition/deletion benefit the people?
    type: String
  },
  actionSupport: {
    // Technical documentation, scientific research, or more technical information
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Petition = mongoose.model('petition', PetitionSchema);
