var express = require("express");
var mysql = require("mysql");
var bodyParser = require("body-parser");
const cors = require("cors");
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(cors());
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Wanted98wanted",
  database: "university",
});

app.get("/", function (req, res) {
  //on the home page => show all of the table names

  // Find count of users in DB
  var q = "SHOW TABLES;";
  connection.query(q, function (err, results) {
    if (err) throw err;
    // console.log(results);
    res.json(results);
  });
});
app.get("/tables/:table", function (req, res) {
  //on the home page => show all of the table names
  const tableName = req.params.table;
  let q;
  if (tableName === "student") {
    q = `SELECT student.* ,advisor.i_ID FROM ${tableName}${
      tableName === "student" ? ",advisor where(student.ID)=(advisor.s_ID)" : ""
    }`;
  } else {
    q = `SELECT * FROM ${tableName}`;
  }
  connection.query(q, function (err, results) {
    if (err) throw err;
    //   console.log(results);
    res.json(results);
  });
});

app.post("/register", function (req, res) {
  var person = {
    email: req.body.email,
  };
  connection.query("INSERT INTO users SET ?", person, function (err, result) {
    if (err) throw err;
    res.redirect("/");
  });
});

app.listen(4000, function () {
  console.log("Server running on 8080!");
});
