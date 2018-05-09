# Northcoders News - BE

The back end section of a news website where users can browse a series of articles and narrow the selection down by topic. Users can add comments to articles, and delete their own, plus they have the ability to vote up or down on articles or comments.

A full version is hosted here: [Northcoders News](https://agile-stream-27526.herokuapp.com)

### Prerequisites

You will need Node.js, git and MongoDB. 

### Installing

Clone the repository then use `npm i` to install the dependencies. Start MongoDB and set up a local config file. Seed a local database with `npm run seed`. `npm start` will start the application. `npm test` will run the test file.

## Running the tests

Mocha, Chai and supertest will be required to run the spec file. 

### Routes

The following routes are available on the API:

```
GET /api/articles
```

Returns all the articles in the database. Certain routes will redirect here.

```
GET /api/topics
```

Get all the topics. This route is used by a component, but the user is redirected back to /api/articles.


```
GET /api/topics/:topic_id/articles
```

Return all the articles for a chosen topic


```
GET /api/:article_id
```

Get an individual article

```
GET /api/articles/:article_id/comments
```

Get all the comments for a individual article. This route is used by a component; users will see the comments under the article as standard.

```
POST /api/articles/:article_id/comments
```

Adds a new comment to an article.

```
PUT /api/articles/:article_id
```

Using a query of 'up' or 'down', this route will increase or decrease the votes of an article by one.

```
PUT /api/comments/:comment_id
```

Using a query of 'up' or 'down', this route will increase or decrease the votes of a comment by one.

```
DELETE /api/comments/:comment_id
```

A user can delete their own comments. This feature is not available on other users' comments.

```
GET /api/users/:username
```

Returns the profile data for the specified user.


