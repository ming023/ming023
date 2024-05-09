// import { useEffect, useState } from "react";
// import AdminHeader from "../../Admin/Admin_Header";
// import "./Order.css";
// import Order_Button from "./Order_Button";
// import axiosInstance from "../../../utils/axios";
// const Order = () => {

//   const [orders, setOrders] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [orderPerPage] = useState(15);

//   useEffect(() => {
//     getOrders();
//   }, [currentPage]);

//   const getOrders = async () => {
//     try{
//       const res = await axiosInstance.get('/admin/orderList', {
//         params: {
//           page: currentPage,
//           limit: orderPerPage
//         }
//       });

//       console.log(res.data)
//       if(res.data && res.data.data){
//         setOrders(res.data.data);
//         console.log(res.data)
//       } else{
//         console.error('Invalid response format:', res.data);
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   }
//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   const displayOrders = () => {
//     const startIndex = (currentPage - 1) * orderPerPage;
//     const endIndex = startIndex + orderPerPage;
//     return orders.slice(startIndex, endIndex);
//   };

//   return (
//     <div>
//       <AdminHeader />
//       <div className="order">
//         <div className="orderManagement">
//           <h3>주문내역</h3>
//           <div className="order_container">
//             <table className="order_table">
//               <thead>
//                 <tr>
//                   <th>주문번호</th>
//                   <th>고객번호</th>
//                   <th>금액</th>
//                   <th>상품번호</th>
//                   <th>개수</th>
//                   <th>주문일자</th>
//                   <th>주문상태</th>
//                 </tr>
//               </thead>
//               <tbody>
//               {displayOrders().map((order) => (
//                 <tr key={order.orderItemId}>
//                   <td>{order.orderItemId}</td>
//                   <td>{order.userId}</td>
//                   <td>{order.totalPrice}원</td>
//                   <td>{order.productId}</td>
//                   <td>{order.amount}개</td>
//                   <td>{order.createdAt}</td>
//                   <td>{order.orderStatus}</td>
//                 </tr>
//               ))}
//                 {/* <tr>
//                   <td><a href="/orderDetail">xxxxx</a></td>
//                   <td>플러피</td>
//                   <td>2024.00.00</td>
//                   <td>플러피 세트</td>
//                   <td>
//                     <Order_Button />
//                   </td>
//                 </tr> */}

//               </tbody>
//             </table>
//             <div className="pagination">
//             {[...Array(Math.ceil(orders.length / orderPerPage)).keys()].map((number) => (
//               <button key={number + 1} onClick={() => paginate(number + 1)}>{number + 1}</button>
//             ))}
//           </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default Order;







// import { useEffect, useState } from "react";
// import AdminHeader from "../../Admin/Admin_Header";
// import "./Order.css";
// import Order_Button from "./Order_Button";
// import axiosInstance from "../../../utils/axios";

// const Order = () => {
//   const [orders, setOrders] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [orderPerPage] = useState(15);

//   useEffect(() => {
//     getOrders();
//   }, [currentPage]);

//   const getOrders = async () => {
//     try {
//       const res = await axiosInstance.get('/admin/orderList', {
//         params: {
//           page: currentPage,
//           limit: orderPerPage
//         }
//       });

//       if (res.data && res.data.data) {
//         const groupedOrders = groupOrders(res.data.data);
//         setOrders(groupedOrders);
//       } else {
//         console.error('Invalid response format:', res.data);
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const groupOrders = (orders) => {
//     const grouped = {};

//     orders.forEach(order => {
//       const key = `${order.createdAt}-${order.userId}-${order.totalPrice}`;
//       if (!grouped[key]) {
//         grouped[key] = [order];
//       } else {
//         grouped[key].push(order);
//       }
//     });

//     return Object.values(grouped);
//   };

//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   return (
//     <div>
//       <AdminHeader />
//       <div className="order">
//         <div className="orderManagement">
//           <h3>주문내역</h3>
//           <div className="order_container">
//             {orders.map((group, index) => (
//               <div key={index}>
//                 <h4>Group {index + 1}</h4>
//                 <table className="order_table">
//                   <thead>
//                     <tr>
//                       <th>주문번호</th>
//                       <th>고객번호</th>
//                       <th>금액</th>
//                       <th>상품번호</th>
//                       <th>개수</th>
//                       <th>주문일자</th>
//                       <th>주문상태</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {group.map((order, idx) => (
//                       <tr key={idx}>
//                         <td>{order.orderItemId}</td>
//                         <td>{order.userId}</td>
//                         <td>{order.totalPrice}원</td>
//                         <td>{order.productId}</td>
//                         <td>{order.amount}개</td>
//                         <td>{order.createdAt}</td>
//                         <td>{order.orderStatus}</td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             ))}
//             <div className="pagination">
//               {[...Array(Math.ceil(orders.length / orderPerPage)).keys()].map((number) => (
//                 <button key={number + 1} onClick={() => paginate(number + 1)}>{number + 1}</button>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Order;


// import { useEffect, useState } from "react";
// import AdminHeader from "../../Admin/Admin_Header";
// import "./Order.css";
// import Order_Button from "./Order_Button";
// import axiosInstance from "../../../utils/axios";

// const Order = () => {
//   const [orders, setOrders] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [orderPerPage] = useState(15);

//   useEffect(() => {
//     getOrders();
//   }, [currentPage]);

//   const getOrders = async () => {
//     try {
//       const res = await axiosInstance.get('/admin/orderList', {
//         params: {
//           page: currentPage,
//           limit: orderPerPage
//         }
//       });

//       if (res.data && res.data.data) {
//         const groupedOrders = groupOrders(res.data.data);
//         setOrders(groupedOrders);
//       } else {
//         console.error('Invalid response format:', res.data);
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const groupOrders = (orders) => {
//     const grouped = {};

//     orders.forEach(order => {
//       const key = `${order.createdAt}-${order.userId}-${order.totalPrice}`;
//       if (!grouped[key]) {
//         grouped[key] = [order];
//       } else {
//         grouped[key].push(order);
//       }
//     });

//     return Object.values(grouped);
//   };

//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   return (
//     <div>
//       <AdminHeader />
//       <div className="order">
//         <div className="orderManagement">
//           <h3>주문내역</h3>
//           <div className="order_container">
//             {orders.map((group, index) => (
//               <div key={index}>
//                 <h4>Group {index + 1}</h4>
//                 <table className="order_table">
//                   <thead>
//                     <tr>
//                       <th>주문번호</th>
//                       <th>고객번호</th>
//                       <th>금액</th>
//                       <th>상품번호</th>
//                       <th>개수</th>
//                       <th>주문일자</th>
//                       <th>주문상태</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {group.map((order, idx) => (
//                       <tr key={idx}>
//                         {idx === 0 && (
//                           <>
//                             <td rowSpan={group.length}>{order.orderItemId}</td>
//                             <td rowSpan={group.length}>{order.userId}</td>
//                             <td rowSpan={group.length}>{order.totalPrice}원</td>
//                           </>
//                         )}
//                         <td>{order.productId}</td>
//                         <td>{order.amount}개</td>
//                         <td>{order.createdAt}</td>
//                         <td>{order.orderStatus}</td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             ))}
//             <div className="pagination">
//               {[...Array(Math.ceil(orders.length / orderPerPage)).keys()].map((number) => (
//                 <button key={number + 1} onClick={() => paginate(number + 1)}>{number + 1}</button>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Order;





// import { useEffect, useState } from "react";
// import AdminHeader from "../../Admin/Admin_Header";
// import "./Order.css";
// import Order_Button from "./Order_Button";
// import axiosInstance from "../../../utils/axios";
// const Order = () => {

//   const [orders, setOrders] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [orderPerPage] = useState(15);

//   useEffect(() => {
//     getOrders();
//   }, [currentPage]);

//   const getOrders = async () => {
//     try{
//       const res = await axiosInstance.get('/admin/orderList', {
//         params: {
//           page: currentPage,
//           limit: orderPerPage
//         }
//       });

//       console.log(res.data)
//       if(res.data && res.data.data){
//         setOrders(res.data.data);
//         console.log(res.data)
//       } else{
//         console.error('Invalid response format:', res.data);
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   }
//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   const displayOrders = () => {
//     const startIndex = (currentPage - 1) * orderPerPage;
//     const endIndex = startIndex + orderPerPage;
//     return orders.slice(startIndex, endIndex);
//   };

//   return (
//     <div>
//       <AdminHeader />
//       <div className="order">
//         <div className="orderManagement">
//           <h3>주문내역</h3>
//           <div className="order_container">
//             <table className="order_table">
//               <thead>
//                 <tr>
//                   <th>주문번호</th>
//                   <th>고객번호</th>
//                   <th>금액</th>
//                   <th>상품번호</th>
//                   <th>개수</th>
//                   <th>주문일자</th>
//                   <th>주문상태</th>
//                 </tr>
//               </thead>
//               <tbody>
//               {displayOrders().map((order) => (
//                 <tr key={order.orderItemId}>
//                   <td>{order.orderItemId}</td>
//                   <td>{order.userId}</td>
//                   <td>{order.totalPrice}원</td>
//                   <td>{order.productId}</td>
//                   <td>{order.amount}개</td>
//                   <td>{order.createdAt}</td>
//                   <td>{order.orderStatus}</td>
//                 </tr>
//               ))}
//                 {/* <tr>
//                   <td><a href="/orderDetail">xxxxx</a></td>
//                   <td>플러피</td>
//                   <td>2024.00.00</td>
//                   <td>플러피 세트</td>
//                   <td>
//                     <Order_Button />
//                   </td>
//                 </tr> */}

//               </tbody>
//             </table>
//             <div className="pagination">
//             {[...Array(Math.ceil(orders.length / orderPerPage)).keys()].map((number) => (
//               <button key={number + 1} onClick={() => paginate(number + 1)}>{number + 1}</button>
//             ))}
//           </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default Order;





// import { useEffect, useState } from "react";
// import AdminHeader from "../../Admin/Admin_Header";
// import "./Order.css";
// import Order_Button from "./Order_Button";
// import axiosInstance from "../../../utils/axios";

// const Order = () => {
//   const [orders, setOrders] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [orderPerPage] = useState(15);

//   useEffect(() => {
//     getOrders();
//   }, [currentPage]);

//   const getOrders = async () => {
//     try {
//       const res = await axiosInstance.get('/admin/orderList', {
//         params: {
//           page: currentPage,
//           limit: orderPerPage
//         }
//       });

//       if (res.data && res.data.data) {
//         setOrders(res.data.data);
//       } else {
//         console.error('Invalid response format:', res.data);
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   return (
//     <div>
//       <AdminHeader />
//       <div className="order">
//         <div className="orderManagement">
//           <h3>주문내역</h3>
//           <div className="order_container">
//             <table className="order_table">
//               <thead>
//                 <tr>
//                   <th>주문번호</th>
//                   <th>고객번호</th>
//                   <th>금액</th>
//                   <th>상품번호</th>
//                   <th>개수</th>
//                   <th>주문일자</th>
//                   <th>주문상태</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {orders.map((order, idx) => (
//                   <tr key={idx}>
//                     <td>{order.orderItemId}</td>
//                     <td>{order.userId}</td>
//                     <td>{order.totalPrice}원</td>
//                     <td>{order.productId}</td>
//                     <td>{order.amount}개</td>
//                     <td>{order.createdAt}</td>
//                     <td>{order.orderStatus}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//             <div className="pagination">
//               {[...Array(Math.ceil(orders.length / orderPerPage)).keys()].map((number) => (
//                 <button key={number + 1} onClick={() => paginate(number + 1)}>{number + 1}</button>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Order;







import { useEffect, useState } from "react";
import AdminHeader from "../../Admin/Admin_Header";
import "./Order.css";
import Order_Button from "./Order_Button";
import axiosInstance from "../../../utils/axios";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [orderPerPage] = useState(15);

  useEffect(() => {
    getOrders();
  }, [currentPage]);

  const getOrders = async () => {
    try {
      const res = await axiosInstance.get('/admin/orderList', {
        params: {
          page: currentPage,
          limit: orderPerPage
        }
      });

      if (res.data && res.data.data) {
        setOrders(res.data.data);
      } else {
        console.error('Invalid response format:', res.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <AdminHeader />
      <div className="order">
        <div className="orderManagement">
          <h3>주문내역</h3>
          <div className="order_container">
            <table className="order_table">
              <thead>
                <tr>
                  <th>주문번호</th>
                  <th>고객번호</th>
                  <th>상품번호</th>
                  <th>개수</th>
                  <th>개별금액</th>
                  <th>총금액</th>
                  <th>주문상태</th>
                  <th>주문일자</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, idx) => (
                  <tr key={idx}>
                    <td>{order.orderItemId}</td>
                    {idx === 0 || (orders[idx - 1].createdAt !== order.createdAt || orders[idx - 1].userId !== order.userId || orders[idx - 1].totalPrice !== order.totalPrice || orders[idx -1].orderStatus !== order.orderStatus) ? (
                      <>
                        <td>
                        <a href={`/orderDetail/${order.userId}/${order.createdAt}`}>
                          {order.userId ? (
                            <>
                            {order.userId}
                            </>
                          ) : (
                            <>
                            탈퇴한 회원
                            </>
                          )}
                          </a>
                          </td>
                      </>
                    ) : (
                      <>
                        <td></td>
                      </>
                    )}
                    <td>{order.productId}</td>
                    <td>{order.amount}개</td>
                    <td>{order.price}원</td>
                    {idx === 0 || (orders[idx - 1].createdAt !== order.createdAt || orders[idx - 1].userId !== order.userId || orders[idx - 1].totalPrice !== order.totalPrice || orders[idx -1].orderStatus !== order.orderStatus) ? (
                      <>
                        <td>{order.totalPrice}원</td>
                        <td>{order.orderStatus}</td>
                        <td>
                        <a href={`/orderDetail/${order.userId}/${order.createdAt}`}>

                          {order.createdAt}
                        </a>
                          </td>
                      </>
                    ) : (
                      <>
                        <td></td>
                        <td></td>
                        <td></td>
                      </>
                    )}
                  </tr>
                // </a>
                ))}
              </tbody>
            </table>
            <div className="pagination">
              {[...Array(Math.ceil(orders.length / orderPerPage)).keys()].map((number) => (
                <button key={number + 1} onClick={() => paginate(number + 1)}>{number + 1}</button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;