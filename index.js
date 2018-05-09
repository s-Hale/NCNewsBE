const app = require("./server");
if (process.env.NODE_ENV !== 'production') {
const config = require("./config");
}

let port = process.env.PORT || config.PORT[process.env.NODE_ENV];

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});
