import Header from "../../components/Header/Header";
import React, { useState, useEffect } from "react";
import { Nav } from "react-bootstrap";
import OrderTab from "../../components/Accordion/OrderTab";
import OtherTab from "../../components/Accordion/OtherTab";
import DeliveryTab from "../../components/Accordion/DeliveryTab";
import ReturnTab from "../../components/Accordion/ReturnTab";
import "../FAQ/FAQ.css";

const FAQ = () => {
  const [tab, TabChange] = useState(0);
  return (
    <div>
      <Header />
      <div className="FAQ_title">
        <h2>FAQ</h2>
      </div>
      <div className="accordion_nav">
        <Nav variant="tabs" defaultActiveKey="link0" className="content_navbar">
          <Nav.Item>
            <Nav.Link
              onClick={() => {
                TabChange(0);
              }}
              eventKey="link0"
            >
              주문/결제
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              onClick={() => {
                TabChange(1);
              }}
              eventKey="link1"
            >
              교환/반품
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              onClick={() => {
                TabChange(2);
              }}
              eventKey="link2"
            >
              배송
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              onClick={() => {
                TabChange(3);
              }}
              eventKey="link3"
            >
              기타
            </Nav.Link>
          </Nav.Item>
        </Nav>
        <TapContent tab={tab} />
      </div>
    </div>
  );
};
export default FAQ;

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
      <div className="accordion_container">
        {tab === 0 && <OrderTab />}
        {tab === 1 && <ReturnTab />}
        {tab === 2 && <DeliveryTab />}
        {tab === 3 && <OtherTab />}
      </div>
    </div>
  );
}
