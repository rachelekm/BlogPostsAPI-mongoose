const express = require('express');
const router = express.Router();
//const uuid = require('uuid');
const bodyParser = require('body-parser');
const jsonParse = bodyParser.json();

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const {BlogPosts} = require('./models');

router.get('/', (req, res) => {
	BlogPosts.find().then(blogposts => {
		res.json({blogposts: 
			blogposts.map((post) => post.serialize())
		});
	})
	.catch(err => {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    });
});

router.get('/:id', (req, res) => {
	BlogPosts.findByID(req.body.id)
	.then((post) => res.json(post.serialize()))
	.catch(err => {
		console.log(err);
      	res.status(500).json({ message: 'Internal server error' });
	});
});

router.post('/', jsonParse, (req, res) => {
	const requiredFields = ["title", "content", "author"];
	for(let i=0; i<requiredFields.length; i++){
		if(!(requiredFields[i] in req.body)){
      		const message = `Missing \`${requiredFields[i]}\` in request body`
      		console.error(message);
      		res.status(400).send(message);
		}
	}
	BlogPosts.create( {
		title: req.body.title,
		author: {firstName: req.body.author.firstName, lastName: req.body.author.lastName},
		content: req.body.content
		}
	)
	.then(post => res.status(201).json(post.serialize()))
	.catch(err => {
		console.log(err);
      	res.status(500).json({ message: 'Internal server error' });
	});
});

router.put('/:id', jsonParse, (req, res) => {
	const requiredFields = ["id", "title", "content", "author"];
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
	BlogPosts.findByIdAndUpdate(req.params.id,
		{title: req.body.title,
		content: req.body.content,
		author: req.body.author}, 
		{upsert: true, new: true})
	.then(post => res.status(204).end())
	.catch(err => {
		console.log(err);
		res.status(500).json({message: 'Internal server error'})
	});
});

router.delete('/:id', (req, res) => {
  BlogPosts.findByIdAndRemove(req.params.id)
  .then(post => {
  console.log(`Deleted blog post ID: ${req.params.id}`);
  res.status(204).end();
  })
  .catch(err => {
  	console.log(err);
  	res.status(500).json({message: 'Internal server error'})
  });
});

module.exports = router;
