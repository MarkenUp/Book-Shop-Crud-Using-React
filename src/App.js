import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Books } from "./pages";
import { AddBook, Update } from "./components";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Books />} />
        <Route path="/add" element={<AddBook />} />
        <Route path="/update" element={<Update />} />
      </Routes>
    </div>
  );
}

export default App;
