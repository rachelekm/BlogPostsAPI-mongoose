const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParse = bodyParser.json();

const {BlogPosts} = require('./models');

BlogPosts.create("Title1", "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", "Author1", "4/17/18");
BlogPosts.create("Title2", "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", "Author2", "4/17/18");
BlogPosts.create("Title3", "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", "Author3", "4/17/18");

router.get('/', (req, res) => {
	res.json(BlogPosts.get());
});

router.post('/', jsonParse, (req, res) => {
	const requiredFields = ["title", "content", "author", "publishDate"];
	for(let i=0; i<requiredFields.length; i++){
		if(!(requiredFields[i] in req.body)){
      		const message = `Missing \`${requiredFields[i]}\` in request body`
      		console.error(message);
      		return res.status(400).send(message);
		}
	}
	const item = BlogPosts.create(req.body.title, req.body.content, req.body.author, req.body.publishDate);
	return res.status(201).json(item);
});

router.put('/:id', jsonParse, (req, res) => {
	const requiredFields = ["id", "title", "content", "author", "publishDate"];
	for(let i=0; i<requiredFields.length; i++){
		if(!(requiredFields[i] in req.body)){
      		const message = `Missing \`${requiredFields[i]}\` in request body`;
      		console.error(message);
      		return res.status(400).send(message);
		}
	}
	if(req.body.id !== req.params.id){
      	const message = `Request path id (${req.params.id}) and request body id (${req.body.id}) must match`;
      	console.error(message);
      	return res.status(400).send(message);
	}
	const updatedObject = BlogPosts.update({
		id: req.params.id,
		title: req.body.title,
		content: req.body.content,
		author: req.body.author,
		publishDate: req.body.publishDate
	});
	res.status(204).end();
});

module.exports = router;
