import React, { useState } from "react";

const OtherTab = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleAccordionClick = (index) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const faqData = [
    {
      question: "[기타문의] Q. 회원정보 수정은 어떻게 하나요?",
      answer: "마이페이지 -> 회원정보 에서  수정 가능합니다!",
    },
    {
      question: "[기타문의] Q. 오프라인 매장은 없나요?",
      answer: "현재 플러피에서는 공식적으로 운영되는 오프라인 매장은 없음을 안내 드립니다.",
    },
    {
      question: "[기타문의] Q. 현금영수증 신청은 어떻게 하나요?",
      answer: "현금영수증 신청은 현금성 거래(계좌이체, 에스크로 등) 주문 중 바로 신청이 가능합니다.",
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

export default OtherTab;
