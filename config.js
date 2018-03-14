module.exports = {
  DB: {
    test: "mongodb://localhost/northcoders-news-api-test",
    dev: "mongodb://localhost/northcoders-news-api",
    production:
      "mongodb://ncnews:ncnews1@ds115166.mlab.com:15166/ncnewsdatabase"
  },
  PORT: {
    test: 3090,
    dev: 9090
  }
};
