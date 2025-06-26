
import './App.css';
import { Routes, Route } from "react-router-dom";
import HomePage from './pages/HomePage';
import About from './pages/About';
import Contact from './pages/Contact';
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';
import Dashboard from "./pages/user/Dashboard";
import PrivateRoute from "./components/Routes/Private";
import ForgotPasssword from './pages/Auth/ForgotPassword';
import AdminDashboard from './pages/Admin/AdminDashboard';
import CreateCaategory from './pages/Admin/CreateCaategory';
import CreateProduct from './pages/Admin/CreateProduct';
import UpdateProduct from './pages/Admin/UpdateProduct';
import Products from './pages/Admin/Products';
import Users from './pages/Admin/Users';
import AdminOrders from './pages/Admin/AdminOrders';
import Pagenotfound from './pages/Pagenotfound';
import Orders from './pages/user/Orders';
import Profile from './pages/user/Profile';
function App() {
  return (
    <>
<Routes>
  <Route path='/' element={<HomePage/>}/>
    <Route path="/dashboard" element={<PrivateRoute />}>
             <Route path="user" element={<Dashboard />} />
              <Route path="user/orders" element={<Orders />} />
              <Route path="user/profile" element={<Profile />} />
        </Route>
         <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
           <Route path="admin/create-category" element={<CreateCaategory />} />
          <Route path="admin/create-product" element={<CreateProduct />} />
          <Route path="admin/product/:slug" element={<UpdateProduct/>} />
          <Route path="admin/products" element={<Products />} />
          <Route path="admin/users" element={<Users/>} />
          <Route path="admin/orders" element={<AdminOrders />} />
        </Route>
  <Route path='/about' element={<About/>}/>
  <Route path='/contact' element={<Contact/>}/>
  <Route path='/register' element={<Register/>}/>
  <Route path='/login' element={<Login/>}/>
  <Route path='/*' element={<Pagenotfound/>}/>
  <Route path='/forgot-password' element={<ForgotPasssword/>}/>


</Routes>
    </>
  );
}

export default App;
 