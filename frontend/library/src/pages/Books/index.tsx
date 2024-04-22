import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button } from "@nextui-org/react";
import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { setBooks } from "../../redux/books";
import toast from "react-hot-toast";

export default function Books() {
  const books = useSelector((state: any) => state.book.books);

  const dispatch = useDispatch();

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    const booksURI = import.meta.env.VITE_LIBRARY_API_URL + "/api/book";
    const token: String | null = localStorage.getItem("token");

    try {
      const response = await fetch(booksURI, {
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

      dispatch(setBooks(responseData?.books));
    } catch (error: any) {
      console.error(error || "Failed to sign in");
    }
  };

  const handleBorrowBook = async (book: any) => {
    const borrowBookURI = import.meta.env.VITE_LIBRARY_API_URL + "/api/user/borrow/" + book.isbn;
    const token: String | null = localStorage.getItem("token");

    try {
      const response = await fetch(borrowBookURI, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status !== 200) {
        const responseError = await response.json();
        if (responseError.status === "error") {
          toast.error(responseError.error);
          return;
        }
      }

      const responseData = await response.text();

      toast.success(responseData);
      fetchBooks();
    } catch (error: any) {
      toast.error(error.message || "Failed to borrow book");
      console.error(error || "Failed to sign in");
    }
  };

  return (
    <div>
      <h1 className="text-4xl text-center font-bold my-20">All Available Books</h1>

      <div className="m-auto flex justify-center max-w-screen-2xl">
        <div className="w-full">
          <Table isStriped aria-label="Example static collection table">
            <TableHeader>
              <TableColumn minWidth="100">Sl No.</TableColumn>
              <TableColumn minWidth="100">Book ISBN</TableColumn>
              <TableColumn minWidth="100">Book Name</TableColumn>
              <TableColumn minWidth="100">Author</TableColumn>
              <TableColumn minWidth="100">Year</TableColumn>
              <TableColumn minWidth="100">Copies</TableColumn>
              <TableColumn minWidth="100">Action</TableColumn>
            </TableHeader>
            <TableBody>
              {books?.length
                ? books?.map((book: any, index: number) => {
                    return (
                      <TableRow key={book.id}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{book.isbn}</TableCell>
                        <TableCell>{book.title}</TableCell>
                        <TableCell>{book.author}</TableCell>
                        <TableCell>{book.year}</TableCell>
                        <TableCell>{book.copies}</TableCell>
                        <TableCell>
                          <Button onClick={() => handleBorrowBook(book)} color="primary">
                            Borrow
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })
                : []}
            </TableBody>
          </Table>
          {!books?.length ? <p className="text-center text-2xl font-bold my-20">No Books Available</p> : ""}
        </div>
      </div>
    </div>
  );
}
