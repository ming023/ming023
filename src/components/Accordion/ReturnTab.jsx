import React, { useState } from "react";
const ReturnTab = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleAccordionClick = (index) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const faqData = [
    {
      question: "[교환/반품] Q. 교환 및 반품 절차가 어떻게 되나요?",
      answer: "교환 및 반품은 상품 수령일로부터 7일 이내까지 신청주셔야만 정상적인 처리가 가능합니다.",
    },
    {
      question:
        "[교환/반품] Q. 네이버페이에서 구매 후 반품했는데 환불이 안 되고 있어요.",
      answer: "네이버페이 반품의 경우 고객님의 승인 후에 환불 처리가 진행 됩니다",
    },
    {
      question: "[교환/반품] Q. 반품 신청했는데 언제 환불 되나요?",
      answer: "상품 검수 후 이상이 없는 경우 즉시 환불 처리 드립니다.",
    },
    {
      question: "[교환/반품] Q. 교환 반품 처리 기간은 얼마나 소요 되나요?",
      answer: "최초 접수부터 처리 완료까지 일반적으로 4~5일 소요 됩니다.(주말,공휴일 제외)",
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

export default ReturnTab;
