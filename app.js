const express = require('express');
const sqldb = require('./connection/database');

const app = express();

function getPerson() {
    sqldb.execute("SELECT * FROM person").then(([rows, fileData]) => {
        console.log(rows);
    })
}

//SQL injection - attack pattern
function insert() {
    const query = 'INSERT INTO person (full_name,age,city,gender) VALUES (?,?,?,?)';
    const values = ['vandana', 25, 'bharuch', 'female'];
    sqldb.execute(query, values).then((result) => { console.log(result) });
}

function findById(id) {
    sqldb.execute("SELECT * FROM person WHERE person.id = ?", [id]).then(([row, fileData]) => {
        console.log(row);
    }).catch((err) => console.log(err))

}

function deleteById(id) {
    sqldb.execute("DELETE FROM person WHERE person.id = ?", [id]).then(([row, fileData]) => {
        console.log(row);
    }).catch((err) => console.log(err))
}

// findById(2);
deleteById(2);
// insert();
// getPerson();

app.use((req, res, next) => {
    res.write('<h1>Hello guys!</h1>')
})

app.listen(3000);