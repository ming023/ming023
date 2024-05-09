import "../Error404/Error404.css";
const Error404Page = () => {
  return (
    <div className="error404_container">
      <div className="error404">
        <img src={`${process.env.PUBLIC_URL}/images/404.svg`} alt="404" />
        <p>
          존재하지 않는 주소를 입력 하셨거나<br></br>
          요청하신 페이지의 주소가 변경 삭제되어<br></br>
          일시적으로 사용할 수 없습니다.
        </p>
      </div>
    </div>
  );
};
export default Error404Page;
