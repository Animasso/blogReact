import "./App.css";
import { Navbar } from "./components";
import { Routes, Route } from "react-router-dom";
import { Home, Register, Login, Error, CreatePost } from "./pages";
function App() {
  // const location = useLocation();

  // const isExcludedPage = location.pathname === "*";
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/newPost" element={<CreatePost />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
