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
import { useDispatch, useSelector } from "react-redux";
import { setInvoices } from "../../redux/user";
import toast from "react-hot-toast";
import { Invoice } from "../../types/invoices";

export default function Courses() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);

  const invoices = useSelector((state: any) => state.user.invoices);
  const user = useSelector((state: any) => state.user.user);

  const dispatch = useDispatch();

  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    const coursesURI = import.meta.env.VITE_FINANCE_API_URL + "/api/invoice";
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

      toast.success(responseData.message);
      dispatch(setInvoices(responseData?.invoices));
    } catch (error: any) {
      toast.error(error.message);
      console.error(error || "Failed to sign in");
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

  const handleEnroll = async (invoice: Invoice | null, onClose: () => void) => {
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

  return (
    <div>
      <h1 className="text-4xl text-center font-bold my-10">Hello, {`${user?.firstname} ${user?.lastname}`}</h1>

      <h3 className="text-xl text-center my-10">
        Email: {`${user?.email}`} | Student ID: {`${user.studentId}`}
      </h3>

      <h1 className="text-4xl text-center font-bold my-10">Invoices</h1>
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
              {invoices?.length
                ? invoices?.map((invoice: Invoice, index: number) => {
                    return (
                      <TableRow key={invoice._id}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{invoice._id}</TableCell>
                        <TableCell>{invoice.title}</TableCell>
                        <TableCell>{invoice.status}</TableCell>
                        <TableCell>{invoice.type}</TableCell>
                        <TableCell>{`${invoice.currency} ${invoice.amount}`}</TableCell>
                        <TableCell>
                          <Button
                            disabled={invoice.status === "PAID"}
                            isDisabled={invoice.status === "PAID"}
                            onClick={() => handleInvoiceModal(invoice)}
                            color="primary"
                          >
                            Pay
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })
                : []}
            </TableBody>
          </Table>
          {!invoices?.length ? <p className="text-center text-2xl font-bold my-20">No Invoices Available</p> : ""}
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
                      handleEnroll(selectedInvoice, onClose);
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
