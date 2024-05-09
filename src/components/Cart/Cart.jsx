import React, { useState, useEffect } from "react";
import "./Cart.css";
import clearCart from "./images/clearCart.png";
import { useParams } from "react-router";
import axiosInstance from "../../utils/axios";
import { AiOutlineDelete } from "react-icons/ai";

const Cart = ({ closeCart }) => {
  const shippingCostThreshold = 50000;
  const shippingCost = 3000;

  let userId = ""; // 기본값으로 빈 문자열 설정

  const userIdCookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith("userId"));
  if (userIdCookie) {
    userId = userIdCookie.split("=")[1];
  } else {
    console.log("userId 쿠키가 없습니다.");
  }

  console.log("userId:", userId);

  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    getCartItems(userId);
  }, []);

  const handleRemoveItem = async (cartItemId) => {
    try {
      await axiosInstance.get(`/cart/delete/${cartItemId}`);
      getCartItems(userId);
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  const getCartItems = async (userId) => {
    console.log(userId);
    try {
      const res = await axiosInstance.get(`/cart/${userId}`);
      if (Array.isArray(res.data.data)) {
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
        setCartItems(cartItemsWithProductInfo);
        console.log(setCartItems);
      } else {
        console.error("Invalid response format:", res.data);
      }
    } catch (error) {
      console.error(error);
    }
    console.log(cartItems);
  };

  const handleQuantityChange = async (cartItemId, newQuantity) => {
    try {
      // 서버로 카트 아이템 ID와 새로운 수량을 전송하여 업데이트합니다.
      await axiosInstance.put(`/cart/${cartItemId}`, { newQuantity });

      // 서버로부터 데이터베이스에서 업데이트된 카트 정보를 다시 가져옵니다.
      getCartItems(userId);
    } catch (error) {
      console.error("Error updating cart item quantity:", error);
      // 에러 처리를 원하는 대로 수행합니다.
    }
  };

  const getSelectedItemsTotal = () => {
    return cartItems.reduce((total, item) => {
      total += item.productPrice * item.amount; // 각 상품의 가격과 수량을 곱하여 합산
      return total;
    }, 0);
  };
  
  const getTotalPrice = () => {
    const selectedItemsTotal = getSelectedItemsTotal();
    const shippingCosts =
      selectedItemsTotal >= shippingCostThreshold ? 0 : shippingCost;
    return selectedItemsTotal + shippingCosts;
  };
  

  const handleCheckout = () => {
    // 결제 로직 추가하기
    window.location='/orderList'
  };

  const handleCloseCart = () => {
    closeCart();
  };

  // 장바구니 테이블 구조로 변경해야 할듯
  // 이미지 - 상품명 - 수량 - 가격 - 삭제버튼
  // 이미지 세로로 두칸, 중간 위 상품명, 가격 두칸으로 나눠서, 중간 아래는 두칸 합쳐서 수량조절, 오른쪽 칸은 세로 두칸 합쳐서 삭제 버튼

  return (
    <div>
      <button className="closeBtn" onClick={handleCloseCart}>
        X
      </button>

      {cartItems.length > 0 && (
        <>
          <table className="cart_table">
            {cartItems.map((cartItem) => (
              <tbody key={cartItem.cartItemId}>
                <tr>
                  <td rowSpan={2}>
                    <a href={`http://localhost:3000/store/${cartItem.productId}`}>
                    <img
                      src={`http://localhost:8080/${cartItem.productImage}`}
                      alt={cartItem.productName}
                    />
                    </a>
                  </td>
                  <td>{cartItem.productName}</td>
                  <td>가격 : {cartItem.productPrice * cartItem.amount} 원</td>
                  <td rowSpan={2}>
                    <button
                      onClick={() => handleRemoveItem(cartItem.cartItemId)}
                    >
                      <AiOutlineDelete size={25} />
                    </button>
                  </td>
                </tr>
                <tr id="quantity">
                  <td colSpan={3} className="quantity-control">
                    <button
                      onClick={() =>
                        handleQuantityChange(
                          cartItem.cartItemId,
                          cartItem.amount - 1
                        )
                      }
                    >
                      -
                    </button>
                    <span className="quantity-display">{cartItem.amount}</span>{" "}
                    {/* 수량 표시 */}
                    <button
                      onClick={() =>
                        handleQuantityChange(
                          cartItem.cartItemId,
                          cartItem.amount + 1
                        )
                      }
                    >
                      +
                    </button>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
          <hr />
          <div className="price">
            <div className="selectShip">
              <div className="selectPrice">
                <p>전체 상품</p>
                <p className="pricecss">{getSelectedItemsTotal()} 원</p>
              </div>
              <div className="plus">+</div>
              <div className="shipPrice">
                <p>배송비</p>
                <p className="pricecss">
                  {getSelectedItemsTotal() >= shippingCostThreshold
                    ? 0
                    : shippingCost}{" "}
                  원
                </p>
              </div>
            </div>
            <div className="allPrice">
              <p>주문 금액</p>
              <p className="finalPrice">{getTotalPrice()} 원</p>
            </div>
          </div>
          <hr />
          <button onClick={handleCheckout} className="pay">
            결제하기
          </button>
        </>
      )}

      {cartItems.length === 0 && (
        <p className="clearCart">
          <img src={clearCart} />
        </p>
      )}
    </div>
  );
};

export default Cart;