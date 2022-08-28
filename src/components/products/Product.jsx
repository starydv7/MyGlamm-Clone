import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getdata } from "../../reducer/AppReducer/action";
import "./Product.css";
import {useDispatch, useSelector} from "react-redux";
import { useParams } from 'react-router-dom'
const ProductItem = () => {
const {type}=useParams();
  const [products, setProducts] = useState([]);
  const dispatch=useDispatch()
  const {data}=useSelector((state)=>state.app);
  const {data1} = useSelector((state)=>state);
  console.log("data1",data1);
  console.log("data",data);
  console.log("type",type);
  useEffect(() => {
    dispatch(getdata(type));
  }, []);

  return (
    <>
      <div className="PageName">{type}</div>
      <div className="ProductPart">
        <div className="product_wraper">
          {data.map((e) => {
                return (
                    <Link to={`${e.id}`}>
          <div className="per_product_card">
            <div className="per_prod_img">
              <img src={e.img} alt="" />
            </div>
            <div>
              <p className="name">  {e.productName}</p>
              <p className="description">{e["short-des"]}</p>
            </div>
            <div className="shade_wrapper">
            <div>
                <img
                  src="https://www.myglamm.com/images/plus-icon.png"
                  alt=""
                />
              </div>
              <p className="count">{e.count}</p>
            </div>
            <div className="price_wrapper">
              <p>{e.actualPrice}</p>
              <p className="mrp">
                <s>{e["offerPrice"]}</s>
              </p>
            </div>
          </div>
          </Link>
              );
            })}
        </div>
      </div>
    </>
  );
};
export default ProductItem;
