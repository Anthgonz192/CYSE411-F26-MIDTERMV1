
const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const bodyParser = require("body-parser");

const app = express();
const db = new sqlite3.Database("./portal.db");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.post("/login", (req, res) => {
    const { username, password } = req.body;

    if (typeof username !== "string" || typeof password !== "string") {
        return res.status(400).send("Invalid input");
    }

    const query = "SELECT * FROM users WHERE username = ? AND password = ?";

    db.get(query, [username, password], (err, row) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Database error");
        }

        if (row) {
            res.send("Login successful");
        } else {
            res.status(401).send("Invalid credentials");
        }
    });
});


const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});