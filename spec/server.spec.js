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
      // console.log(testData)
    })
    .catch(console.log)
  })
  describe('/articles', () => {
    it('GET returns all articles', () => {
      return request
        .get('/api/articles')
        .expect(200)
        .then(res => {
          expect(res.body.allArticles.length).to.equal(testData.articles.length)
        });
    });
    it('GET returns all comments for an individual article', () => {
      const articleID = testData.articles[0]._id;
      return request
        .get(`/api/articles/${articleID}/comments`)
        .expect(200)
        .then(res => {
        expect(res.body.length).to.equal(2)
        expect(res.body[0].belongs_to).to.equal(`${articleID}`)
      });
    });
    it('GET returns a single article by its ID', () => {
      const articleID = testData.articles[0]._id;
      return request
      .get(`/api/articles/${articleID}`)
      .expect(200)
      .then(res => {
        expect(res.body.article._id).to.equal(`${articleID}`)
      })
    })
  })
})



