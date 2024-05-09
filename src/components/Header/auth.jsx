import { useState, useEffect } from 'react';
import axiosInstance from '../../utils/axios'; // 세션 관리를 위한 axios 인스턴스
import './Header.css'

const AuthComponent = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // 페이지 로드 시 로그인 상태 확인
    const checkLoginStatus = async () => {
      try {
        const response = await axiosInstance.get('/check-login');
        setIsLoggedIn(response.data.isLoggedIn);
      } catch (error) {
        console.error('Error checking login status:', error);
      }
    };

    checkLoginStatus();
  }, []);

  const handleLogout = async () => {
    try {
      await axiosInstance.post('/auth/logout');
      // 세션 쿠키 삭제
      document.cookie = 'session-cookie=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      setIsLoggedIn(false);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div>
      {isLoggedIn ? (
        <li><button id='green' onClick={handleLogout}><a href="/" >로그아웃</a></button></li>
      ) : (
        <li><button id='green'><a href="/login">로그인</a></button></li>
      )}
    </div>
  );
};

export default AuthComponent;