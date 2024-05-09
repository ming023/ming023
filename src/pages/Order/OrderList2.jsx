import Header from "../../components/Header/Header";
import { useState, useEffect } from "react";
import "./OrderList.css";
import {Address_info} from '../MyPage/User_Modify';
import axiosInstance from "../../utils/axios";
import { useLocation } from "react-router";

const OrderList2 = (props) => {
  const [allCheck, setAllCheck] = useState(false);
  const [useCheck, setUseCheck] = useState(false);
  const [provideCheck, setProvideCheck] = useState(false);
  const [serviceCheck, setServiceCheck] = useState(false);
  const [userData, setUserData] = useState(null); // 유저 정보 상태 추가
  const [productData, setProductData] = useState([]); // 상품 정보 상태 추가
  const [paymentMethod, setPaymentMethod] = useState(""); // 결제 방법 상태 추가

  const location = useLocation();
  const orderData = location.state.orderData;
  console.log(orderData)

  let userId = ''; // 기본값으로 빈 문자열 설정

  const userIdCookie = document.cookie.split('; ').find(row => row.startsWith('userId'));
  if (userIdCookie) {
      userId = userIdCookie.split('=')[1];
  } else {
      console.log('userId 쿠키가 없습니다.');
  // 여기서 쿠키가 없는 경우에 대한 처리를 추가합니다.
  // 예를 들어, 로그인 페이지로 리디렉션하거나 기본값으로 설정할 수 있습니다.
  // userId = '기본값';
  }
  let shippingFee = 3000; // 기본 배송비
  const finalTotalPrice = (orderData.quantity * orderData.productPrice) >= 50000 ? (orderData.quantity * orderData.productPrice) : (orderData.quantity * orderData.productPrice) + shippingFee;
  if((orderData.quantity * orderData.productPrice) >= 50000){
    shippingFee = 0;
  }

  useEffect(() => {
    // userId로 user 정보 가져오기
    const fetchUserData = async () => {
      try {
        const res = await axiosInstance.get(`/user/${userId}`);
        setUserData(res.data); // 유저 정보 설정
        console.log(res.data)
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    const fetchProductData = async () => {
      // console.log(props)
    };

    fetchUserData(); // 유저 정보 가져오기 실행
    fetchProductData(); // 상품 정보 가져오기 실행
  }, [userId]); // userId가 변경될 때마다 실행


  const allBtnEvent = () => {
    if (allCheck === false) {
      setAllCheck(true);
      setProvideCheck(true);
      setUseCheck(true);
      setServiceCheck(true);
    } else {
      setAllCheck(false);
      setProvideCheck(false);
      setUseCheck(false);
      setServiceCheck(false);
    }
  };

  const useBtnEvent = () => {
    if (useCheck === false) {
      setUseCheck(true);
    } else {
      setUseCheck(false);
    }
  };

  const provideBtnEvent = () => {
    if (provideCheck === false) {
      setProvideCheck(true);
    } else {
      setProvideCheck(false);
    }
  };

  const serviceBtnEvent = () => {
    if (serviceCheck === false) {
      setServiceCheck(true);
    } else {
      setServiceCheck(false);
    }
  };

      // 결제 방법 선택 핸들러
    const handlePaymentMethod = (method) => {
      setPaymentMethod(method);
    };

  useEffect(() => {
    if (provideCheck === true && useCheck === true && serviceCheck === true) {
      setAllCheck(true);
    } else {
      setAllCheck(false);
    }
  }, [provideCheck, useCheck, serviceCheck]);

  const handleCheckout = async () => {
    try {    
        // 주문 정보 생성
        const orderData2 = {
            userId: userData.data.userId,
            productId: orderData.productId,
            amount: orderData.quantity,
            price : (orderData.productPrice * orderData.quantity),
            totalPrice: finalTotalPrice, // 총 상품 금액 추가
            payment: paymentMethod // 결제 정보 추가
        };

        // 주문 정보를 서버에 전송
        const res = await axiosInstance.post("/order/order", orderData2);
        
        // 주문 완료 후 처리 (예: 결제 페이지로 이동)
        console.log("주문이 완료되었습니다.", res.data);
        window.location.href = "/payment_loading"; // 예시로 결제 페이지로 이동하는 코드
    } catch (error) {
        console.error("주문을 처리하는 도중 오류가 발생했습니다.", error);
    }
};

  return (
    <div>
      <Header />
      <h2>order</h2>
      <div className="orderList">
        <div className="order_info">
          <div className="delivery">
            <h2>배송정보</h2>
            <h4>기존 배송지</h4>
            {/* 유저 정보 표시 */}
            {userData && (
            <>
              <p>수령인 <input type="text" defaultValue={userData.data.name} /></p>
              <p>주소 <input type="text" defaultValue={userData.data.address1} /></p>
              <p>주소 <input type="text" defaultValue={userData.data.address2} /></p>
              <p>연락처 <input type="text" defaultValue={userData.data.phone} /></p>
            </>
          )}
            <select>
              <option>배송시 요청사항을 선택해 주세요.</option>
              <option>문 앞에 놓아주시면 되요.</option>
              <option>안전 배송 부탁드립니다.</option>
              <option>벨 누르지 말아주세요.</option>
            </select>
          </div>
          <div className="product_info">
            <h2>상품정보</h2>
            <div className="product_zip">
              <div>
                  <img
                    src={`http://localhost:8080/${orderData.productImage}`}
                    alt={orderData.productName}
                  />
                  <div className="product_content">
                    <p>
                      <h3>{orderData.productName}</h3>
                    </p>
                    <p>
                      <strong>수량</strong> {orderData.quantity}개
                    </p>
                    <p>
                      <strong>가격</strong> {orderData.productPrice}원
                    </p>
                    <p>
                      <strong>총 가격</strong>{" "}
                      {orderData.quantity * orderData.productPrice}원
                    </p>
                  </div>
                </div>
            </div>
          </div>
          <div className="payment">
            <h2>결제방법</h2>
            {/* 각 버튼에 클릭 이벤트 및 해당 결제 방법으로 상태 업데이트 */}
            <button onClick={() => handlePaymentMethod("신용/체크카드")}>신용/체크카드</button>
            <button onClick={() => handlePaymentMethod("토스페이")}>토스페이</button>
            <button onClick={() => handlePaymentMethod("카카오페이")}>카카오페이</button>
            <button onClick={() => handlePaymentMethod("네이버페이")}>네이버페이</button>
            <button onClick={() => handlePaymentMethod("무통장입금")}>무통장입금</button>
          </div>
        </div>
        <div className="payment_price">
          <h2>결제금액</h2>
          <p>총 상품 금액</p>
          <p>{orderData.quantity * orderData.productPrice}원</p>
          <p id='discount'>할인금액</p>
          <p>배송비</p>
          <p>{shippingFee}원</p>
          <p id='all_price'>총 결제 금액</p>
          <p id='all_price'>{finalTotalPrice}원</p>
          <form method="post" action="">
            <div className="agree">
              <div>
                <div>
                  <input
                    type="checkbox"
                    id="all-check"
                    checked={allCheck}
                    onChange={allBtnEvent}
                  />
                  <label id="all-check" for="all-check">
                    주문 내용을 확인했으며, 아래 내용에 모두 동의합니다.
                  </label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="check1"
                    checked={useCheck}
                    onChange={useBtnEvent}
                  />
                  <label for="check1">
                    <span>(필수)</span> 개인정보 수집 / 이용 동의
                  </label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="check2"
                    checked={provideCheck}
                    onChange={provideBtnEvent}
                  />
                  <label for="check2">
                    <span>(필수)</span> 개인정보 제3자 제공 동의
                  </label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="check3"
                    checked={serviceCheck}
                    onChange={serviceBtnEvent}
                  />
                  <label for="check3">
                    <span>(필수) </span>결제대행 서비스 이용약관 (주)KG이니시스
                  </label>
                </div>
                <p id='payment_p'>
                  결제 및 계좌 안내 시 상호명은 (주)플러피로 표기되니
                  참고 부탁드립니다.
                </p>
              </div>
            </div>
          </form>
          <div className="payment_button">
              <button onClick={() => handleCheckout()}>결제하기</button>
            </div>
        </div>
      </div>
    </div>
  );
};
export default OrderList2;