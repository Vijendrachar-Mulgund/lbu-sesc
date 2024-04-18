import { Input, Button } from "@nextui-org/react";
import LeedsBeckettUniversity from "../../assets/lbu_logo.svg";
import { useForm } from "react-hook-form";
import { setUser } from "../../redux/user";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Alert from "../../ui/Alert/Alert";
import { useEffect, useState } from "react";
import OtpInput from "react-otp-input";

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
  const [pin, setPin] = useState<string>("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setError("");
    }, 5000);
  }, [error]);

  const signUserIn = async (data: IFormSignInInput) => {
    const loginURI = import.meta.env.VITE_LIBRARY_API_URL + "/api/auth/login";

    try {
      const response = await fetch(loginURI, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          password: pin,
        }),
      });

      const responseData = await response.json();

      if (responseData.status !== "success") {
        throw new Error(responseData.message);
      }

      if (responseData?.user?.isDefaultPin) {
        navigate("/change-pin", { state: { email: data.email } });
        return;
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
            Sign in to your Library Portal
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

            <div className="">Enter your PIN</div>
            <OtpInput
              inputStyle={{
                borderRadius: "5px",
                border: "1px solid #ccc",
                marginRight: "10px",
                width: "40px",
                height: "50px",
              }}
              inputType="password"
              value={pin}
              onChange={setPin}
              numInputs={6}
              renderInput={(props) => <input {...props} />}
            />

            {errors.password?.type === "required" && <p className="text-red-800 mx-5">Please enter your password</p>}

            <Button type="submit" fullWidth color="primary">
              Login
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?
              <a href="/register" className="font-medium text-primary-600 hover:text-primary-500">
                Register
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
