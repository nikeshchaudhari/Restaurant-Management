import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from "./pages/Home"
import SignUp from "./pages/SignUp"
import SignIn from "./pages/SignIn"
import { ToastContainer } from "react-toastify"
import Dashboard from "./pages/Dashboard"
import AdminDashboard from "./pages/AdminDashboard"
import UserAdd from "./pages/UserAdd"
import Error from "./pages/Error"
import TableBooks from "./pages/TableBooks"
import Menu from "./pages/Menu"
import Protected from './pages/Protected';
import Order from "./pages/Order"
import Setting from "./pages/Setting"
import Stock from "./pages/Stock"
// import AllMenu from "./pages/ui/AllMenu"



export const myroute=createBrowserRouter([
  
{path:"",element:
  <Home/>
},
{path:"home",element:<Home/>},
{path:"signup",element:<SignUp/>},
{path:"login",element:<SignIn/>},
{path:"dashboard",element:<Protected><Dashboard/></Protected> ,children:[
  {path:"",element:<AdminDashboard/>},
  {path:"admin",element:<AdminDashboard/>},
  {path:"useradd",element:<UserAdd/>},
  {path:"table",element:<TableBooks/>},
  {path:"menu",element:<Menu/>},
  {path:"order",element:<Order/>},
  {path:"setting",element:<Setting/>},
  {path:"stocks",element:<Stock/>}
  
  
  
]},
{path:"*",element:<Error/>},
// {path:"all-menu",element:<AllMenu menu={[]}/>}
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
