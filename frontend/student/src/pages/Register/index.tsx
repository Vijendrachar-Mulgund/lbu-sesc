import { Input, Button } from "@nextui-org/react";

export default function Register() {
  return (
    <>
      <div className="flex min-h-full h-screen flex-1 flex-col justify-center items-center px-6 py-12 lg:px-8">
        {/* Logo Section */}
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Register your new account
          </h2>
        </div>

        {/* Form Section */}
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST">
            <Input type="email" label="Email" placeholder="Enter your email" />
            <Input type="text" label="First name" placeholder="Enter your first name" />
            <Input type="text" label="Last name" placeholder="Enter your last name" />
            <Input type="password" label="Password" placeholder="Enter password" />
            <Button fullWidth color="primary">
              Register
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
