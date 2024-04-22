import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button, Input } from "@nextui-org/react";
import { useState } from "react";

import toast from "react-hot-toast";

export default function Courses() {
  const [searchedBooks, setSearchedBooks] = useState<any>(null);
  const [searchText, setSearchText] = useState("");

  const fetchBooks = async () => {
    const booksURI = import.meta.env.VITE_LIBRARY_API_URL + "/api/book/" + searchText;
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

      console.log(responseData);

      toast.success("Book fetched successfully");
      setSearchedBooks(responseData.book);
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

      const responseData = await response.text();

      toast.success(responseData);
      fetchBooks();
    } catch (error: any) {
      toast.error("Failed to borrow book");
      console.error(error || "Failed to sign in");
    }
  };

  return (
    <div>
      <h1 className="text-4xl text-center font-bold my-20">Search Book by ISBN</h1>

      <div className="m-auto flex items-center justify-center max-w-screen-2xl">
        <Input
          onChange={(event: any) => setSearchText(event.target.value)}
          type="text"
          label="Search"
          placeholder="Please enter the ISBN"
        />

        <Button size="lg" onClick={fetchBooks} color="primary" className="ml-10">
          Search
        </Button>
      </div>

      <br />

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
              {searchedBooks?.isbn ? (
                <TableRow key={searchedBooks.id}>
                  <TableCell>{1}</TableCell>
                  <TableCell>{searchedBooks.isbn}</TableCell>
                  <TableCell>{searchedBooks.title}</TableCell>
                  <TableCell>{searchedBooks.author}</TableCell>
                  <TableCell>{searchedBooks.year}</TableCell>
                  <TableCell>{searchedBooks.copies}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleBorrowBook(searchedBooks)} color="primary">
                      Borrow
                    </Button>
                  </TableCell>
                </TableRow>
              ) : (
                []
              )}
            </TableBody>
          </Table>
          {!searchedBooks?.isbn ? <p className="text-center text-2xl font-bold my-20">No Books Available</p> : ""}
        </div>
      </div>
    </div>
  );
}
