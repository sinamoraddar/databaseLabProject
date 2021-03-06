var express = require("express");
var mysql = require("mysql");
var bodyParser = require("body-parser");
const cors = require("cors");
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
// Parse JSON bodies (as sent by API clients)
app.use(express.json());
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
    q = `SELECT student.ID ID, student.name name, student.dept_name student_department_name,student.tot_cred student_totalCredit,instructor.name advisor_name FROM ${tableName},advisor,instructor where(student.ID,advisor.i_ID)=(advisor.s_ID,instructor.ID) ORDER BY student.name`;
  } else {
    q = `SELECT ID, name,dept_name,salary FROM ${tableName} ORDER BY name`;
  }
  connection.query(q, function (err, results) {
    if (err) throw err;
    //   console.log(results);
    res.json(results);
  });
});
app.get("/section", function (req, res) {
  //on the home page => show all of the table names
  let q =
    "SELECT section.course_id,section.sec_id,course.title,section.semester,section.year FROM section,course where section.course_id=course.course_id ORDER BY course.title,section.sec_id";

  connection.query(q, function (err, results) {
    if (err) throw err;
    //   console.log(results);
    res.json(results);
  });
});
app.get("/courses/student/:ID", function (req, res) {
  //on the home page => show all of the table names
  const ID = req.params.ID;
  let q = `SELECT takes.ID,takes.course_id,course.title,takes.semester,takes.year,takes.grade FROM  takes  INNER JOIN course ON course.course_id=takes.course_id where ${ID}=takes.ID ORDER BY course.title `;

  connection.query(q, function (err, results) {
    if (err) throw err;
    //   console.log(results);
    res.json(results);
  });
});
app.get("/courses/instructor/:ID", function (req, res) {
  //on the home page => show all of the table names
  const ID = req.params.ID;
  let q = `SELECT teaches.ID,teaches.course_id,title,teaches.sec_id,teaches.semester,teaches.year,dept_name ,credits FROM  teaches  INNER JOIN course ON course.course_id=teaches.course_id where ${ID}=teaches.ID ORDER BY course.title `;

  connection.query(q, function (err, results) {
    if (err) throw err;
    //   console.log(results);
    res.json(results);
  });
});
app.get("/instructors/:instructor/courses", function (req, res) {
  //on the home page => show all of the table names
  const tableName = req.params.table;
  let q;
  if (tableName === "student") {
    q = `SELECT student.name student_name, student.dept_name student_department_name,student.tot_cred student_totalCredit,instructor.name instructor_name FROM ${tableName},advisor,instructor where(student.ID,advisor.i_ID)=(advisor.s_ID,instructor.ID) ORDER BY student.name`;
  } else {
    q = `SELECT name,dept_name,salary FROM ${tableName} ORDER BY name`;
  }
  connection.query(q, function (err, results) {
    if (err) throw err;
    //   console.log(results);
    res.json(results);
  });
});
app.post("/course/takes", function (req, res) {
  //  ID    | course_id | sec_id | semester | year | grade isOneOf[A,b,c,d]|
  const { ID, course_id, sec_id, semester, year, grade } = req.body;
  let q = `INSERT  INTO takes VALUES  ('${ID}','${course_id}','${sec_id}','${semester}','${year}','${grade}')`;
  connection.query(q, function (err, result) {
    if (err) throw err;
    res.send("done");
  });
});
app.delete("/course/takes/:studentID/:courseID", function (req, res) {
  let { courseID, studentID } = req.params;
  let q = `delete from takes where takes.ID='${studentID}' and takes.course_id='${courseID}'`;
  connection.query(q, function (err, result) {
    if (err) throw err;
    res.send("done");
  });
});

app.listen(4000, function () {
  console.log("Server running on 4000!");
});
