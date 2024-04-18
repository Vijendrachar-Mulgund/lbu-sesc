import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setBorrowedBooks } from "../../redux/books";
import toast from "react-hot-toast";

export default function Enrollments() {
  const borrowedBooks = useSelector((state: any) => state.book.borrowedBooks);

  const dispatch = useDispatch();

  useEffect(() => {
    fetchEnrolledCourses();
  }, []);

  const fetchEnrolledCourses = async () => {
    const coursesURI = import.meta.env.VITE_LIBRARY_API_URL + "/api/user/borrowed";
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

      dispatch(setBorrowedBooks(responseData?.borrowedBooks));
      toast.success("Borrowed Books fetched successfully");
    } catch (error: any) {
      toast.error(error || "Failed to fetch Borrowed Books");
      console.error(error || "Failed to sign in");
    }
  };

  return (
    <div>
      <h1 className="text-4xl text-center font-bold my-20">Borrowed Books</h1>

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
            {borrowedBooks?.length
              ? borrowedBooks?.map((book: any, index: number) => {
                  return (
                    <TableRow key={book?.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{book?.id}</TableCell>
                      <TableCell>{book?.courseName}</TableCell>
                      <TableCell>{book?.department}</TableCell>
                      <TableCell>{`${book?.currency} ${book?.fees}`}</TableCell>
                    </TableRow>
                  );
                })
              : []}
          </TableBody>
        </Table>
      </div>

      {!borrowedBooks?.length && (
        <div className="text-center mt-10">
          <p className="text-xl">No Borrowed books</p>
        </div>
      )}
    </div>
  );
}
