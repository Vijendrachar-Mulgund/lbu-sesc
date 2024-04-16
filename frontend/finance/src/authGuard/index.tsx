import { Navigate } from "react-router-dom";
import { IUser } from "../types/user";

export const ProtectedRoute = ({ user, children }: { user: IUser; children: any }) => {
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};
