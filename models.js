'use strict';

//const uuid = require('uuid');
const mongoose = require('mongoose');

const blogPostSchema = mongoose.Schema({
  title: String,
  author: {firstName: String, lastName: String},
  content: String,
});

blogPostSchema.virtual('authorString').get(function() {
  return `${this.author.firstName} ${this.author.lastName}`;
});

blogPostSchema.methods.serialize = function() {
  return {
    title: this.title,
    content: this.content,
    author: this.authorString,
    created: this._id,
  };
}

const BlogPosts = mongoose.model('BlogPosts', blogPostSchema);
module.exports = {BlogPosts};