import React from 'react';
import styled from 'styled-components';
import axiosInstance from '../../utils/axios';

const AdminHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: rgb(72, 72, 72);
  
  header {
    margin-top: 30px;
    nav {
      ul {
        list-style: none;
        padding: 0;
        margin: 0;

        li {
          display: inline-block;
          margin-right: 10px;

          &:last-child {
            margin-right: 0;
          }

          a {
            text-decoration: none;
            color: white;
            font-weight: 400;
          }
        }
      }
    }
  }
`;

const Img = styled.img`
  max-width: 100%;
  height: auto;
`;

const AdminHeaderComponent = () => {

  const handleLogout = async () => {
    try {
      await axiosInstance.post('/auth/logout');
      // 세션 쿠키 삭제
      document.cookie = 'session-cookie=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };
  return (
    <AdminHeader>
      <header>
        <nav>
          <ul>
            <li className="navLogo">
              <a href="/admin">
                <Img src="/logo2.png" alt="Logo" />
              </a>
            </li>
            <li><a href="/user">회원관리</a></li>
            <li><a href="/order">주문관리</a></li>
            <li><a href="/product">상품관리</a></li>
            <li><a href="/">홈페이지</a></li>
            <li><a onClick={handleLogout} href="/login">로그아웃</a></li>
          </ul>
        </nav>
      </header>
    </AdminHeader>
  );
};

export default AdminHeaderComponent;
