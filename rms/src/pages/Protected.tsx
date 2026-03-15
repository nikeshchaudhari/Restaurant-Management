import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom"

const Protected = ({children}:any) => {

const navigate = useNavigate()
useEffect(()=>{
const token = localStorage.getItem("token")
const role = localStorage.getItem("role")

if(!token || role !=="admin"){
navigate("/login")
}
},[])
  return children? children:<Outlet/>
}

export default Protected;
