import React, { useState, useEffect } from "react";
import "../Product/Product.css";
import axiosInstance from "../../utils/axios";

function Product() {
  const categories = [
    {
      mainCategoryId: 1,
      name: "강아지",
      children: [
        { subCategoryId: 11, name: "장난감" },
        { subCategoryId: 12, name: "사료" },
        { subCategoryId: 13, name: "간식" },
        { subCategoryId: 14, name: "옷" },
        { subCategoryId: 15, name: "용품" },
      ],
    },
    {
      mainCategoryId: 2,
      name: "고양이",
      children: [
        { subCategoryId: 21, name: "장난감" },
        { subCategoryId: 22, name: "사료" },
        { subCategoryId: 23, name: "간식" },
        { subCategoryId: 24, name: "옷" },
        { subCategoryId: 25, name: "용품" },
      ],
    },
  ];

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const res = await axiosInstance.get("/product");
      if (Array.isArray(res.data.data)) {
        setProducts(res.data.data);
      } else {
        console.error("Invalid response format:", res.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleAllProductClick = async () => {
    try {
      const res = await axiosInstance.get("/product");
      if (Array.isArray(res.data.data)) {
        setProducts(res.data.data);
        console.log(res.data.data[0].image1);
      } else {
        console.error("Invalid response format:", res.data);
      }
    } catch (error) {
      console.error(error);
    }
    setSelectedCategory(null);
  };

  const handleMainCategoryClick = async (mainCategory) => {
    try {
      const res = await axiosInstance.get(
        `/product/mainCategory/${mainCategory.mainCategoryId}`
      );
      if (Array.isArray(res.data.data)) {
        setProducts(res.data.data);
      } else {
        console.error("Invalid response format:", res.data);
      }
    } catch (error) {
      console.error(error);
    }
    setSelectedCategory(mainCategory);
  };

  const handleSubCategoryClick = async (subCategory) => {
    try {
      const res = await axiosInstance.get(
        `/product/subCategory/${subCategory.subCategoryId}`
      );
      if (Array.isArray(res.data.data)) {
        setProducts(res.data.data);
      } else {
        console.error("Invalid response format:", res.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleClick = (productId) => {
    // 상세 페이지로 이동
    window.location.href = `/store/${productId}`;
  };

  return (
    <div className="product_content">
      <div className="category">
        <div className="main_category">
          <button onClick={handleAllProductClick}>전체</button>
          {categories.map((category) => (
            <button
              key={category.mainCategoryId}
              onClick={() => handleMainCategoryClick(category)}
            >
              {category.name}
            </button>
          ))}
        </div>
        {selectedCategory && selectedCategory.children && (
          <div className="sub_category">
            {selectedCategory.children.map((childCategory) => (
              <button
                key={childCategory.subCategoryId}
                onClick={() => handleSubCategoryClick(childCategory)}
                style={{ marginRight: "10px" }}
              >
                {childCategory.name}
              </button>
            ))}
          </div>
        )}
      </div>
      <div className="product_Container">
        <div className="product_Detail">
          {products && (
            <ul id="product_box">
              {products.map((product) => (
                <li
                  id="product_li"
                  key={product.productId}
                  onClick={() => handleClick(product.productId)}
                >
                  <img
                    src={`http://localhost:8080/${product.image1}`}
                    width={300}
                    alt={product.name}
                  />
                  <p id="name">{product.name}</p>
                  <p id="price">
                    {product.price} {"원"}
                  </p>
                  <div id="star">
                  <p id="yellow">★★★★★</p>
                  <p>
                    <button>구매하기</button>
                  </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default Product;
