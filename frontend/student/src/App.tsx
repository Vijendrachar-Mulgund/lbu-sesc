import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./ui/Header/Header";
import Profile from "./pages/Profile";
import { useSelector } from "react-redux";
import { IUser } from "./types/user";
import Courses from "./pages/Courses";
import Enrollments from "./pages/Enrollments";

function App() {
  const user: IUser = useSelector((state: any) => state.user);

  return (
    <>
      <Header user={user} />

      <div className="overscroll-none">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/enrolled-courses" element={<Enrollments />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
