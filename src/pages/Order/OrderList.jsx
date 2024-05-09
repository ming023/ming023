import Header from "../../components/Header/Header";
import { useState, useEffect } from "react";
import "./OrderList.css";
import axiosInstance from "../../utils/axios";

const OrderList = (props) => {
  const [allCheck, setAllCheck] = useState(false);
  const [useCheck, setUseCheck] = useState(false);
  const [provideCheck, setProvideCheck] = useState(false);
  const [serviceCheck, setServiceCheck] = useState(false);
  const [userData, setUserData] = useState(null); // 유저 정보 상태 추가
  const [productData, setProductData] = useState([]); // 상품 정보 상태 추가
  const [totalPrice, setTotalPrice] = useState(0); // 총 상품 금액 상태 추가
  const [paymentMethod, setPaymentMethod] = useState(""); // 결제 방법 상태 추가

  let userId = ""; // 기본값으로 빈 문자열 설정

  const userIdCookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith("userId"));
  if (userIdCookie) {
    userId = userIdCookie.split("=")[1];
  } else {
    console.log("userId 쿠키가 없습니다.");
    // 여기서 쿠키가 없는 경우에 대한 처리를 추가합니다.
    // 예를 들어, 로그인 페이지로 리디렉션하거나 기본값으로 설정할 수 있습니다.
    // userId = '기본값';
  }

  let shippingFee = 3000; // 기본 배송비
  const finalTotalPrice = totalPrice >= 50000 ? totalPrice : totalPrice + shippingFee;
  if(totalPrice >= 50000){
    shippingFee = 0;
  }

  useEffect(() => {
    // userId로 user 정보 가져오기
    const fetchUserData = async () => {
      try {
        const res = await axiosInstance.get(`/user/${userId}`);
        setUserData(res.data); // 유저 정보 설정
        console.log(res.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    // cartItem으로 상품 정보 가져오기
    const fetchProductData = async () => {
      try {
        const res = await axiosInstance.get(`/cart/${userId}`);
        const cartItemsWithProductInfo = await Promise.all(
          res.data.data.map(async (cartItem) => {
            // 각 장바구니 아이템의 상품 ID를 이용하여 해당 상품 정보를 가져옵니다.
            const productRes = await axiosInstance.get(
              `/product/${cartItem.productId}`
            );
            const productInfo = productRes.data.data;
            console.log(productInfo);
            // 상품 정보와 장바구니 아이템 정보를 합칩니다.
            return {
              ...cartItem,
              productName: productInfo.name,
              productPrice: productInfo.price,
              productImage: productInfo.image1,
            };
          })
        );
        setProductData(cartItemsWithProductInfo); // 상품 정보 설정
        console.log(cartItemsWithProductInfo);

        // 총 상품 금액 계산
        const total = cartItemsWithProductInfo.reduce((total, product) => {
          return total + product.productPrice * product.amount;
        }, 0);
        setTotalPrice(total); // 총 상품 금액 설정
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
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
        const orderData = {
            userId: userData.data.userId,
            products: productData.map(product => ({
                productId: product.productId,
                amount: product.amount,
                price : (product.productPrice * product.amount)
            })),
            totalPrice: finalTotalPrice, // 총 상품 금액 추가
            payment: paymentMethod // 결제 정보 추가
        };

        // 주문 정보를 서버에 전송
        const res = await axiosInstance.post("/order", orderData);
        
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
              <div className="delivery_content">
                <p>
                  수령인 <input type="text" defaultValue={userData.data.name} />
                </p>
                <p>
                  주소{" "}
                  <input type="text" defaultValue={userData.data.address1} />
                </p>
                <p>
                  주소{" "}
                  <input type="text" defaultValue={userData.data.address2} />
                </p>
                <p>
                  연락처{" "}
                  <input type="text" defaultValue={userData.data.phone} />
                </p>
              </div>
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
              {productData.map((product) => (
                <div key={product.productId}>
                  <img
                    src={`http://localhost:8080/${product.productImage}`}
                    alt={productData.productName}
                  />
                  <div className="productContent">
                    <p>
                      <h3>{product.productName}</h3>
                    </p>
                    <p>
                      <strong>수량</strong> {product.amount}개
                    </p>
                    <p>
                      <strong>가격</strong> {product.productPrice}원
                    </p>
                    <p>
                      <strong>총 가격</strong>{" "}
                      {product.productPrice * product.amount}원
                    </p>
                  </div>
                </div>
              ))}
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
          <p><strong>총 상품 금액</strong> {totalPrice}원</p>
          <p id="discount"><strong>할인 금액</strong></p>
          <p><strong>배송비</strong> {shippingFee}원</p>
          <p id="all_price"><strong>총 결제 금액</strong>{finalTotalPrice}원</p>
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
                  <label for="check1">
                    <input
                      type="checkbox"
                      id="check1"
                      checked={useCheck}
                      onChange={useBtnEvent}
                    />
                    <span>(필수)</span> 개인정보 수집 / 이용 동의
                  </label>
                </div>
                <div>
                  <label for="check2">
                    <input
                      type="checkbox"
                      id="check2"
                      checked={provideCheck}
                      onChange={provideBtnEvent}
                    />
                    <span>(필수)</span> 개인정보 제3자 제공 동의
                  </label>
                </div>
                <div>
                  <label for="check3">
                    <input
                      type="checkbox"
                      id="check3"
                      checked={serviceCheck}
                      onChange={serviceBtnEvent}
                    />
                    <span>(필수) </span>결제대행 서비스 이용약관 (주)KG이니시스
                  </label>
                </div>
                <p id="payment_p">
                  결제 및 계좌 안내 시 상호명은 (주)플러피로 표기되니 참고
                  부탁드립니다.
                </p>
              </div>
            </div>
          </form>
          <div className="payment_button">
            <a href="/payment_loading">
              <button onClick={() => handleCheckout()}>결제하기</button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
export default OrderList;