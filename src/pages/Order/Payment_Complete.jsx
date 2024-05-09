import { useNavigate } from 'react-router-dom';
import Header from "../../components/Header/Header";
import "./Payment.css";
const Payment_Complete = () => {
  const navigate = useNavigate();

  const continueShopping = () => {
    navigate('/store');
  };

  const goToCart = () => {
    navigate('/mypage');
  };
  return (
    <div>
      <Header />
      <div className="payment_category">
      <div className="payment_ul">
      <ul>
            <li>01 장바구니 </li>
            <li>〉</li>
            <li >02 주문/결제 </li>
            <li>〉</li>
            <li id="underline">03 결제완료</li>
          </ul>
      </div>
      </div>
      <div className="payment_container">
        <div className="payment_loading">
        <img src={`${process.env.PUBLIC_URL}/images/Check.gif`} alt="Check" />
          <h1>구매가 정상적으로 완료되었습니다.</h1>
          <a href="/store">
            <button className="store_btn">쇼핑 계속하기</button>
          </a>
          <a href="/mypage">
            <button className="cart_btn">구매내역 확인</button>
          </a>
        </div>
      </div>
    </div>
  );
};
export default Payment_Complete;
