const chai = require('chai');
const chaiHttp = require('chai-http');

const {app, runServer, closeServer} = require('../server');

const expect = chai.expect;
chai.use(chaiHttp);

desribe('Blog Post', function() {
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

});