const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');

// // this makes the should syntax available throughout
// // this module
const should = chai.should();

const {City, Score} = require('../server/models');

const {app, runServer, closeServer} = require('../server/server');
const {TEST_DATABASE_URL} = require('../config');

const api = request(app);
const authUser = request.agent(app);

chai.use(chaiHttp);


describe('Test City API Route', () => {
  it('should return a array with a single random city', () => {
    return api
      .get('/api/randomcity')
      .then(res => {
        res.should.be.json;
        res.body.should.be.a('array');
        res.body.length.should.have.lengthOf(1);
        const expectedKeys = ['lat','lon','wikipedia','city'];
        res.body.forEach(city => {
          city.should.be.a('object');
          city.should.include.keys(expectedKeys);
        });
      });
  });

  it('should return an array of three random cities'. () => {
    return api
    .get('/api/randomcity')
    .then(res => {
      res.should.be.json;
      res.body.should.be.a('array');
      res.body.length.should.have.lengthOf(3);
      const expectedKeys = ['lat','lon','wikipedia','city'];
      res.body.forEach(city => {
        city.should.be.a('object');
        city.should.include.keys(expectedKeys);
      });
    });
})

describe('Test Score API Route', () => {
  it('should return an array of the top 10 scores', () => {
    return api
      .get('/api/score/top')
      .then(res => {
        res.should.be.json;
        res.body.should.be.a('array');
        res.body.should.have.lengthOf(10);
        const expectedKeys = ['name','score'];
        res.body.forEach(score => {
          score.should.be.a('object');
          score.should.include.keys(expectedKeys);
        });
      });
  });

  it('should post a new score', () => {
    const newScore = {name: 'Test', score: 1111};
    return api
      .post('/api/score')
      .send(newScore)
      .then(res => {
        res.should.have.status(201);
      })
  })
})
