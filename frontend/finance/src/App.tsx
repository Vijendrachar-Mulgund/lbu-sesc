import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./redux/user";
import Header from "./ui/Header/Header";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { IUser } from "./types/user";
import { ProtectedRoute } from "./authGuard";
import Login from "./pages/Login";
import { Toaster } from "react-hot-toast";
import Invoices from "./pages/Invoices";
import SearchInvoices from "./pages/SearchInvoice";

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
      // Fetch user data
      const userURI = import.meta.env.VITE_FINANCE_API_URL + "/api/auth/authenticate";
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

          {/* Protected Routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute user={user}>
                <Invoices />
              </ProtectedRoute>
            }
          />

          <Route
            path="/search"
            element={
              <ProtectedRoute user={user}>
                <SearchInvoices />
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
