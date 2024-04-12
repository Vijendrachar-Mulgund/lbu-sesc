import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link } from "@nextui-org/react";
import { IUser } from "../../types/user";
import LeedsBeckettUniversityLogo from "../../assets/lbu_logo.svg";

interface IHeaderProps {
  user: IUser;
}

export default function Header({ user }: IHeaderProps) {
  return (
    <Navbar maxWidth="2xl">
      <NavbarBrand>
        <img className="h-16" src={LeedsBeckettUniversityLogo} alt="Leeds Beckett University Logo" />
        <p className="font-bold text-inherit">Student Portal</p>
      </NavbarBrand>
      {user ? (
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
        </NavbarContent>
      ) : (
        ""
      )}
    </Navbar>
  );
}
