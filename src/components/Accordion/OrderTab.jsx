import React, { useState } from "react";

const OrderTab = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleAccordionClick = (index) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const faqData = [
    {
      question: "[주문/결제] Q. 네이버페이로 주문하고 싶어요!",
      answer: "결제방법 선택 시 네이버페이로 주문 가능 합니다.",
    },
    {
      question: "[주문/결제] Q. 꼭 회원가입을 해야만 주문이 가능한가요?",
      answer: "네 맞습니다. 회원가입 하신 후 이용 가능합니다.",
    },
    {
      question: "[주문/결제] Q. 주문을 취소했는데 언제 환불되나요?",
      answer: "영업일 기준 3일~5일 이내 카드사 승인 취소 됩니다. ",
    },
    {
      question: "[주문/결제] Q. 주문 취소는 어떻게 하나요?",
      answer: "결제 완료 이후에는 직접 주문 취소가 불가능합니다.",
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

export default OrderTab;
