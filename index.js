const app = require("./src/app");

const port = process.env.PORT || 8118;

//setup server to listen on port 8118

app.listen(port, () => {
  console.log(`App is running at ${port}`);
});
