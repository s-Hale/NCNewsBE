process.env.NODE_ENV = 'test';

const app = require('../server');
const request = require ('supertest')(app);
const { expect } = require('chai');
const saveTestData = require('../seed/test.seed.js')
const mongoose = require('mongoose');

describe('/api', () => {
  let testData;
  beforeEach(() => {
    return mongoose.connection
    .dropDatabase()
    .then(saveTestData)
    .then(res => {
      testData = res;
      console.log(testData)
    })
    .catch(console.log)
  })
  // after(() => {
  //   mongoose.disconnect();
  // })
    it('GET returns all articles', () => {
      return request
        .get('/api/articles')
        .expect(200)
        .then(res => {
          expect(res.body.allArticles.length).to.equal(testData.articles.length);
        });
    });
  });
