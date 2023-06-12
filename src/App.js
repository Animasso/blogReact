import "./App.css";
import { Footer, Navbar } from "./components";
import { Routes, Route } from "react-router-dom";
import { Home, Register, Login, Error, CreatePost } from "./pages";
import { ProtectedRoutes } from "./ProtectedRoutes";
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

        <Route
          path="/newPost"
          element={
            <ProtectedRoutes>
              <CreatePost />
            </ProtectedRoutes>
          }
        />

        <Route path="*" element={<Error />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
