//Dependencies
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CommentSchema = new Schema({
    //Comment
    title: {
        type: String
    },
    body: {
        type: String
    }
});

var Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;