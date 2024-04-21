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
  Input,
} from "@nextui-org/react";
import { useState } from "react";
import { useSelector } from "react-redux";

import toast from "react-hot-toast";
import { Invoice } from "../../types/invoices";

export default function SearchInvoices() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [searchInvoiceID, setSearchInvoiceID] = useState<string>("");
  const [searchedInvoices, setSearchedInvoices] = useState<Invoice | null>(null);

  const user = useSelector((state: any) => state.user.user);

  const fetchInvoices = async () => {
    const invoiceURI = import.meta.env.VITE_FINANCE_API_URL + "/api/invoice/" + searchInvoiceID;
    const token: String | null = localStorage.getItem("token");

    try {
      const response = await fetch(invoiceURI, {
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

      toast.success(responseData.message);
      setSearchedInvoices(responseData?.invoice);
    } catch (error: any) {
      toast.error(error.message);
      console.error(error || "No Invoices Found");
    }
  };

  const handleInvoiceModal = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    onOpen();
  };

  const handleCourseModelClose = () => {
    setSelectedInvoice(null);
    onOpenChange();
  };

  const handlePay = async (invoice: Invoice | null, onClose: () => void) => {
    const enrollURI = import.meta.env.VITE_FINANCE_API_URL + "/api/invoice/pay/" + invoice?._id;
    const token: String | null = localStorage.getItem("token");

    try {
      const response = await fetch(enrollURI, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const responseData = await response.json();

      if (responseData.status !== "success") {
        throw new Error(responseData.message);
      }

      toast.success(responseData.message);

      fetchInvoices();
      onClose();
    } catch (error: any) {
      toast.error(error.message);
      console.error(error || "Failed to enroll");
    }
  };

  const handleSearch = async () => {
    fetchInvoices();
  };

  return (
    <div>
      <h1 className="text-4xl text-center font-bold my-10">Hello, {`${user?.firstname} ${user?.lastname}`}</h1>

      <h3 className="text-xl text-center my-10">
        Email: {`${user?.email}`} | Student ID: {`${user.studentId}`}
      </h3>

      <h1 className="text-4xl text-center font-bold my-10">Search Invoice by ID</h1>

      <div className="m-auto flex items-center justify-center max-w-screen-2xl">
        <Input
          onChange={(event: any) => setSearchInvoiceID(event.target.value)}
          type="text"
          label="Invoice ID"
          placeholder="Please enter your Invoice ID"
        />
        <Button onClick={handleSearch} size="lg" color="primary" className="ml-10">
          Search
        </Button>
      </div>

      <br />

      <div className="m-auto flex justify-center max-w-screen-2xl">
        <div className="w-full">
          <Table isStriped aria-label="Example static collection table">
            <TableHeader>
              <TableColumn minWidth="100">Sl No.</TableColumn>
              <TableColumn minWidth="100">Invoice ID</TableColumn>
              <TableColumn minWidth="100">Invoice Title</TableColumn>
              <TableColumn minWidth="100">Invoice Status</TableColumn>
              <TableColumn minWidth="100">Invoice type</TableColumn>
              <TableColumn minWidth="100">Invoice Amount</TableColumn>
              <TableColumn minWidth="100">Action</TableColumn>
            </TableHeader>
            <TableBody>
              {searchedInvoices?._id ? (
                <TableRow key={searchedInvoices._id}>
                  <TableCell>{1}</TableCell>
                  <TableCell>{searchedInvoices._id}</TableCell>
                  <TableCell>{searchedInvoices.title}</TableCell>
                  <TableCell>{searchedInvoices.status}</TableCell>
                  <TableCell>{searchedInvoices.type}</TableCell>
                  <TableCell>{`${searchedInvoices.currency} ${searchedInvoices.amount}`}</TableCell>
                  <TableCell>
                    <Button
                      disabled={searchedInvoices.status === "PAID"}
                      isDisabled={searchedInvoices.status === "PAID"}
                      onClick={() => handleInvoiceModal(searchedInvoices)}
                      color="primary"
                    >
                      Pay
                    </Button>
                  </TableCell>
                </TableRow>
              ) : (
                []
              )}
            </TableBody>
          </Table>
          {!searchedInvoices?._id ? <p className="text-center text-2xl font-bold my-20">No Invoices Available</p> : ""}
        </div>

        <Modal size="2xl" isOpen={isOpen} onOpenChange={handleCourseModelClose}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1 text-2xl ">Invoice Details</ModalHeader>
                <ModalBody>
                  <h1 className="font-bold">Invoice ID</h1>
                  <p>{selectedInvoice?._id}</p>

                  <br />

                  <h1 className="font-bold">Student ID</h1>
                  <p>{selectedInvoice?.studentId}</p>

                  <br />

                  <h1 className="font-bold">Title</h1>
                  <p>{selectedInvoice?.title}</p>

                  <br />

                  <h1 className="font-bold">Amount Due</h1>
                  <p>
                    {selectedInvoice?.amount} {selectedInvoice?.currency}
                  </p>

                  <br />

                  <h1 className="font-bold">Due Date</h1>
                  <p>{selectedInvoice?.createdAt ? new Date(selectedInvoice?.createdAt).toUTCString() : ""}</p>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <Button
                    color="primary"
                    onPress={() => {
                      handlePay(selectedInvoice, onClose);
                    }}
                  >
                    Pay
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
