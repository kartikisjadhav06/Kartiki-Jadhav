const express = require("express");
const cors = require("cors");
const { MongoClient, ObjectId } = require("mongodb");

const app = express();

app.use(cors());
app.use(express.json());

const url = "mongodb://127.0.0.1:27017";
const client = new MongoClient(url);

let students;

async function connectDB() {
    await client.connect();

    const database = client.db("studentDB");
    students = database.collection("students");

    console.log("MongoDB connected successfully");
}

connectDB();


// HOME
app.get("/", (req, res) => {
    res.send("Student Registration Backend is running");
});


// ADD STUDENT
app.post("/students", async (req, res) => {
    try {
        const student = req.body;

        const result = await students.insertOne(student);

        res.json({
            message: "Student registered successfully",
            id: result.insertedId
        });
    } catch (error) {
        res.status(500).json({
            message: "Error adding student"
        });
    }
});


// DISPLAY STUDENTS
app.get("/students", async (req, res) => {
    try {
        const data = await students.find().toArray();

        res.json(data);
    } catch (error) {
        res.status(500).json({
            message: "Error displaying students"
        });
    }
});


// EDIT STUDENT
app.put("/students/:id", async (req, res) => {
    try {
        const id = req.params.id;

        const updatedStudent = req.body;

        await students.updateOne(
            { _id: new ObjectId(id) },
            { $set: updatedStudent }
        );

        res.json({
            message: "Student updated successfully"
        });
    } catch (error) {
        res.status(500).json({
            message: "Error updating student"
        });
    }
});


// DELETE STUDENT
app.delete("/students/:id", async (req, res) => {
    try {
        const id = req.params.id;

        await students.deleteOne({
            _id: new ObjectId(id)
        });

        res.json({
            message: "Student deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            message: "Error deleting student"
        });
    }
});


app.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
});