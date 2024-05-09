import { useEffect, useState } from "react";
import "./User.css";
import axiosInstance from "../../../utils/axios";

const UserList = () => {


  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers();
  },[]);

  const getUsers = async() => {
    try{
    const res = await axiosInstance.get(`/admin/user`);
    if (Array.isArray(res.data.data)) {
      setUsers(res.data.data);
      console.log(res.data.data)
    } else {
      console.error('Invalid response format:', res.data);
    }
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
}

  return (
    <div className="user">
      <div className="userManagement">
        <h3>회원관리</h3>
        <div className="user_container">
        <table className="user_table">
      <thead>
        <tr>
          <th>고객명</th>
          <th>이메일 주소</th>
          <th>연락처</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
        <tr key={user.userId}>
          <td>{user.name}</td>
          <td>{user.email}</td>
          <td>{user.phone}</td>
        </tr>
        ))}
      </tbody>
    </table>
        </div>
      </div>
    </div>
  );
};
export default UserList;
