const chai = require('chai');
const chaiHttp = require('chai-http');

const {app, runServer, closeServer} = require('../server');

const expect = chai.expect;
chai.use(chaiHttp);

describe('Blog Post', function() {
	before(function(){
		return runServer();
	});

	after(function() {
		return closeServer();
	});

	it('should get blog posts on GET', function() {
		return chai.request(app).get('/blog-posts').then(function(res){
			expect(res).to.have.status(200);
			expect(res).to.be.json;
			expect(res.body).to.be.a('array');
			expect(res.body.length).to.be.at.least(1);
			const expectedKeys = ["id", "title", "content", "author", "publishDate"];
			res.body.forEach(function(object) {
				expect(object).to.include.keys(expectedKeys);
			});
		});
	});

	it('should create blog post on POST', function() {
		const newObject = {title: "Title1", 
		content: "Lorem ipsum dolor sit amet.", 
		author: "Author1", 
		publishDate: "4/17/18"};
		return chai.request(app).post('/blog-posts').send(newObject).then(function(res){
			expect(res).to.be.status(201);
			expect(res).to.be.json;
			expect(res.body).to.be.a('object');
			expect(res.body).to.include.keys("id", "title", "content", "author", "publishDate");
			expect(res.body.id).to.not.equal(null);
			expect(res.body).to.deep.equal(Object.assign(newObject, {id: res.body.id}));
		});
	});

	it('should update blog post on PUT', function() {
		return chai.request(app).get('/blog-posts').then(function(res){
			const objectID = res.body[0].id;
			const objectUpdates = {id: objectID, 
				title: res.body[0].title, 
				content: "Lorem ipsum dolor sit amet.", 
				author: res.body[0].author, 
				publishDate: new Date()
				}
			return chai.request(app).put(`/blog-posts/${objectID}`).send(objectUpdates);
		}).then(function(res){
			expect(res).to.have.status(204);
			expect(res.body).to.be.a('object');
		});
	});

	it('should delete blog post on DELETE', function() {
		return chai.request(app).get('/blog-posts').then(function(res){
			const objectID = res.body[0].id;
			return chai.request(app).delete(`/blog-posts/${objectID}`);
		}).then(function(res){
			expect(res).to.have.status(204);
		})
	});
});