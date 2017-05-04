'use strict';

const server = require('../server');
const chai = require('chai');
const http = require('chai-http');
const expect = chai.expect;

chai.use(http);

describe('Server module', () => {
  let app;
  before(done => {
    app = server.listen(8000);
    done();
  });
  after(done => {
    app.close();
    done();
  });

  describe('POST method', () => {
    describe('/api/cat route', () => {
      describe('a properly formatted request', () => {
        it('should return a 200 response', done => {
          chai.request(server)
          .post('/api/cat')
          .send({name: 'milo', mood:'happy'})
          .end((err, res) => {
            expect(res).to.have.status(200);
            done();
          });
        });
        it('should return a response object', done => {
          chai.request(server)
          .post('/api/cat')
          .send({name: 'milo', mood:'happy'})
          .end((err, res) => {
            expect(res).to.be.an('object');
            done();
          });
        });
        it('should return a created cat with name "milo"', done => {
          chai.request(server)
          .post('/api/cat')
          .send({name: 'milo', mood:'happy'})
          .end((err, res) => {
            console.log('body:', res.body);
            expect(res.body.name).to.equal('milo');
            done();
          });
        });
        it('should return a create cat with mood "happy"', done => {
          chai.request(server)
          .post('/api/cat')
          .send({name: 'milo', mood:'happy'})
          .end((err, res) => {
            expect(res.body.mood).to.equal('happy');
            done();
          });
        });
      });
      describe('a request without a valid body', () => {
        it('should respond with a 400 "bad request" error', done => {
          chai.request(server)
          .post('/api/cat')
          .send({})
          .end((err, res) => {
            expect(res).to.have.status(400);
            done();
          });
        });
      });
      describe('an registered request', () => {
        it('should respond with a 404 error', done => {
          chai.request(server)
          .post('/api/dog')
          .end((err, res) => {
            expect(res).to.have.status(404);
            done();
          });
        });
      });
    });
  });
// ============
  describe('GET method', () => {

    let resource;
    before(done => {
      chai.request(server)
      .post('/api/cat')
      .send({name: 'binky', mood: 'grumpy'})
      .end((err, res) => {
        // console.log('whats the res body', res.body);
        resource = res.body;
        console.log('where is it:', resource);
        done();
      });
    });

    after(done => {
      chai.request(server)
      .delete('/api/cat')
      .query({id: resource._id})
      .end(() => {
        console.error();
        done();
      });
    });

    describe('/api/cat/:id route', () => {

      describe('a properly formmated request', () => {
        it.only('should return a 200 response', done => {
          console.log('id: ', resource);
          chai.request(server)
          .get(`/api/cat/${resource._id}`)
          .end((err, res) => {
            console.log('what is this', res.body);
            expect(res.status).to.equal(200);
            done();
          });
        });
      });
    });


  });
// ============

  describe('PUT method', () => {



  });
// ============
  describe('DELETE method', () => {



  });




});
