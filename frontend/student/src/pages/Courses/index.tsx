import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { Course } from "../../types/courses";
import { useDispatch, useSelector } from "react-redux";
import { setCourses } from "../../redux/courses";

export default function Courses() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const courses: Course[] = useSelector((state: any) => state.courses.courses);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!courses || !courses.length) {
      fetchCourses();
    }
  }, []);

  const fetchCourses = async () => {
    const coursesURI = import.meta.env.VITE_STUDENT_API_URL + "/api/course";
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

      console.log(responseData.courses);

      dispatch(setCourses(responseData?.courses));
    } catch (error: any) {
      console.error(error || "Failed to sign in");
    }
  };

  const handleCourseModal = (course: Course) => {
    setSelectedCourse(course);
    onOpen();
  };

  const handleCourseModelClose = () => {
    setSelectedCourse(null);
    onOpenChange();
  };

  return (
    <div>
      <h1 className="text-4xl text-center font-bold my-20">All Available Courses</h1>

      <div className="m-auto flex justify-center max-w-screen-2xl">
        <div className="w-full">
          <Table isStriped aria-label="Example static collection table">
            <TableHeader>
              <TableColumn minWidth="100">Sl No.</TableColumn>
              <TableColumn minWidth="100">Course Name</TableColumn>
              <TableColumn minWidth="100">Course Department</TableColumn>
              <TableColumn minWidth="100">Course Fees</TableColumn>
              <TableColumn minWidth="100">Action</TableColumn>
            </TableHeader>
            <TableBody>
              {courses?.length
                ? courses?.map((course, index) => {
                    return (
                      <TableRow key={course.id}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{course.courseName}</TableCell>
                        <TableCell>{course.department}</TableCell>
                        <TableCell>{`${course.currency} ${course.fees}`}</TableCell>
                        <TableCell>
                          <Button onClick={() => handleCourseModal(course)} color="primary">
                            Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })
                : []}
            </TableBody>
          </Table>
          {!courses?.length ? <p className="text-center text-2xl font-bold my-20">No Courses Available</p> : ""}
        </div>

        <Modal size="2xl" isOpen={isOpen} onOpenChange={handleCourseModelClose}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1 text-2xl ">Course Details</ModalHeader>
                <ModalBody>
                  <h1 className="font-bold">Course ID</h1>
                  <p>{selectedCourse?.id}</p>

                  <br />

                  <h1 className="font-bold">Course Title</h1>
                  <p>{selectedCourse?.courseName}</p>

                  <br />

                  <h1 className="font-bold">Course Description</h1>
                  <p>{selectedCourse?.courseDescription}</p>

                  <br />

                  <h1 className="font-bold">Course Fees</h1>
                  <p>{`${selectedCourse?.currency} ${selectedCourse?.fees}`}</p>

                  <br />

                  <h1 className="font-bold">Course Department</h1>
                  <p>{selectedCourse?.courseDescription}</p>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <Button color="primary" onPress={onClose}>
                    Enroll
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    </div>
  );
}
