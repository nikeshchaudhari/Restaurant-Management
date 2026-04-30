import * as Yup from "yup";

export const TableValid = Yup.object({
  tableNumber: Yup.string().required("Table is required"),
  capacity: Yup.number().required("capacity is required"),
  status: Yup.string().required("Status is required"),
});
