import React,{useState,useEffect} from 'react'
import { Redirect } from 'react-router-dom';
import { addItemToCart, removeItemFromCart } from './helper/carthelper';
import Imagehelper from './helper/Imagehelper'

const Card = ({
    product,addtoCart=true,removeFromCart=false,setReload = f => f,reload = undefined
}) => {

  let btnstyle = {backgroundColor:"#28A745",width:"70px",height:"30px",display:"flex",justifyContent:"center",alignItems:"center",margin:"4px auto",borderRadius:"5px"}

  const [redirect, setRedirect] = useState(false)
  const [count, setCount] = useState(product.count)

  const cardTitle = product ? product.name:"A photo from pexels"
  const cardDescription = product ? product.description:"Default Description"
  const cardPrice = product ? product.price:"DEFAULT"

  const addToCart = () => {
    addItemToCart(product,()=>setRedirect(true))
  }
  
  const getARedirect = redirect => {
    if (redirect) {
      return <Redirect to="/cart"/>
    }
  }

  const showAddToCart = addtoCart => {
      return (
          addtoCart && (
              <button onClick={addToCart}  className="btn btn-block btn-outline-success mt-2 mb-2">
                  Add To Cart
              </button>
          )
      )
  }
  const showRemoveFromCart= removeFromCart => {
      return (
          removeFromCart && (
              <button onClick={()=>{
                removeItemFromCart(product._id);
                setReload(!reload)
              }}  className="btn btn-block btn-outline-danger mt-2 mb-2">
                  Remove To Cart
              </button>
          )
      )
  }

  return (
    <div className="card text-white bg-dark border border-info ">
      <div className="card-header lead">{cardTitle}</div>
      <div className="card-body">
        {getARedirect(redirect)}
        <Imagehelper product={product}/>
        <p className="lead bg-success font-weight-normal text-wrap">
          {cardDescription}
        </p>
        <p style={btnstyle}>
          {cardPrice}
        </p>
        <div className="row">
          <div className="col-12">
            {showAddToCart(addtoCart)}
          </div>
          <div className="col-12">
            {showRemoveFromCart(removeFromCart)}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Card;