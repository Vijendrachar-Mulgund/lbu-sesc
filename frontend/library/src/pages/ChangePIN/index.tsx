import { Button } from "@nextui-org/react";
import LeedsBeckettUniversity from "../../assets/lbu_logo.svg";
import Alert from "../../ui/Alert/Alert";
import OtpInput from "react-otp-input";
import { useEffect, useState } from "react";
import { setUser } from "../../redux/user";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function ChangePIN() {
  const [pin, setPin] = useState<string>("");
  const [confirmPin, setConfirmPin] = useState<string>("");
  const [error, setError] = useState<string>("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setTimeout(() => {
      setError("");
    }, 5000);
  }, [error]);

  const submitPin = async () => {
    if (pin.length !== 6 || confirmPin.length !== 6 || pin !== confirmPin) {
      setError("Invalid PIN! Please enter a valid 6 digit PIN");
      return;
    }

    const changePin = import.meta.env.VITE_LIBRARY_API_URL + "/api/auth/change-pin/" + location.state?.email;

    try {
      const response = await fetch(changePin, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pin: pin,
        }),
      });

      const responseData = await response.json();

      if (responseData.status !== "success") {
        throw new Error(responseData.message);
      }

      toast.success(responseData.message);

      localStorage.setItem("token", responseData?.token);
      dispatch(setUser(responseData?.user));
      navigate("/");
    } catch (error: any) {
      setError(error?.message || "Failed to sign in");
      console.error(error || "Failed to sign in");
    }
  };

  return (
    <div className="flex min-h-full h-screen flex-1 flex-col justify-center items-center px-6 py-12 lg:px-8">
      {/* Logo Section */}
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img className="mx-auto h-24 w-auto" src={LeedsBeckettUniversity} alt="Leeds Beckett University Logo" />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Set a new PIN for your Library Portal
        </h2>
      </div>

      {/* Form Section */}
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        {error ? <Alert message={error} /> : null}

        <div className="mb-10">
          <div className="">Enter your new PIN</div>
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

          <br />

          <div className="">Confirm your new PIN</div>
          <OtpInput
            inputStyle={{
              borderRadius: "5px",
              border: "1px solid #ccc",
              marginRight: "10px",
              width: "40px",
              height: "50px",
            }}
            inputType="password"
            value={confirmPin}
            onChange={setConfirmPin}
            numInputs={6}
            renderInput={(props) => <input {...props} />}
          />
        </div>

        <Button onClick={submitPin} fullWidth color="primary">
          Login
        </Button>
      </div>
    </div>
  );
}

export default ChangePIN;
