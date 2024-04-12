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
import { useState } from "react";

const courses = [
  {
    id: "f95767a1-f589-480d-be17-1ed31c23eed6",
    courseName: "Introduction to Finance, Accounting, Modeling and Valuation",
    courseDescription:
      "Learn Finance & Accounting from Scratch by an Award Winning MBA Professor, Ivy Grad, worked @ Goldman & VC",
    fees: 149.99,
    currency: "GBP",
    department: "FINANCE",
  },
  {
    id: "0da0df76-cb7a-4e0d-be04-70c7b64a65d0",
    courseName: "The Complete 2024 Web Development Bootcamp",
    courseDescription:
      "Become a Full-Stack Web Developer with just ONE course. HTML, CSS, Javascript, Node, React, PostgreSQL, Web3 and DApps",
    fees: 49.99,
    currency: "GBP",
    department: "COMPUTER_SCIENCE",
  },
  {
    id: "7f57cb7f-7eac-4ae2-a2e5-3633eb5fdbd9",
    courseName: "Software Development and IT - Complete Guide To Key Concepts",
    courseDescription:
      "For new joiners in IT industry: basics of apps, APIs, testing, Cloud, GIT, deployment, containerisation, SDLC, Scrum..",
    fees: 49.99,
    currency: "GBP",
    department: "COMPUTER_SCIENCE",
  },
  {
    id: "8efb5fe6-d67f-4cd8-9e3e-d4bb89286ab4",
    courseName: "Software Engineering 101: Plan and Execute Better Software.",
    courseDescription:
      "Software Engineering 101: Use Software Engineering to Plan and Build Amazing Software + Learn SCRUM Framework!",
    fees: 100.0,
    currency: "GBP",
    department: "COMPUTER_SCIENCE",
  },
  {
    id: "28740f82-5f06-408a-b7e9-4dc75a5784e8",
    courseName: "Accounting: From Beginner to Advanced!",
    courseDescription:
      "Learn accounting like never before. Learn from an Award-Winning Professor and Expert in Accounting!",
    fees: 50.0,
    currency: "GBP",
    department: "ACCOUNTING",
  },
  {
    id: "b4750fe5-df3c-4610-8c62-70f76dc858d5",
    courseName: "Accounting & Financial Statement Analysis: Complete Training",
    courseDescription:
      "Accounting & Financial Ratio Analysis made easy. Learn important accounting skills that will get your foot in the door!",
    fees: 75.0,
    currency: "GBP",
    department: "ACCOUNTING",
  },
  {
    id: "5984c9d5-ae8c-49ff-8846-d3598e9a2a96",
    courseName: "Fundamentals of Business Accounting 1: Learn Quick and Easy",
    courseDescription:
      "Learn Basic Accounting & Finance in 60 Minutes! Learn How to Build & Analyze Financial Statements. Improve your Business",
    fees: 99.0,
    currency: "GBP",
    department: "ACCOUNTING",
  },
];

interface Course {
  id: string;
  courseName: string;
  courseDescription: string;
  fees: number;
  currency: string;
  department: string;
}

export default function Enrollments() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

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
      <h1 className="text-4xl text-center font-bold my-20">Enrolled Courses</h1>

      <div className="m-auto flex justify-center max-w-screen-2xl">
        <Table isStriped aria-label="Example static collection table">
          <TableHeader>
            <TableColumn minWidth="100">Sl No.</TableColumn>
            <TableColumn minWidth="100">Course Name</TableColumn>
            <TableColumn minWidth="100">Course Department</TableColumn>
            <TableColumn minWidth="100">Course Fees</TableColumn>
            <TableColumn minWidth="100">Action</TableColumn>
          </TableHeader>
          <TableBody>
            {courses?.map((course, index) => {
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
            })}
          </TableBody>
        </Table>

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
