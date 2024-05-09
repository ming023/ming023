import { useState, useEffect } from "react";
import "./ProductRegistration.css"
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import AdminHeader from "../Admin_Header"
import axiosInstance from '../../../utils/axios';
import { useNavigate } from 'react-router';


// 사용하고 싶은 옵션, 나열 되었으면 하는 순서대로 나열
const toolbarOptions = [
    ["link", "image", "video"],
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline", "strike"],
    ["blockquote"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ color: [] }, { background: [] }],
    [{ align: [] }],
];


// 옵션에 상응하는 포맷, 추가해주지 않으면 text editor에 적용된 스타일을 볼수 없음
export const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "align",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "background",
    "color",
    "link",
    "image",
    "video",
    "width",
];

const modules = {
    toolbar: {
        container: toolbarOptions,
    },
};

const ProductRegistration = () => {
    const navigate = useNavigate();

    const [productName, setProductName] = useState('');
    // const [isVisible, setIsVisible] = useState(true); // 변경: 상태명 오타 수정
    const [sellingPrice, setSellingPrice] = useState('');
    // const [discountRate, setDiscountRate] = useState('');
    // const [finalPrice, setFinalPrice] = useState('');
    const [stock, setStock] = useState('');
    const [image, setImage] = useState('');
    const [description, setDescription] = useState('');
    const [mainCategoryId, setMainCategoryId] = useState('');
    const [subCategoryId, setSubCategoryId] = useState('');
    const [showSubCategory, setShowSubCategory] = useState(false);
    const [selectOptions, setSelectOptions] = useState({});

    useEffect(() => {
        // 각 주요 카테고리에 대한 하위 카테고리 옵션 설정
        setSelectOptions({
            1: {11: "장난감", 12: "사료", 13: "간식", 14: "옷", 15: "용품"},
            2: {21: "장난감", 22: "사료", 23: "간식", 24: "옷", 25: "용품"}
        });
    }, []);
    

    const handleProductNameChange = (e) => {
        setProductName(e.target.value);
    };

    // const handleVisibilityToggle = () => { // 변경: 함수명 수정
    //     setIsVisible(!isVisible); // 변경: 상태값 반전
    // };

    const handleSellingPriceChange = (e) => {
        setSellingPrice(e.target.value);
    };

    // const handleDiscountRateChange = (e) => {
    //     setDiscountRate(e.target.value);
    // };

    const handleStockChange = (e) => {
        setStock(e.target.value);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
    };

    // const handleDescriptionChange = (e) => {
    //     setDescription(e.target.value);
    // };

    const onChangeCategory = (e) => {
        const mainCategoryValue = e.target.value;
        setMainCategoryId(mainCategoryValue);

        if (mainCategoryValue !== "") {
            setShowSubCategory(true);
        } else {
            setShowSubCategory(false);
        }
    };
    const onChangeSubCategory = (e) => {
        const subCategoryValue = e.target.value;
        setSubCategoryId(subCategoryValue);
    };

    const onsubmit = async(e) => {
        // 여기에 폼 제출 로직 추가
        e.preventDefault();
        try {
            let formData = new FormData();
            formData.append('image', image);

            const res = await axiosInstance.post('/admin/image', formData);
            console.log(res.data);

            const productData = {
                name: productName,
                price: sellingPrice,
                stock: stock,
                description: description,
                mainCategoryId: mainCategoryId,
                subCategoryId: subCategoryId,
                image1: res.data.imagePath
            };

            await axiosInstance.post('/admin/product/createProduct', productData);
            navigate('/product');
        } catch (error) {
            console.error(error);
        }
    };

    const mainCategory = {1: "강아지", 2: "고양이"};

    return (
        <>
            <AdminHeader />
            <div className="registration">
                <div className="productRegistration">
                    <h3>상품등록</h3>
                    <form onSubmit={onsubmit}>
                    <table className="registrationBox">
                        <tr>
                            <th>분류</th>
                            {/* 1.상품 1차 2차 목록 */}
                            <td className="classification"
                            >
                                <select id="mainCategorySelect" value={mainCategoryId} onChange={onChangeCategory}>
                                    <option value="">주요 카테고리를 선택하세요</option>
                                    {Object.keys(mainCategory).map((key) => (
                                        <option key={key} value={key}>{mainCategory[key]}</option>
                                    ))}
                                </select>

                                {showSubCategory && (
                                    <>
                                        <label>하위 카테고리</label>
                                        <select id="subCategorySelect" value={subCategoryId} onChange={onChangeSubCategory}>
                                            <option value="">하위 카테고리를 선택하세요</option>
                                            {Object.entries(selectOptions[mainCategoryId]).map(([key, value]) => (
                                                <option key={key} value={key}>{value}</option>
                                            ))}
                                        </select>
                                    </>
                                )}
                            </td>
                        </tr>

                        <tr>
                            {/* 2.상품명 */}
                            <th>상품명</th>
                            <td>
                                <input type="text" value={productName} onChange={handleProductNameChange}
                                    className="text" />
                            </td>
                        </tr>

                        {/* <tr>
                        3.페이지 노출 여부
                        <th>페이지 노출 여부</th>
                        <td>
                            <input type="checkbox" className="btn" checked={isVisible} onChange={handleVisibilityToggle} />&nbsp;&nbsp;ON&nbsp;&nbsp;&nbsp;&nbsp;
                            <input type="checkbox" className="btn"
                                checked={!isVisible} onChange={handleVisibilityToggle} />&nbsp;&nbsp;OFF
                        </td>
                    </tr> */}

                        <tr>
                            {/* 4.판매 가격 */}
                            <th>판매 가격</th>
                            <td>
                                <input type="number" value={sellingPrice} onChange={handleSellingPriceChange}
                                    className="text" />
                            </td>
                        </tr>

                        {/* <tr>
                         5. 할인율
                        <th>할인율</th>
                        <td>
                            <input type="text" value={discountRate} onChange={handleDiscountRateChange} />
                        </td>
                    </tr>

                    <tr>
                        6. 할인된 최종 가격
                        <th>할인된 최종 가격</th>
                        <td>
                            <span>{finalPrice}</span>
                        </td>
                    </tr> */}

                        <tr>
                            {/* 7. 재고 */}
                            <th>재고</th>
                            <td>
                                <input type="number" value={stock} onChange={handleStockChange}
                                    className="text" />
                            </td>
                        </tr>

                        <tr>
                            {/* 8. 썸네일 첨부 버튼 */}
                            <th>썸네일 첨부</th>
                            <td>
                                <input type="file" onChange={handleImageChange}
                                />
                            </td>
                        </tr>


                        {/* 9. 상품 상세이미지 추가 버튼 */}
                        <div className="quill">
                            <ReactQuill
                                style={{ height: "500px" }}
                                theme="snow"
                                modules={modules}
                                onChange={setDescription}
                            />
                        </div>

                    </table>

                    {/* Submit 버튼 */}
                    <button className="upload" type="submit">등록하기</button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default ProductRegistration;
