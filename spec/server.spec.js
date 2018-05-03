process.env.NODE_ENV = "test";

const app = require("../server");
const request = require("supertest")(app);
const { expect } = require("chai");
const saveTestData = require("../seed/test.seed.js");
const mongoose = require("mongoose");

describe("/api", () => {
  let testData;
  beforeEach(() => {
    return mongoose.connection
      .dropDatabase()
      .then(saveTestData)
      .then(res => {
        testData = res;
      })
      .catch(console.log);
  });
  describe("/articles", () => {
    it("GET returns all articles", () => {
      return request
        .get("/api/articles")
        .expect(200)
        .then(res => {
          expect(res.body.allArticles.length).to.equal(
            testData.articles.length
          );
        });
    });
    it("GET returns all comments for an individual article", () => {
      const articleID = testData.articles[0]._id;
      return request
        .get(`/api/articles/${articleID}/comments`)
        .expect(200)
        .then(res => {
          expect(res.body.length).to.equal(2);
          expect(res.body[0].belongs_to).to.equal(`${articleID}`);
        });
    });
    it("GET returns a single article by its ID", () => {
      const articleID = testData.articles[0]._id;
      return request
        .get(`/api/articles/${articleID}`)
        .expect(200)
        .then(res => {
          expect(res.body.article._id).to.equal(`${articleID}`);
        });
    });
    it("GET returns a 400 error if ID not valid", () => {
      const articleID = 4453;
      return request
        .get(`/api/articles/${articleID}`)
        .expect(400)
        .then(res => {
          expect(res.text).to.equal(
            JSON.stringify({ status: 400, msg: "Bad request" })
          );
        });
    });
    it("GET returns a 404 error if article not found", () => {
      const articleID = "5ae83625de5eac3c44587a31";
      return request
        .get(`/api/articles/${articleID}`)
        .expect(404)
        .then(res => {
          expect(res.text).to.equal(
            JSON.stringify({ status: 404, msg: "Page not found" })
          );
        });
    });
    it("POST posts a new comment to an article", () => {
      const data = { comment: "test data comment" };
      const articleID = testData.articles[0]._id;
      return request
        .post(`/api/articles/${articleID}/comments`)
        .send(data)
        .expect(201)
        .then(res => {
          expect(res.body.savedComment.body).to.equal("test data comment");
          expect(res.body.savedComment.belongs_to).to.equal(`${articleID}`);
          expect(res.body.savedComment.created_by).to.equal("northcoder");
        });
    });
    it("POST returns an error for invalid comment post", () => {
      const data = { invalid: 7 };
      const articleID = testData.articles[0]._id;
      return request
        .post(`/api/articles/${articleID}/comments`)
        .send(data)
        .expect(400)
        .then(res => {
          expect(res.text).to.equal(
            JSON.stringify({ status: 400, msg: "Bad request" })
          );
        });
    });

    it("PUT increases vote count of an article", () => {
      const articleID = testData.articles[0]._id;
      return request
        .put(`/api/articles/${articleID}?vote=up`)
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an("object");
          expect(res.body.article.votes).to.eql(1);
        });
    });
    it("PUT decreases vote count of an article", () => {
      const articleID = testData.articles[0]._id;
      return request.put(`/api/articles/${articleID}?vote=up`).expect(200);
      return request.put(`/api/articles/${articleID}?vote=up`).expect(200);
      return request
        .put(`/api/articles/${articleID}?vote=down`)
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an("object");
          expect(res.body.article.votes).to.eql(1);
        });
    });
  });
  describe("/topics", () => {
    it("GET returns all topics", () => {
      return request
        .get("/api/topics")
        .expect(200)
        .then(res => {
          expect(res.body.topics.length).to.equal(3);
        });
    });
    it("GET returns all articles for a topic", () => {
      return request
        .get("/api/topics/football/articles")
        .expect(200)
        .then(res => {
          expect(res.body.articles.length).to.equal(1);
          expect(res.body.articles[0].belongs_to).to.equal("football");
        });
    });
  });
  describe("/users", () => {
    it("GET returns user profile by username", () => {
      const username = "northcoder";
      return request
        .get(`/api/users/${username}`)
        .expect(200)
        .then(res => {
          expect(res.body.user.username).to.equal(username);
        });
    });
    it("GET returns 404 if user not found", () => {
      const username = "notfound";
      return request
        .get(`/api/users/${username}`)
        .expect(404)
        .then(res => {
          expect(res.text).to.equal(
            JSON.stringify({ status: 404, msg: "Page not found" })
          );
        });
    });
  });
  describe("/comments", () => {
    it("DELETEs a comment", () => {
      const data = { comment: "delete this comment" };
      const articleID = testData.articles[0]._id;
      return request.post(`/api/articles/${articleID}/comments`).send(data);
      const commentID = data._id;
      return request
        .delete(`/api/comments/${commentID}`)
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an("object");
        });
    });
    it("PUT increases vote count of a comment", () => {
      const commentID = testData.comments[0]._id;
      return request
        .put(`/api/comments/${commentID}?vote=up`)
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an("object");
          expect(res.body.comment.votes).to.eql(1);
        });
    });
    it("PUT decreases vote count of a comment", () => {
      const commentID = testData.comments[0]._id;
      return request.put(`/api/comments/${commentID}?vote=up`).expect(200);
      return request.put(`/api/comments/${commentID}?vote=up`).expect(200);
      return request
        .put(`/api/comments/${commentID}?vote=down`)
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an("object");
          expect(res.body.comment.votes).to.eql(1);
        });
    });
  });
});
