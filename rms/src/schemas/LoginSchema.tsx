import * as Yup  from "yup"

export const Login = Yup.object({
    email:Yup.string().email("Invalid email").required("Email required"),
    password:Yup.string().min(6, "Min 6 characters").required("Password required")

})
