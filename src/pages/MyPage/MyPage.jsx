import React, { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import axiosInstance from "../../utils/axios";
import Cookies from "js-cookie";

const userId = Cookies.get('userId');

const MyPage = () => {
  const [user, setUser] = useState({ name: "" });
  const [order, setOrder] = useState(null);
  const [products, setProducts] = useState({});

  useEffect(() => {
    getUser(userId);
    getOrder(userId);
  }, [userId]);

  const getUser = async (userId) => {
    try {
      const res = await axiosInstance.get(`/user/${userId}`);
      setUser(res.data.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const getOrder = async (userId) => {
    try {
      const res = await axiosInstance.get(`/order/${userId}`);
      const orders = res.data.data;
  
      // Group orders by a combination of createdAt, totalPrice, and productId
      const groupedOrders = {};
      orders.forEach((order) => {
        const key = `${order.createdAt}-${order.totalPrice}`;
        if (!groupedOrders[key]) {
          groupedOrders[key] = order;
        }
      });
  
      // Convert the grouped object back to an array
      const uniqueOrders = Object.values(groupedOrders);
      setOrder(uniqueOrders);
      
      // Fetch product information for each productId
      const productIds = uniqueOrders.map(order => order.productId);
      const products = {};
      for (const productId of productIds) {
        const productRes = await axiosInstance.get(`/product/${productId}`);
        products[productId] = productRes.data.data.name;
      }
      setProducts(products);
    } catch (error) {
      console.error('Error fetching order data:', error);
    }
  };

  return (
    <div>
      <Header />
      <div className="myPage_delivery">
        <div id="myPage">
          <h2>
            어서오세요!<br /> {user.name}님 🐾
          </h2>
          <ul className="delivery_state">
            <li>임금대기</li>
            <p>〉</p>
            <li>결제완료</li>
            <p>〉</p>
            <li>상품준비중</li>
            <p>〉</p>
            <li>배송중</li>
            <p>〉</p>
            <li>배송완료</li>
          </ul>
        </div>
      </div>
      <div className="myPage_delivery">
      <div>
        <nav>
          <div className="myPage_container">
            <h3>나의 쇼핑정보</h3>
              <a href="/myPage">주문배송조회</a>
            <br></br>
            <h3>나의 계정</h3>
              <a href="/modify">회원정보</a>
          </div>
        </nav>
      </div>
      <div className="delivery_info"> 
        <div className="delivery_content">
          <table id="delivery_table">
            <thead>
              <tr>
                <th>주문일</th>
                <th>상품명</th>
                <th>결제수단</th>
                <th>총 결제금액</th>
                <th>주문상태</th>
              </tr>
            </thead>
            <tbody>
              {order && order.map((item, index) => (
                <tr key={index}>
                  <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                  <td>{products[item.productId]}</td>
                  <td>{item.payment}</td>
                  <td>{item.totalPrice}원</td>
                  <td>{item.orderStatus}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      </div>
    </div>
  );
};

export default MyPage;