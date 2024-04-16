import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Button } from "@nextui-org/react";
import { IUser } from "../../types/user";
import LeedsBeckettUniversityLogo from "../../assets/lbu_logo.svg";
import { useDispatch } from "react-redux";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { removeUser } from "../../redux/user";

interface IHeaderProps {
  user: IUser;
}

export default function Header({ user }: IHeaderProps) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleUserLogout = () => {
    localStorage.removeItem("token");
    dispatch(removeUser());
    navigate("/login");
  };

  return (
    <div>
      {user ? (
        <Navbar maxWidth="2xl">
          <NavbarBrand>
            <img className="h-16" src={LeedsBeckettUniversityLogo} alt="Leeds Beckett University Logo" />
            <p className="font-bold text-inherit">Finance Portal</p>
          </NavbarBrand>

          <NavbarContent className="hidden sm:flex gap-4" justify="center">
            <NavbarItem isActive={location.pathname === "/"}>
              <Link to="/">Invoices</Link>
            </NavbarItem>

            <NavbarItem>
              <Button color="danger" onClick={handleUserLogout} size="md">
                Logout
              </Button>
            </NavbarItem>
          </NavbarContent>
        </Navbar>
      ) : (
        ""
      )}
    </div>
  );
}
