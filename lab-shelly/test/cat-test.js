'use strict';

const Cat = require('../model/cat');
const expect = require('chai').expect;

describe('cat module', function() {
  describe('when creating a new cat object', function() {
    this.newCat = new Cat({'name': 'milo', 'mood': 'hungry'});

    it('should have a name, mood, and id property', done => {
      expect(this.newCat).to.have.property('name');
      done();
    });
    it('should have a name of "milo"', done => {
      expect(this.newCat.name).to.equal('milo');
      done();
    });
    it('should have a mood of "hungry"', done => {
      expect(this.newCat.mood).to.equal('hungry');
      done();
    });
    it('should create an object', done => {
      expect(this.newCat).to.be.an('object');
      done();
    });
  });
});
