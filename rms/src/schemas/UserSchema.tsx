import * as Yup from "yup"

export const User = Yup.object({
fullName:Yup.string().min(2).required("Full Name is required"),
email:Yup.string().email("Invalid email").required("Email required"),
password:Yup.string().min(6,"Min 6 character").matches(/[a-z]/, "Must contain lowercase letter"). matches(/[A-z]/,"Must contain uppercase letter").matches(/[0-9]/,"Must contain number").matches(/[!@#$%^&*()?]/,"Must contain special character").required("Password required"),
role:Yup.string().required("Role is required")
})