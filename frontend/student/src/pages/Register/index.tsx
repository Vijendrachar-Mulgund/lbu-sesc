import { Input, Button } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { emailRegex } from "../../utils";
import LeedsBeckettUniversity from "../../assets/lbu_logo.svg";

interface IRegisterFormInput {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
}

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegisterFormInput>();

  const registerNewAccount = (data: IRegisterFormInput) => {
    console.log(data);
  };

  return (
    <>
      <div className="flex min-h-full h-screen flex-1 flex-col justify-center items-center px-6 py-12 lg:px-8">
        {/* Logo Section */}
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img className="mx-auto h-24 w-auto" src={LeedsBeckettUniversity} alt="Leeds Beckett University Logo" />

          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Register your new account
          </h2>
        </div>

        {/* Form Section */}
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit(registerNewAccount)}>
            <Input
              type="email"
              label="Email"
              placeholder="Enter your email"
              {...register("email", { required: true, pattern: emailRegex })}
            />
            {errors.email?.type === "required" && <p className="text-red-800 mx-5">Please enter your email address</p>}
            {errors.email?.type === "pattern" && (
              <p className="text-red-800 mx-5">Please enter a valid Email address</p>
            )}

            <Input
              type="text"
              label="First name"
              placeholder="Enter your first name"
              {...register("firstname", { required: true })}
            />
            {errors.firstname?.type === "required" && <p className="text-red-800 mx-5">Please Enter your First name</p>}

            <Input
              type="text"
              label="Last name"
              placeholder="Enter your last name"
              {...register("lastname", { required: true })}
            />
            {errors.lastname?.type === "required" && <p className="text-red-800 mx-5">Please Enter your First name</p>}

            <Input
              type="password"
              label="Password"
              placeholder="Enter password"
              {...register("password", { required: true })}
            />
            {errors.password?.type === "required" && <p className="text-red-800 mx-5">Please Enter your Password</p>}

            <Button type="submit" fullWidth color="primary">
              Register
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
