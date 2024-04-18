const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true
  },
  Location: {
    type: String,
    required: true
  },
  Description: {
    type: String,
    required: true
  },
  village: {
    type: Boolean,
    required: true
  },
  Town: {
    type: Boolean,
    required: true
  },
  City: {
    type: Boolean,
    required: true
  },
  shop: {
    type: Boolean,
    required: true
  },
  shops: {
    type: [String],
    required: true
  },
  Dungeon: {
    type: Boolean,
    required: true
  },
  Cave: {
    type: Boolean,
    required: true
  },
  Interesting_site: {
    type: Boolean,
    required: true
  },
  npc_location: {
    type: Boolean,
    required: true
  },
  castle: {
    type: Boolean,
    required: true
  },
  domain: {
    type: Boolean,
    required: true
  },
  npcs: {
    type: [String],
    required: true
  }
});

const Location = mongoose.model('Location', locationSchema);

module.exports = Location;
