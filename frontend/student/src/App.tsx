import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./ui/Header/Header";
import Profile from "./pages/Profile";
import { useDispatch, useSelector } from "react-redux";
import { IUser } from "./types/user";
import Courses from "./pages/Courses";
import Enrollments from "./pages/Enrollments";
import { ProtectedRoute } from "./AuthGuard";
import { useEffect } from "react";
import { setUser } from "./redux/user";
import { Toaster } from "react-hot-toast";

function App() {
  const user: IUser = useSelector((state: any) => state.user.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token: String | null = localStorage.getItem("token");

    if (token && !user) {
      fetchUser(token);
    }
  }, []);

  const fetchUser = async (token: String) => {
    try {
      const userURI = import.meta.env.VITE_STUDENT_API_URL + "/api/auth/authenticate";
      const response = await fetch(userURI, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status !== 200) {
        throw new Error("Failed to authenticate");
      }

      const responseData = await response.json();
      dispatch(setUser(responseData?.user));
      navigate(location.pathname || "/");
    } catch (error) {
      console.error(error);
      navigate("/login");
    }
  };

  return (
    <>
      <Header user={user} />

      <div className="overscroll-none">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute user={user}>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/courses"
            element={
              <ProtectedRoute user={user}>
                <Courses />
              </ProtectedRoute>
            }
          />
          <Route
            path="/enrolled-courses"
            element={
              <ProtectedRoute user={user}>
                <Enrollments />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>

      <div>
        <Toaster
          toastOptions={{
            duration: 10000,
          }}
        />
      </div>
    </>
  );
}

export default App;
