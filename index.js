const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const routes = require("./routes");
const database = require("./database");
const port = process.env.PORT || 8080;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
database.connect();
// parse application/json
app.use(bodyParser.json());

app.use("/api", routes.router);

app.listen(port, () => console.log(`App listening on port: ${port}`));
