import "./App.css";
import { Footer, Navbar } from "./components";
import { Routes, Route, useLocation } from "react-router-dom";
import { Home, Register, Login, Error, CreatePost, FrontPage } from "./pages";
import { ProtectedRoutes } from "./ProtectedRoutes";

function App() {
  const location = useLocation();

  // const isExcludedPage = location.pathname === "*";
  return (
    <div className="App">
      {location.pathname !== "/" && <Navbar />}
      <Routes>
        <Route path="/" element={<FrontPage />} />
        <Route path="/dashboard" element={<Home />} />
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
