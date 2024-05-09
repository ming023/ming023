import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from "../../components/Header/Header";
import "./Payment.css";

const Payment_Loading = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/payment_complete'); 
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [navigate]);

  const continueShopping = () => {
    navigate('/store');
  };

  const goToCart = () => {
    navigate('/cart');
  };

  return (
    <div>
      <Header />
      <div className="payment_category">
        <div className="payment_ul">
          <ul>
            <li>01 장바구니 </li>
            <li>〉</li>
            <li id="underline">02 주문/결제 </li>
            <li>〉</li>
            <li>03 결제완료</li>
          </ul>
        </div>
      </div>
      <div className="payment_container">
        <div className="payment_loading">
          <img src={`${process.env.PUBLIC_URL}/images/Loading.gif`} alt="Loading" />
          <h1>결제 진행 중입니다.</h1>
          <p>결제 완료까지 다소 시간이 걸릴 수 있습니다.</p>
          <button className="store_btn" onClick={continueShopping}>
            쇼핑 계속하기
          </button>
          <button className="cart_btn" onClick={goToCart}>
            장바구니
          </button>
        </div>
      </div>
    </div>
  );
};

export default Payment_Loading;
