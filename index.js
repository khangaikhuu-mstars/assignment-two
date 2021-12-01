var sqlite3 = require("sqlite3").verbose();
var express = require("express");
var http = require("http");
var cors = require("cors");

var app = express();
var server = http.createServer(app);
app.use(express.json());
app.use(cors());

const errorMessage = {
  status: "error",
  message: "You have submitted empty email",
};

const createSql =
  "CREATE TABLE IF NOT EXISTS booking (id INTEGER PRIMARY KEY AUTOINCREMENT, email VARCHAR(255) NOT NULL,is_subscribed INTEGER NOT NULL DEFAULT 0 CHECK(is_subscribed IN (0,1)) );";

var db = new sqlite3.Database("./database/test.db");
db.run(createSql);

app.get("/subscribe", (req, res) => {
  res.json({ message: "Status OK" });
});

app.get("/subscribe/subscriptions", (req, res) => {
  const sql = "SELECT * FROM booking ORDER BY id";
  db.all(sql, [], (err, rows) => {
    if (err) {
      return res.status(500).send(errorMessage);
    }
    res.json({ model: rows });
  });
});

// POST /create
app.post("/subscribe/subscription/create", (req, res) => {
  const sql = "INSERT INTO booking (email, is_subscribed) VALUES (?, ?)";
  console.log(req.body);
  console.log(req.body["email"]);
  const book = [req.body.email, 1];
  if (isEmpty(req.body) || req.body.email === "") {
    return res.status(500).send(errorMessage);
  }
  db.run(sql, book, (err) => {
    res.json({
      status: "success",
      message: "You have successfully subscribed",
    });
  });
});

server.listen(3000, function () {
  console.log("Server listening on port: 3000");
});

function isEmpty(obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
}
