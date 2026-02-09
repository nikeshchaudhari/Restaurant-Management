import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from "./pages/Home"
import SignUp from "./pages/SignUp"
import SignIn from "./pages/SignIn"
import { ToastContainer } from "react-toastify"
import AdminDashboard from "./pages/AdminDashboard"


export const myroute=createBrowserRouter([
{path:"",Component:Home},
{path:"home",Component:Home},
{path:"signup",Component:SignUp},
{path:"login",Component:SignIn},
{path:"admin",Component:AdminDashboard, children:[
  
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
