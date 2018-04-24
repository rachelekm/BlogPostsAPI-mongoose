'use strict';

//const uuid = require('uuid');
const mongoose = require('mongoose');

const blogPostSchema = mongoose.Schema({
  title: String,
  author: {firstName: String, lastName: String},
  content: String,
});

blogPostSchema.virtual('authorString').get(function() {
  return `${author.firstName} ${author.lastName}`;
});

blogPostSchema.methods.serialize = function() {
  return {
    title: this.title,
    content: this.content,
    author: this.authorString,
    created: this._id,
  };
}

const BlogPosts = mongoose.model('blogPost', blogPostSchema);
module.exports = {BlogPosts};