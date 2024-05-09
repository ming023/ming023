import './Header.css';
import React, { useEffect, useState } from 'react';
import CartMenu from "../Cart/CartMenu"
import AuthComponent from './auth';
import axiosInstance from '../../utils/axios';

function Header({ }) {
  const [isCartOpen, setCartOpen] = useState(false);
  const [userType, setUserType] = useState(null);

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
  
  useEffect(() => {
    if(userId){
      fetchUserType(userId);
    };
  }, []);

  const fetchUserType = async (userId) => {
    try{
      const res = await axiosInstance.get(`/user/${userId}`);
      setUserType(res.data.data.userType)
      console.log(res.data.data)
    }catch (error) {
      console.error('Error fetching user type:', error);
    }
  }

  const toggleMenu = () => {
    setCartOpen((prevIsOpen) => !prevIsOpen);
  };
 

  const isAdmin = userType === true; // 이 부분을 추가
 
   return (
     <div className="header_container">
       <header>
         <nav>
           <ul>
             <li className="navLogo">
               <a href="/">
                 <img src="/logo.png" alt="Logo" />
               </a>
             </li>
             <li><a href="/store">스토어</a></li>
             <li><a href="/faq">FAQ</a></li>
             {isAdmin && (
               <li><a href="/admin">관리자</a></li>
             )}
             <li><a href="/mypage">마이페이지</a></li>
             <AuthComponent />
             <li><CartMenu cartOpen={isCartOpen} toggleMenu={toggleMenu} /></li>
           </ul>
         </nav>
       </header>
     </div>
   );
 }
 
 export default Header;