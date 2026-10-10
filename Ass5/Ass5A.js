const express = require("express");

const app = express();

app.use(express.json());

// Array
let students = [
    { id: 1, name: "Marry", marks: 94 },
    { id: 2, name: "Rahul", marks: 88 },
    { id: 3, name: "Priyal", marks: 96 }
];


// ==================== POST ====================
// CREATE - Add student

app.post("/students", (req, res) => {

    let student = {
        id: students.length + 1,
        name: req.body.name,
        marks: req.body.marks
    };

    students.push(student);

    res.send(student);
});


// ==================== GET ====================
// READ - Get all students

app.get("/students", (req, res) => {

    res.json(students);

});


// ==================== GET BY ID ====================
// READ - Get one student

app.get("/students/:id", (req, res) => {

    let id = Number(req.params.id);
    let found = false;

    for (let i = 0; i < students.length; i++) {

        if (students[i].id == id) {

            res.json(students[i]);

            found = true;

            break;
        }
    }

    if (found == false) {

        res.send("Student not found");

    }

});


// ==================== PUT ====================
// UPDATE - Update student

app.put("/students/:id", (req, res) => {

    let id = Number(req.params.id);
    let found = false;

    for (let i = 0; i < students.length; i++) {

        if (students[i].id == id) {

            students[i].name = req.body.name;
            students[i].marks = req.body.marks;

            found = true;

            break;
        }
    }

    if (found == true) {

        res.send("Student updated successfully");

    } else {

        res.send("Student not found");

    }

});


// ==================== DELETE ====================
// DELETE - Delete student

app.delete("/students/:id", (req, res) => {

    let id = Number(req.params.id);
    let found = false;

    for (let i = 0; i < students.length; i++) {

        if (students[i].id == id) {

            students.splice(i, 1);

            found = true;

            break;
        }
    }

    if (found == true) {

        res.send("Student deleted successfully");

    } else {

        res.send("Student not found");

    }

});


// ==================== SERVER ====================

app.listen(3000, () => {

    console.log("Server is running on port 3000");

});