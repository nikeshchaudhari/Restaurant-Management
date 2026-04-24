import { useEffect } from 'react'
import {  Outlet, useNavigate } from 'react-router-dom';

const AdminProtected = ({children}:any) => {

    const navigate =useNavigate()
    useEffect(()=>{

        const role = localStorage.getItem("role")
        if(role!=="admin"){
            navigate("/login")
        }

    },[])
  return children ? children :<Outlet/>
}

export default AdminProtected
