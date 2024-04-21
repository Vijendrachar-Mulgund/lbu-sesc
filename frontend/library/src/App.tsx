import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import Header from "./ui/Header/Header";
import { useDispatch, useSelector } from "react-redux";
import { IUser } from "./types/user";
import ChangePin from "./pages/ChangePIN";
import BorrowedBooks from "./pages/BorrowedBooks";
import { ProtectedRoute } from "./authGuard";
import { useEffect } from "react";
import { setUser } from "./redux/user";
import { Toaster } from "react-hot-toast";
import Books from "./pages/Books";
import SearchBook from "./pages/SearchBook";

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
      const userURI = import.meta.env.VITE_LIBRARY_API_URL + "/api/auth/authenticate";
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
          <Route path="/change-pin" element={<ChangePin />} />

          {/* Protected Routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute user={user}>
                <BorrowedBooks />
              </ProtectedRoute>
            }
          />
          <Route
            path="/books"
            element={
              <ProtectedRoute user={user}>
                <Books />
              </ProtectedRoute>
            }
          />

          <Route
            path="/search"
            element={
              <ProtectedRoute user={user}>
                <SearchBook />
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
