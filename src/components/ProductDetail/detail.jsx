
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../components/Header/Header";
import jjimBtn from "./images/jjimBtn.png";
import jjimBtnActive from "./images/jjimBtnActive.png";
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './Detail.css';
import axiosInstance from "../../utils/axios";

const Detail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isInWishList, setIsInWishList] = useState(false); // 위시리스트에 해당 상품이 있는지 여부 상태 추가

  let userId = "";
  const userIdCookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith("userId"));
  if (userIdCookie) {
    userId = userIdCookie.split("=")[1];
  } else {
    console.log("userId 쿠키가 없습니다.");
  }
  console.log("userId:", userId);


  const navigate = useNavigate();

  useEffect(() => {
    getProduct(productId);
    checkWishList(productId, userId);
  }, [productId, userId]);

  const getProduct = async (productId) => {
    try {
      const res = await axiosInstance.get(`/product/${productId}`);
      setProduct(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const checkWishList = async (productId, userId) => {
    try {
      const res = await axiosInstance.get(`/wishList/checkWishList/${productId}/${userId}`);
      setIsInWishList(res.data.isInWishList);
    } catch (error) {
      console.error("Error checking wish list:", error);
    }
  };

  const handleIncreaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handeleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = async () => {
    try {
      const res = await axiosInstance.post('/cart/addCart', {
        productId,
        amount: quantity
      });
      console.log(res.data);
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };

  const handleAddWishList = async () => {
    try {

      if(isInWishList){
        await axiosInstance.get(`/wishList/deleteWishList/${productId}/${userId}`);
        setIsInWishList(false)
      } else{
        const res = await axiosInstance.post('/wishList/addWishList', {
          productId,
        });
        console.log(res.data);
        setIsInWishList(true); // 위시리스트에 추가된 후 상태 변경
      }
    } catch (error) {
      console.error("Error adding product to wish list:", error);
    }
  };

  const handleBuyNow = () => {
    // 상품 정보와 수량을 가지고 페이지 이동
    const orderData = {
      productId: product.productId,
      quantity: quantity,
      productImage: product.image1,
      productName: product.name,
      productPrice: product.price,
      totalPrice: (product.price * quantity)
    };
    console.log(orderData)
    navigate(
      '/orderList2',{
      state: { orderData: orderData }
    });
  };

  return (
    <div>
      <Header />
      {product ? (
        <>
          <div className="detail">
            <table className="detailContainer">
              <tbody>
                <tr className="productImage">
                        <div className="productDetail_img">
                          <img src={`http://localhost:8080/${product.image1}`} alt={product.name} />
                        </div>
                </tr>
                <tr className="productInfo">
                  <td className="productInfoHeader">
                    <p>{product.name}</p>
                    {isInWishList ? ( // 상태에 따라 버튼 모양 변경
                      <button className="jjimBtn"><img src={jjimBtnActive} alt="jjimBtn" onClick={handleAddWishList} /></button>
                    ) : (
                      <button className="jjimBtn"><img src={jjimBtn} alt="jjimBtn" onClick={handleAddWishList} /></button>
                    )}
                  </td>
                  <td className="starReview">
                    <span>★★★★☆</span>
                    <button>xxx개 리뷰 보기</button>
                  </td>
                  <td className="detailPrice">
                    <span className="greenPrice">상품 금액</span><p>{product.price}</p><span>원</span>
                  </td>
                  <td className="quantity">
                    <button onClick={handeleDecreaseQuantity}>-</button>
                    <span>{quantity}</span>
                    <button onClick={handleIncreaseQuantity}>+</button>
                  </td>
                  <button className="addCart" onClick={handleAddToCart}>장바구니</button>
                  <a href="/orderList2"><button className="buyNow" onClick={handleBuyNow}>바로 구매</button></a>
                </tr>
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Detail;