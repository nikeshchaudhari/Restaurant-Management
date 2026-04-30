import * as Yup from "yup"

export const MenuValid = Yup.object({
    menuName:Yup.string().min(2).required("Menu Name is required"),
    price:Yup.number().required("Price is required"),
    category:Yup.string().min(2).required("Category is required"),
    available:Yup.string().min(2).required("Status is required"),
    photo:Yup.mixed().required("Image is required").test("fileSize","File to large",(value:any)=>value && value.size <=20000000).test("File type","Only Jpeg,png,jpg",(value:any)=>value &&  ["image/jpeg", "image/png", "image/jpg"].includes(value.type))
})