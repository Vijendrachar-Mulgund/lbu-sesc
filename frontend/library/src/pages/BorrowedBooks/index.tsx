import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button } from "@nextui-org/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setBorrowedBooks } from "../../redux/books";
import toast from "react-hot-toast";

export default function Enrollments() {
  const borrowedBooks = useSelector((state: any) => state.book.borrowedBooks);
  const user = useSelector((state: any) => state.user.user);

  const dispatch = useDispatch();

  useEffect(() => {
    fetchBorrowedBooks();
  }, []);

  const fetchBorrowedBooks = async () => {
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

      dispatch(setBorrowedBooks(responseData?.books));
      toast.success("Borrowed Books fetched successfully");
    } catch (error: any) {
      toast.error(error || "Failed to fetch Borrowed Books");
      console.error(error || "Failed to sign in");
    }
  };

  const getDate = (date: string) => {
    return `${new Date(date).toUTCString()}`;
  };

  const handleReturnBook = async (book: any) => {
    const returnBookURI = import.meta.env.VITE_LIBRARY_API_URL + "/api/user/return/" + book.id;
    const token: String | null = localStorage.getItem("token");

    try {
      const response = await fetch(returnBookURI, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const responseData = await response.text();

      fetchBorrowedBooks();

      toast.success(responseData);
    } catch (error: any) {
      toast.error(error || "Failed to return book");
      console.error(error || "Failed to return book");
    }
  };

  return (
    <div>
      <h1 className="text-4xl text-center font-bold my-10">Hello, {`${user?.firstname} ${user?.lastname}`}</h1>

      <h3 className="text-xl text-center my-10">
        Email: {`${user?.email}`} | Student ID: {`${user.studentId}`}
      </h3>

      <h1 className="text-4xl text-center font-bold my-10">Borrowed Books</h1>

      <div className="m-auto flex justify-center max-w-screen-2xl">
        <Table isStriped aria-label="Example static collection table">
          <TableHeader>
            <TableColumn minWidth="100">Sl No.</TableColumn>
            <TableColumn minWidth="100">Borrow ID</TableColumn>
            <TableColumn minWidth="100">Borrow ISBN</TableColumn>
            <TableColumn minWidth="100">Book Title</TableColumn>
            <TableColumn minWidth="100">Borrow Date</TableColumn>
            <TableColumn minWidth="100">Due Date</TableColumn>
            <TableColumn minWidth="100">Return Date</TableColumn>
            <TableColumn minWidth="100">Action</TableColumn>
          </TableHeader>
          <TableBody>
            {borrowedBooks?.length
              ? borrowedBooks?.map((book: any, index: number) => {
                  return (
                    <TableRow key={book?.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{book?.id}</TableCell>
                      <TableCell>{book?.isbn}</TableCell>
                      <TableCell>{book?.title}</TableCell>
                      <TableCell>{getDate(book?.borrowedDate)}</TableCell>
                      <TableCell>{getDate(book?.dueDate)}</TableCell>
                      <TableCell>{book?.returnedDate ? getDate(book?.returnedDate) : "Pending"}</TableCell>
                      <TableCell>
                        <Button
                          color="primary"
                          isDisabled={book?.returnedDate !== null}
                          onClick={() => handleReturnBook(book)}
                        >
                          Return
                        </Button>
                      </TableCell>
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
