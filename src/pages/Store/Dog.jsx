import React, { useState, useEffect } from 'react';
import { Nav } from 'react-bootstrap';
import "./Store.css";
import ProductDetail from '../../components/Product/ProductDetail';
import Header from '../../components/Header/Header';
import { SliderImage } from '../Main/Main';

const Dog = () => {
  const [tab, TabChange] = useState(0);
  return (
    <div className="product_content">
        <Header />
        <SliderImage />
      <div className="category">
        <ul>
          <li><a href='/store'>전체</a></li>
          <li><a href='/dog'>강아지</a></li>
          <li><a href='/cat'>고양이</a></li>
        </ul>
      </div>
      <Nav variant="tabs" defaultActiveKey="link0" className="content_navbar">
        <Nav.Item>
          <Nav.Link onClick={() => { TabChange(0); }} eventKey="link0">장난감</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={() => { TabChange(1); }} eventKey="link1">사료</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={() => { TabChange(2); }} eventKey="link2">간식</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={() => { TabChange(3); }} eventKey="link3">옷</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={() => { TabChange(4); }} eventKey="link4">용품</Nav.Link>
        </Nav.Item>
      </Nav>
      <TapContent tab={tab} />
    </div>
  );
}

function TapContent({ tab }) {
  const [fade, setFade] = useState("");

  useEffect(() => {
    setFade("end");
    return () => {
      setFade("");
    };
  }, [tab]);


  return (
    <div className={"start" + fade}>
      <div>
        {tab === 0 && <ProductDetail />}
        {tab === 1 && <ProductDetail />}
        {tab === 2 && <ProductDetail />}
        {tab === 3 && <ProductDetail />}
        {tab === 4 && <ProductDetail />}
      </div>
    </div>
  );
}

export default Dog;
