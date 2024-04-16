import { Input, Button } from "@nextui-org/react";
import LeedsBeckettUniversity from "../../assets/lbu_logo.svg";
import { useForm } from "react-hook-form";
import { setUser } from "../../redux/user";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Alert from "../../ui/Alert/Alert";
import { useEffect, useState } from "react";

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

  const [error, setError] = useState<string>("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setError("");
    }, 5000);
  }, [error]);

  const signUserIn = async (data: IFormSignInInput) => {
    const loginURI = import.meta.env.VITE_FINANCE_API_URL + "/api/auth/login";

    try {
      const response = await fetch(loginURI, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if (responseData.status !== "success") {
        throw new Error(responseData.message);
      }

      localStorage.setItem("token", responseData?.token);
      dispatch(setUser(responseData?.user));
      navigate("/");
    } catch (error: any) {
      setError(error?.message || "Failed to sign in");
      console.error(error || "Failed to sign in");
    }
  };

  return (
    <>
      <div className="flex min-h-full h-screen flex-1 flex-col justify-center items-center px-6 py-12 lg:px-8">
        {/* Logo Section */}
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img className="mx-auto h-24 w-auto" src={LeedsBeckettUniversity} alt="Leeds Beckett University Logo" />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your Student Portal
          </h2>
        </div>

        {/* Form Section */}
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          {error ? <Alert message={error} /> : null}

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
