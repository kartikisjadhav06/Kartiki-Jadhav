import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Input from "./Input";
import Display from "./Display";

function Home() {
  return (
    <div>
      <h1>Student Registration</h1>

      <Link to="/input">
        <button>Open Form</button>
      </Link>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>

      <nav>
        <Link to="/">Home</Link>
        {" | "}
        <Link to="/input">Form</Link>
        {" | "}
        <Link to="/display">Record</Link>
      </nav>

      <hr />

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/input"
          element={<Input />}
        />

        <Route
          path="/display"
          element={<Display />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;