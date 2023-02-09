const mongoose = require("mongoose"); // Mongoose Library
const { DB_NAME, DB_USERNAME, DB_PASSWORD, DB_HOST } = process.env;

// Localhost DB connection using mongodb protocols

const url = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`;
// DB Connection Start
// const url = `mongodb+srv://admin:admin123@cluster0.obuvtja.mongodb.net/test`

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

  .then(() => console.log("Database connection successfully :)"))
  .catch((err) => console.log(err));

                            