import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom"

const Protected = ({children}:any) => {

const navigate = useNavigate()
useEffect(()=>{
const token = localStorage.getItem("token")

if(!token){
navigate("/login")
}
},[])
  return children? children:<Outlet/>
}

export default Protected;
