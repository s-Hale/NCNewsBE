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
  describe('/topics', () => {
    it('GET returns all topics', () => {
      return request
        .get('/api/topics')
        .expect(200)
        .then(res => {
        expect(res.body.topics.length).to.equal(3)
        expect(res.body.topics[0].title).to.equal('Football')
        });
    });
    it('GET returns all articles for a topic', () => {
      return request
        .get('/api/topics/football/articles')
        .expect(200)
        .then(res => {
        expect(res.body.articles.length).to.equal(1)
        expect(res.body.articles[0].belongs_to).to.equal('football')
        });
    });
  });
  describe('/users', () => {
    it('GET returns user profile by username', () => {
      const username = 'northcoder'
      return request
        .get(`/api/users/${username}`)
        .expect(200)
        .then(res => {
         expect(res.body.user.username).to.equal(username)
        });
      });
    });
})



