import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './Login/Login';
import RequireAuth from './Login/RequireAuth';
import Signup from './Login/Signup';
import AOS from "aos";
import "aos/dist/aos.css";
import Home from './Pages/Home/Home';
import ItemDetail from './Pages/Items/ItemDetail';
import Items from './Pages/Items/Items';
import NotFound from './Pages/NotFound/NotFound';
import Footer from './Shared/Footer';
import Navbar from './Shared/Navbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from './Pages/Dashboard/Dashboard';
import MyReview from './Pages/Dashboard/MyReview';
import MyProfile from './Pages/Dashboard/MyProfile';
import MyOrders from './Pages/Dashboard/MyOrders';
import Payment from './Pages/Dashboard/Payment';
import Users from './Pages/Dashboard/Users';
import MyPortfolio from './Pages/MyPortfolio/MyPortfolio';
import RequireAdmin from './Login/RequireAdmin';
import ManageAllOrders from './Pages/Dashboard/Admin/ManageAllOrders';
import AddProduct from './Pages/Dashboard/Admin/AddProduct';
import Teams from './Pages/Teams/Teams';
import DeleteProduct from './Pages/Dashboard/Admin/DeleteProduct';
import { useEffect } from 'react';
import RequireUser from './Login/RequireUser';

function App() {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <Navbar>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/login' element={<Login></Login>} />
        <Route path='/signup' element={<Signup></Signup>} />
        <Route path='/items' element={<Items></Items>}></Route>
        <Route path='team' element={<Teams></Teams>}></Route>
        <Route path='/portfolio' element={<MyPortfolio></MyPortfolio>}></Route>
        <Route path='/items/:id' element={<RequireAuth><ItemDetail></ItemDetail></RequireAuth>}></Route>
        <Route path='dashboard' element={
          <RequireAuth>
            <Dashboard />
          </RequireAuth>
        } >
          <Route index element={<MyProfile></MyProfile>}></Route>
          <Route path='review' element={<RequireUser><MyReview></MyReview></RequireUser>}></Route>
          <Route path="orders" element={<RequireUser><MyOrders></MyOrders></RequireUser>}></Route>
          <Route path="payment/:id" element={<Payment></Payment>}></Route>
          <Route path='manageorders' element={<RequireAdmin><ManageAllOrders></ManageAllOrders></RequireAdmin>}></Route>
          <Route path='addProduct' element={<RequireAdmin><AddProduct></AddProduct></RequireAdmin>}></Route>
          <Route path='deleteproduct' element={<RequireAdmin><DeleteProduct></DeleteProduct></RequireAdmin>}></Route>
          <Route path="user" element={<RequireAdmin><Users></Users></RequireAdmin>}></Route>
        </Route>
        <Route path='*' element={<NotFound></NotFound>}></Route>
      </Routes>
      <Footer></Footer>
      <ToastContainer />
    </Navbar>
  );
}

export default App;
