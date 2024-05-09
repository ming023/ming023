import { useEffect, useState } from "react";
import AdminHeader from "../../Admin/Admin_Header";
import Order_Button from "./Order_Button";
import axiosInstance from "../../../utils/axios";
import { useParams } from "react-router";
const OrderDetail = () => {

  const { userId, createdAt } = useParams();
  const [order, setOrder] = useState(null);
  const [user, setUser] = useState(null);

  console.log(userId, createdAt);

  useEffect(() => {
    getOrder(userId, createdAt);
    getUser(userId)
  }, [userId, createdAt]);

  const getOrder = async (userId, createdAt) =>{
    try{
      const res = await axiosInstance.get(`/admin/order/${userId}/${createdAt}`);
      setOrder(res.data.data);
      console.log(res.data)
    } catch(error){
      console.error(error);
    };
  };

  const getUser = async (userId) => {
    try{
      const res = await axiosInstance.get(`/admin/user/${userId}`);
      setUser(res.data.data)
    } catch(error){
      console.error(error);
    };
  }

  console.log(order)
  console.log(user)

  return (
    <div>
      <AdminHeader />
      <div className="orderDetail_container">
        <div>
          <h3>주문상세</h3>
          {user ? (
          <>
            <div>
              <table className="orderDetail">
                <thead>
                  <tr>
                    <th>유저번호</th>
                    <th>이름</th>
                    <th>연락처</th>
                    <th>우편번호</th>
                    <th>도로명주소</th>
                    <th>상세주소</th>
                  </tr>
                </thead>
                <tbody>
                    <tr>
                      <td>{user.userId}</td>
                      <td>{user.name}</td>
                      <td>{user.phone}</td>
                      <td>{user.zipCode}</td>
                      <td>{user.address1}</td>
                      <td>{user.address2}</td>
                    </tr>
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <p>Loading...</p>
        )}
          {order ? (
          <>
            <div>
              <table className="orderDetail">
                <thead>
                  <tr>
                    <th>주문번호</th>
                    <th>유저번호</th>
                    <th>상품번호</th>
                    <th>수량</th>
                    <th>금액</th>
                    <th>주문상태</th>
                    <th>주문일자</th>
                  </tr>
                </thead>
                <tbody>
                  {order.map((item, index) => (
                    <tr key={index}>
                      <td>{item.orderItemId}</td>
                      <td>{item.userId}</td>
                      <td>{item.productId}</td>
                      <td>{item.amount}개</td>
                      <td>{item.price}원</td>
                      <td>{item.orderStatus}</td>
                      <td>{item.createdAt}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p>총 금액 : {order[0].totalPrice}원</p>
              <a href="/order">
                <button id="pink_button">정보수정</button>
              </a>
              <a href="/order">
                <button id="blue_button">목록으로</button>
              </a>
            </div>
          </>
        ) : (
          <p>Loading...</p>
        )}
          
        </div>
      </div>
    </div>
  );
};
export default OrderDetail;
