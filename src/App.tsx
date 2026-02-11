import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from "./pages/Home"
import SignUp from "./pages/SignUp"
import SignIn from "./pages/SignIn"
import { ToastContainer } from "react-toastify"
import Dashboard from "./pages/Dashboard"
import AdminDashboard from "./pages/AdminDashboard"
import UserAdd from "./pages/UserAdd"


export const myroute=createBrowserRouter([
{path:"",Component:Home},
{path:"home",Component:Home},
{path:"signup",Component:SignUp},
{path:"login",Component:SignIn},
{path:"dashboard",Component:Dashboard, children:[
  {path:"",Component:AdminDashboard},
  {path:"admin",Component:AdminDashboard},
  {path:"useradd",Component:UserAdd}
  
]}
])
const App = () => {

  return (
   <>
   <RouterProvider router={myroute}/>
  <ToastContainer/>
   </>
  )
}

export default App
