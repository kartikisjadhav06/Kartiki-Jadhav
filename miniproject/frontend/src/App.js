import React, { useEffect, useState } from "react";
import "./App.css";

function App() {

  const [students, setStudents] = useState([]);

  const [name, setName] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [course, setCourse] = useState("");
  const [division, setDivision] = useState("");
  const [city, setCity] = useState("");

  const [editId, setEditId] = useState(null);


  // DISPLAY STUDENTS
  const displayStudents = async () => {

    try {

      const response = await fetch("http://localhost:5000/students");

      const data = await response.json();

      setStudents(data);

    } catch (error) {

      console.log(error);

    }
  };


  // LOAD STUDENTS WHEN PAGE OPENS
  useEffect(() => {

    displayStudents();

  }, []);


  // CLEAR FORM
  const clearForm = () => {

    setName("");
    setRollNo("");
    setMobile("");
    setEmail("");
    setCourse("");
    setDivision("");
    setCity("");

    setEditId(null);
  };


  // REGISTER / UPDATE STUDENT
  const handleSubmit = async (e) => {

    e.preventDefault();

    const student = {
      name,
      rollNo,
      mobile,
      email,
      course,
      division,
      city
    };


    try {

      if (editId) {

        // UPDATE
        await fetch(`http://localhost:5000/students/${editId}`, {

          method: "PUT",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify(student)

        });

        alert("Student updated successfully");

      } else {

        // ADD
        await fetch("http://localhost:5000/students", {

          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify(student)

        });

        alert("Student registered successfully");

      }


      clearForm();

      displayStudents();

    } catch (error) {

      alert("Something went wrong");

      console.log(error);

    }

  };


  // EDIT BUTTON
  const editStudent = (student) => {

    setName(student.name);
    setRollNo(student.rollNo);
    setMobile(student.mobile);
    setEmail(student.email);
    setCourse(student.course);
    setDivision(student.division);
    setCity(student.city);

    setEditId(student._id);

    window.scrollTo(0, 0);
  };


  // DELETE BUTTON
  const deleteStudent = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this student?"
    );

    if (!confirmDelete) {
      return;
    }


    try {

      await fetch(`http://localhost:5000/students/${id}`, {

        method: "DELETE"

      });

      alert("Student deleted successfully");

      displayStudents();

    } catch (error) {

      console.log(error);

    }

  };


  return (

    <div className="container">

      {/* HEADER */}

      <h1>Student Registration System</h1>


      {/* REGISTRATION FORM */}

      <div className="form-box">

        <h2>
          {editId ? "Edit Student" : "Register Student"}
        </h2>


        <form onSubmit={handleSubmit}>

          <label>Name</label>

          <input
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />


          <label>Roll Number</label>

          <input
            type="text"
            placeholder="Enter roll number"
            value={rollNo}
            onChange={(e) => setRollNo(e.target.value)}
            required
          />


          <label>Mobile Number</label>

          <input
            type="text"
            placeholder="Enter mobile number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            required
          />


          <label>Email</label>

          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />


          <label>Course</label>

          <input
            type="text"
            placeholder="Enter course"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            required
          />


          <label>Division</label>

          <input
            type="text"
            placeholder="Enter division"
            value={division}
            onChange={(e) => setDivision(e.target.value)}
            required
          />


          <label>City</label>

          <input
            type="text"
            placeholder="Enter city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />


          <button type="submit">

            {editId ? "Update Student" : "Register Student"}

          </button>


          {editId && (

            <button
              type="button"
              className="cancel-button"
              onClick={clearForm}
            >
              Cancel Edit
            </button>

          )}

        </form>

      </div>


      {/* DISPLAY STUDENTS */}

      <div className="students-box">

        <div className="heading-row">

          <h2>Registered Students</h2>

          <button
            className="display-button"
            onClick={displayStudents}
          >
            Display Students
          </button>

        </div>


        {students.length === 0 ? (

          <p className="no-data">
            No students registered yet.
          </p>

        ) : (

          <div className="table-container">

            <table>

              <thead>

                <tr>

                  <th>Name</th>
                  <th>Roll No</th>
                  <th>Mobile</th>
                  <th>Email</th>
                  <th>Course</th>
                  <th>Division</th>
                  <th>City</th>
                  <th>Actions</th>

                </tr>

              </thead>


              <tbody>

                {students.map((student) => (

                  <tr key={student._id}>

                    <td>{student.name}</td>

                    <td>{student.rollNo}</td>

                    <td>{student.mobile}</td>

                    <td>{student.email}</td>

                    <td>{student.course}</td>

                    <td>{student.division}</td>

                    <td>{student.city}</td>

                    <td>

                      <button
                        className="edit-button"
                        onClick={() => editStudent(student)}
                      >
                        Edit
                      </button>


                      <button
                        className="delete-button"
                        onClick={() => deleteStudent(student._id)}
                      >
                        Delete
                      </button>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

      </div>

    </div>

  );

}

export default App;