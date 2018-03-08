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
    it('POST posts a new comment to an article', () => {
      const data = { "comment": "test data comment" };
      const articleID = testData.articles[0]._id;
      return request
        .post(`/api/articles/${articleID}/comments`)
        .send(data)
        .expect(201)
        .then(res => {
          expect(res.body.savedComment.body).to.equal('test data comment');
          expect(res.body.savedComment.belongs_to).to.equal(`${articleID}`);
          expect(res.body.savedComment.created_by).to.equal('northcoder');
        })
      })
    it('PUT increases vote count of an article', () => {
      const articleID = testData.articles[0]._id;
      return request
        .put(`/api/articles/${articleID}?vote=up`)
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('object');
          expect(res.body.article.votes).to.eql(1);
          });
      });
    it('PUT decreases vote count of an article', () => {
      const articleID = testData.articles[0]._id;
      return request
        .put(`/api/articles/${articleID}?vote=up`)
        .expect(200)
        return request
        .put(`/api/articles/${articleID}?vote=up`)
        .expect(200)
        return request
        .put(`/api/articles/${articleID}?vote=down`)
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('object');
          expect(res.body.article.votes).to.eql(1);
          });
      });
  });
  describe('/topics', () => {
    it('GET returns all topics', () => {
      return request
        .get('/api/topics')
        .expect(200)
        .then(res => {
        expect(res.body.topics.length).to.equal(3)
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
  describe('/comments', () => {
    it('DELETEs a comment', () => {
      const data = { "comment": "delete this comment" };
      const articleID = testData.articles[0]._id;
      return request
        .post(`/api/articles/${articleID}/comments`)
        .send(data)
      const commentID = data._id;
      return request
        .delete(`/api/comments/${commentID}`)
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('object');
        })
    })
   });
  })




