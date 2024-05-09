import React, { useState } from "react";

const DeliveryTab = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleAccordionClick = (index) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const faqData = [
    {
      question: "[배송관련] Q. 배송지 주소(또는 연락처)를 변경하고 싶어요.",
      answer: "마이페이지 -> 회원정보 에서  수정 가능합니다!",
    },
    {
      question:
        "[배송관련] Q. 배송 요청 메시지, 주소 변경 요청이 적용되지 않았어요.",
      answer: "문의 게시글로 남겨주시면 변경 도와드리겠습니다. ",
    },
    {
      question: "[배송관련] Q. 배송조회는 어떻게 하나요 ?",
      answer: "마이페이지 -> 배송조회 에서 조회 가능합니다.",
    },
    {
      question: "[배송관련] Q. 배송이 보통 얼마나 걸리나요 ?",
      answer: "최소 3일~14일 이내 배송 됩니다.",
    },
  ];

  return (
    <div className="accordion-faq">
      {faqData.map((item, index) => (
        <div key={index} className="accordion-item">
          <div
            className={`accordion-header ${
              activeIndex === index ? "active" : ""
            }`}
            onClick={() => handleAccordionClick(index)}
          >
            {item.question}
          </div>
          {activeIndex === index && (
            <div className="accordion-content">{item.answer}</div>
          )}
        </div>
      ))}
    </div>
  );
};

export default DeliveryTab;
