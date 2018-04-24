const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParse = bodyParser.json();

const {BlogPosts} = require('./models');

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

router.delete('/:id', (req, res) => {
  const itemID = req.params.id;
  BlogPosts.delete(itemID);
  console.log(`Deleted blog post ID: \`${itemID}\``);
  res.status(204).end();
});

module.exports = router;
