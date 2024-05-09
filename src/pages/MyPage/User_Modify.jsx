import React, { useState, useEffect, useRef } from "react"; // useRef를 추가해주세요
import Header from "../../components/Header/Header";
import "./MyPage.css";
import DaumPostcode from "react-daum-postcode";
import Modal from "react-modal";
import axiosInstance from "../../utils/axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router";

const userId = Cookies.get('userId');

const Modify = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState([]);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [zipCode, setZipcode] = useState("");
  const [roadAddress, setRoadAddress] = useState("");
  const [detailAddress, setDetailAddress] = useState("");
  const [isOpen, setIsOpen] = useState(false); // isOpen 상태 변수를 추가해주세요

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    try {
      const res = await axiosInstance.get(`/user/${userId}`);
      setUser(res.data.data);
      setEmail(res.data.data.email);
      setName(res.data.data.name);
      setPhone(res.data.data.phone);
      setZipcode(res.data.data.zipCode);
      setRoadAddress(res.data.data.address1);
      setDetailAddress(res.data.data.address2);
      console.log(res.data)
    } catch (error) {
      console.error('사용자 데이터 가져오기 오류:', error);
    }
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  };

  const handleZipcodeChange = (event) => {
    setZipcode(event.target.value);
  };

  const handleRoadAddressChange = (event) => {
    setRoadAddress(event.target.value);
  };

  const handleDetailAddressChange = (event) => {
    setDetailAddress(event.target.value);
  };

  const updateUser = async () => {
    try {
      await axiosInstance.put(`/user/updateUser/${userId}`, {
        name: name,
        email: email,
        phone: phone,
        zipCode: zipCode,
        address1: roadAddress,
        address2: detailAddress
      });
      alert("사용자 정보가 성공적으로 수정되었습니다.");
    } catch (error) {
      console.error('사용자 데이터 업데이트 오류:', error);
    }
  };

  const deleteUser = async () => {
    try {
      await axiosInstance.get(`/user/deleteUser/${userId}`);
      alert("회원 탈퇴가 완료되었습니다.");
      navigate('/');
      // 회원 탈퇴 후 추가적인 작업이 필요한 경우 여기에 코드를 추가하세요.
    } catch (error) {
      console.error('회원 탈퇴 오류:', error);
    }
  };

  const completeHandler = (data) => {
    setZipcode(data.zonecode);
    setRoadAddress(data.roadAddress);
    setIsOpen(false);
  };

  const customStyles = {
    overlay: {
      backgroundColor: "rgba(0,0,0,0.5)",
    },
    content: {
      left: "0",
      margin: "auto",
      width: "800px",
      height: "600px",
      padding: "0",
      overflow: "hidden",
    },
  };

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const onClose = () => {
    setIsOpen(false); // 모달창을 닫는 함수
  };

  return (
    <div>
      <Header />
      <div className="modify">
        <div className="modify_container">
          <h2>회원정보 수정</h2>
          <div>
            <label htmlFor="name">이름:</label>
            <input type="text" id="name" value={name} onChange={handleNameChange} />
          </div>
          <div>
            <label htmlFor="email">이메일:</label>
            <input type="email" id="email" value={email} onChange={handleEmailChange} />
          </div>
          <div>
            <label htmlFor="phone">전화번호:</label>
            <input type="text" id="phone" value={phone} onChange={handlePhoneChange} />
          </div>
          <div>
            <label htmlFor="zipcode">우편번호:</label>
            <input type="text" id="zipcode" value={zipCode} onChange={handleZipcodeChange} />
          </div>
          <div>
            <label htmlFor="roadAddress">도로명 주소:</label>
            <input type="text" id="roadAddress" value={roadAddress} onChange={handleRoadAddressChange} />
          </div>
          <div>
            <label htmlFor="detailAddress">상세 주소:</label>
            <input type="text" id="detailAddress" value={detailAddress} onChange={handleDetailAddressChange} />
          </div>
          <Address_info
            zipCode={zipCode}
            roadAddress={roadAddress}
            detailAddress={detailAddress}
            setZipcode={setZipcode}
            setRoadAddress={setRoadAddress}
            setDetailAddress={setDetailAddress}
            isOpen={isOpen}
            completeHandler={completeHandler}
            customStyles={customStyles}
            toggle={toggle}
            onClose={onClose}
          />
          <button onClick={updateUser}>저장</button>
          <button id="red" onClick={deleteUser}>회원 탈퇴</button>
        </div>
      </div>
    </div>
  );
};

export function Address_info({
  zipCode,
  roadAddress,
  detailAddress,
  setZipcode,
  setRoadAddress,
  setDetailAddress,
  isOpen,
  completeHandler,
  customStyles,
  toggle,
  onClose
}) {
  const changeHandler = (event) => {
    setDetailAddress(event.target.value);
  };

  return (
    <div>
      <p id="address_info">
        <div id="address">배송지</div>
        <input id="address_num" value={zipCode} readOnly placeholder={"우편번호"} />
        <button id="address_search" onClick={toggle}>
          우편번호
        </button>
        <br />
        <input id="address_name" value={roadAddress} readOnly placeholder="도로명 주소" />
        <br />
        <Modal isOpen={isOpen} ariaHideApp={false} style={customStyles}>
          <button type="button" onClick={onClose} className="postCode_btn">
            닫기
          </button>
          <DaumPostcode onComplete={completeHandler} height="100%" />
        </Modal>
        <input
          type="text"
          id="address_name"
          onChange={changeHandler}
          value={detailAddress}
          placeholder="상세주소"
        />
        <br />
      </p>
    </div>
  );
}

export default Modify;

const ImageUploadComponent = () => {
  const [imageURL, setImageURL] = useState("");
  const fileInputRef = useRef(null);

  const handleFileInputChange = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event) => {
    event.stopPropagation();
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      const imageURL = URL.createObjectURL(selectedFile);
      setImageURL(imageURL);
    }
  };

  const handleImageClick = () => {
    handleFileInputChange();
  };

  return (
    <div className="modify_Img">
      <div className="fileInputFrame">
        <label className="fileButton" htmlFor="fileInput">
          {imageURL ? (
            <img
              className="uploadedImage"
              src={imageURL}
              alt="Uploaded"
              style={{ maxWidth: "100%", maxHeight: "200px" }}
              onClick={handleImageClick}
            />
          ) : null}
        </label>
      </div>
      <div className="fileInput">
        <input
          id="fileInput"
          className="fileInput"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
};
