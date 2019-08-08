const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema(
  {
    content: { type: String },
    sender: { type: String },
    room: { type: String }
  },
  {
    timestamps: true
  }
);

let Message = mongoose.model('Message', messageSchema);
module.exports = Message;
