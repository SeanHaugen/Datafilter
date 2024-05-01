const mongoose = require('mongoose');

const npcSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  ancestry: {
    type: String,
  },
  location: {
    type: String,
  },
  description: {
    type: String,
  },
  Shop_Owner: {
    type: Boolean,
  },
  items: {
    type: [String],
  }
});

const npcModel = mongoose.model('NPC_datas', npcSchema);


module.exports = npcModel;
