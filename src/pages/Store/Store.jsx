import "./Store.css";
import Header from "../../components/Header/Header"
import { SliderImage } from "../Main/Main";
import Product from "../../components/Product/Product";
const Store = () => {
  return (
    <div className="product_content">
        <Header />
        <SliderImage />
      <Product />
    </div>
  );
}

export default Store;
