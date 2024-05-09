import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Signup.css'
import downArrowIcon from './211687_down_arrow_icon.png';
import { AiOutlineMail, AiOutlineLock, AiOutlineCheckCircle, AiOutlineUser, AiOutlineMobile   } from "react-icons/ai";

function SignUp() {


  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [checkbox, setCheckbox] = useState('');

  const [pwc, setPwc] = useState('');

  const [emailValid, setEmailValid] = useState(false);
  const [pwValid, setPwValid] = useState(false);
  const [pwcValid, setPwcValid] = useState(false);
  const [nameValid, setNameValid] = useState(false);
  const [phoneValid, setPhoneValid] = useState(false);
  const [checkValid, setCheckValid] = useState(false);


  const [notAllow, setNotAllow] = useState(true);
  
  const [terms, setTerms] = useState(false);

  const [checked, setChecked] = useState([false, false, false, false]);

  const handleEmail = (e) => {
    setEmail(e.target.value);
    const regex =
      /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    setEmailValid(regex.test(e.target.value));
  };

  const handlePassword = (e) => {
    setPw(e.target.value);
    const regex =
      /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[$`~!@#$%^&\\(\\)\-_=+])(?!.*[^a-zA-Z0-9$`~!@#$%^&*#^?&\\(\\)\-_=+]).{8,20}$/;
    setPwValid(regex.test(e.target.value));
  };

  const handlePasswordCheck = (e) => {
    setPwc(e.target.value);
    const regex =
      /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[$`~!@#$%^&\\(\\)\-_=+])(?!.*[^a-zA-Z0-9$`~!@#$%^&*#^?&\\(\\)\-_=+]).{8,20}$/;

    const passwordMatch = e.target.value === pw;
    const passwordValid = regex.test(e.target.value);

    setPwcValid(passwordMatch && passwordValid);
  };



  const handleName = (e) => {
    setName(e.target.value)
    const regex=
    /^[가-힣]{2,}$/;
    setNameValid(regex.test(e.target.value))
  }
  const handlePhone = (e) => {
    setPhone(e.target.value)
    const regex=
    /^(\d{2,3})(\d{3,4})(\d{4})$/;
    setPhoneValid(regex.test(e.target.value));
  }

  const handleCheckbox= (e)=>{
    setCheckbox(e.target.checked)
    setCheckValid(e.target.checked)
  }

  const onClickTermButton = (e) => {
    setTerms(!terms);
  };


  const handleChange = (index, e) => {
    const updatedChecked = [...checked];
    updatedChecked[index] = e.target.checked;
    setChecked(updatedChecked);

    const allChecked = updatedChecked.every((item) => item);
    setNotAllow(!(emailValid && pwValid && pwcValid && nameValid && phoneValid && allChecked));
  };


  const ParentChecked = checked[0] && checked[1] && checked[2] && checked[3];

  const children = (
    <div className='termChildren'>
      <label>
        <input value={checkbox} type="checkbox" checked={checked[0]} onChange={
          (e) => handleChange(0, e)} />
        <span>[필수] 만 14세 이상입니다.</span>
      </label>
      <label>
        <input value={checkbox}  type="checkbox" checked={checked[1]} onChange={
          (e) => handleChange(1, e)} />
        <span>[필수] 이용약관 동의</span>
      </label>
      <label>
        <input value={checkbox}  type="checkbox" checked={checked[2]} onChange={
          (e) => handleChange(2, e)} />
        <span>[필수] 개인정보 수집 및 이용 동의</span>
      </label>
      <label>
        <input value={checkbox}  type="checkbox" checked={checked[3]} onChange={
          (e) => handleChange(3, e)} />
        <span>[필수] 개인정보 제 3자 제공 동의</span>
      </label>
    </div>
  );

  useEffect(() => {
    if (emailValid && pwValid && pwcValid && nameValid && phoneValid && checkValid) {
      setNotAllow(false);
    } else {
      setNotAllow(true);
    }
  }, [emailValid, pwValid, pwcValid, nameValid, phoneValid, checkValid]);



  
  const navigate = useNavigate();

  const URL = 'http://localhost:8080/user/signUp'

  const onSubmit = async(e) => {
    e.preventDefault()
    await axios.post(URL, {email: email, name: name, password: pw, phone: phone})
    navigate('/')
  }



  let regex =         
  /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[$`~!@#$%^&\\(\\)\-_=+])(?!.*[^a-zA-Z0-9$`~!@#$%^&*#^?&\\(\\)\-_=+]).{8,20}$/;

return (
    <div className="SignUp">
      <div className="wrap">
        <h2>SIGN <span>UP</span></h2>
        <form onSubmit={onSubmit}>
          <div className='inputContainer'>
          <div className="inputWithIcon">
          <AiOutlineMail size={30} />
            <input
              type="text"
              placeholder="google@gmail.com"
              value={email}
              onChange={handleEmail}
            />
            </div>
          </div>
          <div>
            {!emailValid && email.length > 0 && (
              <div  className='errFirst'>올바른 이메일을 입력해주세요</div>
            )}
          </div>
          <div className="inputContainer">
          <div className="inputWithIcon">
          <AiOutlineLock size={30} />
            <input
              type="password"
              placeholder="Password"
              value={pw}
              onChange={handlePassword}
            />
            </div>
            <div className='err'>
              {!pwValid && pw.length > 0 && (
                <div>영문, 숫자, 특수문자 포함 8자 이상 입력해주세요.</div>
              )}
            </div>
          </div>
          <div className="inputContainer">
          <div className="inputWithIcon">
          <AiOutlineCheckCircle size={30} />
            <input
              type="password"
              placeholder="PW check"
              value={pwc}
              onChange={handlePasswordCheck}
            />
            </div>
            <div>
              {!pwcValid && pwc.length > 0 && (
                <div>
                  {pwc.length > 0 && !regex.test(pwc) && (
                    <div className='errDualOne'>영문, 숫자, 특수문자 포함 8자 이상 입력해주세요.</div>
                  )}
                  {pwc.length > 0 && pwc !== pw && (
                    <div className='errDualTwo'>비밀번호가 같지 않습니다.</div>
                  )}
                </div>
              )}
            </div>
          </div >
          <div className="inputContainer">
          <div className="inputWithIcon">
          <AiOutlineUser size={30}/>
          <input 
            type="text" 
            placeholder="Name(KR)" 
            value={name} 
            onChange={handleName}
          />
          <br />
          </div>
          <div className='err'>
            {
              !nameValid && name.length > 0 &&(
                <div>
                  {
                    <div>올바른 한글 이름을 입력해주세요</div>
                  }
                </div>
              )
            }
          </div>
          </div>
          <div className="inputContainer">
          <div className="inputWithIcon">
          <AiOutlineMobile size={30} />
          <input 
            type="text" 
            placeholder="PH N" 
            value={phone} 
            onChange={handlePhone} 
            />
          </div>
          <br />
            <div className='errFirst'>
            {
              !phoneValid && phone.length > 0 && (
                <div> ' - ' 을(를) 빼고 올바른 번호를 입력해주세요</div>
              )
            }
            </div>
            </div>
          <div className='term'>
              <p className='termTop'>
                  <a href='/terms'>Pluffy 이용약관<span>(약관보기)</span></a>  <img onClick={onClickTermButton} src={downArrowIcon} alt='' />
              </p>
              <p className='termCheck'>
              <label>
                <input
                    type="checkbox"
                    checked={ParentChecked}
                    value={checkbox}
                    onChange={
                    (e) =>  { setChecked(
                      [e.target.checked, e.target.checked, e.target.checked, e.target.checked]
                    );
                    handleCheckbox(e)
                    }
                  }
                    />
              </label>
                
                
                
                <span className='termSpan'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;모두 확인하였으며 동의합니다</span>
    
              </p>
              <p className='termP'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;전체동의에는 필수정보에 대한 동의가 포함되어 있습니다</p>
              {terms && children}
              <div className='Btn'>
                <button className='SignUpBtn' type="submit" disabled={notAllow}>Sign Up</button>
                <button className='loginPage'><a href='/login'>LogIn Page</a></button>
              </div>
          </div>
        </form>
        <div>
                  
          
     </div>
    </div>

    </div>
  );
}




export default SignUp;