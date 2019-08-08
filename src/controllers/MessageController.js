'use strict';

const Message = require('../models/MessageSchema');

exports.list = function(room) {
  return Message.find({
    room: room
  }).exec();
}

exports.save = function(msg) {
  const newMessage = new Message({
    content: msg.content,
    room: msg.room,
    sender: 'Anonymous',
  });
  return newMessage.save();
}

exports.update = function(msg) {
  return Message.findById(msg.id).exec().then((original) => {
    const newMessage = Object.assign(original, msg);
    return newMessage.save();
  });
}

exports.delete = function(msg) {
  return Message.deleteOne({
    _id: msg.id
  }).exec();
}
