import { Input, Button } from "@nextui-org/react";
import LeedsBeckettUniversity from "../../assets/lbu_logo.svg";
import { useForm } from "react-hook-form";
import { setUser } from "../../redux/user";
import { useDispatch, useSelector } from "react-redux";

interface IFormSignInInput {
  email: string;
  password: string;
}

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormSignInInput>();

  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user);

  console.log("user ->", user);

  const signUserIn = async (data: IFormSignInInput) => {
    const signupURI = import.meta.env.VITE_STUDENT_API_URL + "/api/auth/signup";
    console.log("signupURI ->", signupURI);

    try {
      const response = await fetch(signupURI, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to sign in");
      }

      const responseData = await response.json();
      console.log("responseData ->", responseData);
    } catch (error) {
      console.error(error);
    }
    dispatch(setUser(data));
    console.log(data);
  };

  return (
    <>
      <div className="flex min-h-full h-screen flex-1 flex-col justify-center items-center px-6 py-12 lg:px-8">
        {/* Logo Section */}
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img className="mx-auto h-24 w-auto" src={LeedsBeckettUniversity} alt="Leeds Beckett University Logo" />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        {/* Form Section */}
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit(signUserIn)}>
            <Input
              type="email"
              label="Email"
              placeholder="Enter your email"
              {...register("email", { required: true })}
            />

            {errors.email?.type === "required" && <p className="text-red-800 mx-5">Please enter your email address</p>}

            <Input
              type="password"
              label="Password"
              placeholder="Enter password"
              {...register("password", { required: true })}
            />

            {errors.password?.type === "required" && <p className="text-red-800 mx-5">Please enter your password</p>}

            <Button type="submit" fullWidth color="primary">
              Login
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
