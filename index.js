const app = require("./server");
const config = require("./config");

let port = process.env.PORT || config.PORT[process.env.NODE_ENV];
console.log('hello')
app.listen(port, function() {
  console.log(`listening on port ${port}`);
});
