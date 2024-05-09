import "./Order.css";
const Order_Button = () => {
  return (
    <select className="order_option">
      <option>입금대기</option>
      <option>입금완료</option>
      <option>상품준비중</option>
      <option>배송중</option>
      <option>배송완료</option>
      <option>주문확정</option>
      <option>취소중</option>
      <option>취소완료</option>
    </select>
  );
};
export default Order_Button;
