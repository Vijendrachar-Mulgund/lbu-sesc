import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button } from "@nextui-org/react";
import { IUser } from "../../types/user";
import LeedsBeckettUniversityLogo from "../../assets/lbu_logo.svg";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeUser } from "../../redux/user";

interface IHeaderProps {
  user: IUser;
}

export default function Header({ user }: IHeaderProps) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
            <p className="font-bold text-inherit">Student Portal</p>
          </NavbarBrand>

          <NavbarContent className="hidden sm:flex gap-4" justify="center">
            <NavbarItem>
              <Link color="foreground" href="#">
                Courses
              </Link>
            </NavbarItem>
            <NavbarItem isActive>
              <Link href="#" aria-current="page">
                Enrollments
              </Link>
            </NavbarItem>

            <NavbarItem>
              <Button onClick={handleUserLogout} size="sm">
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
