import React, { useEffect, useState } from "react";
import "./Product.css";
import axiosInstance from "../../../utils/axios";
import AdminHeader from "../../Admin/Admin_Header";
const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productPerPage] = useState(15);

  useEffect(() => {
    getProducts();
  }, [currentPage]);

  const getProducts = async () => {
    try {
      const res = await axiosInstance.get('/admin/product', {
        params: {
          page: currentPage,
          limit: productPerPage
        }
      });
      if (res.data && res.data.data) {
        setProducts(res.data.data);
      } else {
        console.error('Invalid response format:', res.data);
      }
    } catch (error) {
      console.error(error);
    }
  }

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const displayProducts = () => {
    const startIndex = (currentPage - 1) * productPerPage;
    const endIndex = startIndex + productPerPage;
    return products.slice(startIndex, endIndex);
  };

  return (
    <div>
      <AdminHeader />
    <div className="product">
      <div className="productManagement">
        <h3>상품관리</h3>
        <div className="product_container">
          <table className="product_table">
            <thead>
              <tr>
                <th>상품번호</th>
                <th>상품명</th>
                <th>판매가</th>
                <th>재고</th>
                <th>등록일</th>
              </tr>
            </thead>
            <tbody>
              {displayProducts().map((product) => (
                <tr key={product.productId}>
                  <td>{product.productId}</td>
                  <td>{product.name}</td>
                  <td>{product.price}원</td>
                  <td>{product.stock}개</td>
                  <td>{product.createdAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination">
            {[...Array(Math.ceil(products.length / productPerPage)).keys()].map((number) => (
              <button key={number + 1} onClick={() => paginate(number + 1)}>{number + 1}</button>
            ))}
          </div>
        </div>
        <a href="/product/new">
          <button className="product_button">등록하기</button>
        </a>
      </div>
    </div>
    </div>
  );
};

export default ProductList;
