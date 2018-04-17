const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParse = bodyParser.json();

const {BlogPosts} = require('./models');

BlogPosts.create("Title1", "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", "Author1", "4/17/18");
BlogPosts.create("Title2", "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", "Author2", "4/17/18");
BlogPosts.create("Title3", "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", "Author3", "4/17/18");
