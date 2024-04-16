import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setEnrolledCourses } from "../../redux/courses";
import toast from "react-hot-toast";

export default function Enrollments() {
  const courses = useSelector((state: any) => state.courses.enrolledCourses);

  const dispatch = useDispatch();

  useEffect(() => {
    fetchEnrolledCourses();
  }, []);

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

      dispatch(setEnrolledCourses(responseData?.enrolledCourses));
      toast.success("Enrolled courses fetched successfully");
    } catch (error: any) {
      toast.error(error || "Failed to fetch enrolled courses");
      console.error(error || "Failed to sign in");
    }
  };

  return (
    <div>
      <h1 className="text-4xl text-center font-bold my-20">Enrolled Courses</h1>

      <div className="m-auto flex justify-center max-w-screen-2xl">
        <Table isStriped aria-label="Example static collection table">
          <TableHeader>
            <TableColumn minWidth="100">Sl No.</TableColumn>
            <TableColumn minWidth="100">Course ID</TableColumn>
            <TableColumn minWidth="100">Course Name</TableColumn>
            <TableColumn minWidth="100">Course Department</TableColumn>
            <TableColumn minWidth="100">Course Fees</TableColumn>
          </TableHeader>
          <TableBody>
            {courses?.length
              ? courses?.map((course: any, index: number) => {
                  return (
                    <TableRow key={course?.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{course?.id}</TableCell>
                      <TableCell>{course?.courseName}</TableCell>
                      <TableCell>{course?.department}</TableCell>
                      <TableCell>{`${course?.currency} ${course?.fees}`}</TableCell>
                    </TableRow>
                  );
                })
              : []}
          </TableBody>
        </Table>
      </div>

      {!courses?.length && (
        <div className="text-center mt-10">
          <p className="text-xl">No courses enrolled yet</p>
        </div>
      )}
    </div>
  );
}
