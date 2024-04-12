import { useSelector } from "react-redux";
import { IUser } from "../../types/user";

export default function Profile() {
  const user: IUser = useSelector((state: any) => state.user.user);

  return (
    <div className="flex items-center justify-center h-screen mx-auto w-6/12	">
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
              <dd className="mt-1 text-sm leading-6 text-gray-700  sm:mt-0">None</dd>
            </div>
            <div className="px-4 py-6 flex justify-between sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">Graduation Status</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700  sm:mt-0">This is Test</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}
