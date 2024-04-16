import { useDispatch, useSelector } from "react-redux";
import { IUser } from "../../types/user";
import { useEffect, useState } from "react";
import { setEnrolledCourses } from "../../redux/courses";

interface IFees {
  balance: number | undefined;
  currency: string;
  message: string;
  status: string;
}

export default function Profile() {
  const [feesDue, setFeesDue] = useState<IFees | null>(null);
  const user: IUser = useSelector((state: any) => state.user.user);

  const dispatch = useDispatch();
  const enrolledCourses = useSelector((state: any) => state.courses.enrolledCourses);

  useEffect(() => {
    fetchEnrolledCourses();
    fetchFeesDue();
  }, []);

  const fetchFeesDue = async () => {
    const feesURI = import.meta.env.VITE_STUDENT_API_URL + "/api/user/check-balance";
    const token: String | null = localStorage.getItem("token");

    try {
      const response = await fetch(feesURI, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const responseData = await response.json();

      if (responseData.status !== "success") {
        throw new Error(responseData.message);
      }

      setFeesDue(responseData);
      return responseData?.feesDue;
    } catch (error: any) {
      console.error(error || "Failed to fetch fees due");
    }
  };

  const fetchEnrolledCourses = async () => {
    const coursesURI = import.meta.env.VITE_STUDENT_API_URL + "/api/user/enrolled-courses";
    const token: String | null = localStorage.getItem("token");

    try {
      const response = await fetch(coursesURI, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const responseData = await response.json();

      if (responseData.status !== "success") {
        throw new Error(responseData.message);
      }

      console.log("Test --- ", responseData);

      dispatch(setEnrolledCourses(responseData?.enrolledCourses));
    } catch (error: any) {
      console.error(error || "Failed to sign in");
    }
  };

  return (
    <div>
      <h1 className="text-4xl text-center font-bold my-20">Welcome, {user.firstname}!</h1>

      <div className="flex items-center justify-center mx-auto w-6/12	">
        <div className="mx-auto w-dvw  max-w-screen-xl">
          <div className="px-4 sm:px-0">
            <h3 className="text-base font-semibold leading-7 text-gray-900">Student Information</h3>
            <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Student details and Graduation information</p>
          </div>
          <div className="mt-6 border-t border-gray-100">
            <dl className="divide-y divide-gray-100">
              <div className="px-4 py-6 flex justify-between sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">Full name</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-0">{`${user.firstname} ${user.lastname}`}</dd>
              </div>
              <div className="px-4 py-6 flex justify-between sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">Admission Date</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700  sm:mt-0">{user.createdAt}</dd>
              </div>
              <div className="px-4 py-6 flex justify-between sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">Email address</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700  sm:mt-0">{user.email}</dd>
              </div>
              <div className="px-4 py-6 flex justify-between sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">Student ID</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700  sm:mt-0">{user.studentId}</dd>
              </div>
              <div className="px-4 py-6 flex justify-between sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">Fees Due</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700  sm:mt-0">
                  {feesDue?.balance ? `${feesDue.balance} ${feesDue.currency}` : "No fees due"}
                </dd>
              </div>
              <div className="px-4 py-6 flex justify-between sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">Graduation Status</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700  sm:mt-0">
                  {!feesDue?.balance && enrolledCourses?.length ? "Eligible" : "Not Eligible"}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
