import './App.css';import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './pages/Main/Main';
import Login from './pages/Login/Login';
import Error404 from './pages/Error404/Error404';
import Store from './pages/Store/Store';
import FAQ from './pages/FAQ/FAQ';
import Admin from './pages/Admin/AdminPage';
import User from './pages/Admin/User/UserPage';
import Order from './pages/Admin/Order/OrderPage';
import Product from './pages/Admin/Product/ProductList';
import SignUp from './pages/SignUp/Signup';
import Terms from './pages/SignUp/Terms';
import Modify from './pages/MyPage/User_Modify';
import MyPage from './pages/MyPage/MyPage';
import OrderList from './pages/Order/OrderList';
import OrderList2 from './pages/Order/OrderList2';
import Payment_Loading from './pages/Order/Payment_Loading';
import Payment_Complete from './pages/Order/Payment_Complete';
import Detail from './components/ProductDetail/Detail';
import ProductRegistration from './pages/Admin/Product/ProductRegistration';
import OrderDetail from './pages/Admin/Order/OrderDetail';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/store" element={<Store />} />
          <Route path="/store/:productId" element={<Detail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/admin" element={<Admin />}/>
          <Route path="/signUp" element={<SignUp />}/>
          <Route path="/user" element={<User />} />
          <Route path="/product" element={<Product />} />
          <Route path="/orderDetail/:userId/:createdAt" element={<OrderDetail />} />
          <Route path="/product/new" element={<ProductRegistration />} />
          <Route path="/order" element={<Order />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/payment_loading" element={<Payment_Loading/>} />
          <Route path="/payment_complete" element={<Payment_Complete/>} />
          <Route path="/modify" element={<Modify />} />
          <Route path="/orderList" element={<OrderList />} />
          <Route path="/orderList2" element={<OrderList2 />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
