import React, { useEffect, useState } from "react";
import Base from "../core/Base";
import { Link, Redirect } from "react-router-dom";
import { createaProduct, getCategories } from "./helper/adminapicall";
import { isAutheticated } from "../auth/helper";

const AddProduct = () => {

  const {user,token} = isAutheticated();
  
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    photo:"",
    categories: [],
    category:"",
    loading: false,
    error:"",
    createdProduct: "",
    getRedirect: false,
    formData: ""
  });

  const { name, description, price, stock, categories, category,loading, error, createdProduct, getRedirect, formData } = values;

  const preload = () => {
      getCategories().then(data =>{
          if (data.error) {
              setValues({...values, error: data.error})
          } else {
              setValues({...values, categories:data,formData: new FormData()})
              console.log(data);
          }
      })
  }

  useEffect(() => {
      preload();
  }, [])

  const onSubmit = (event) => {
    event.preventDefault();
    setValues(({...values,error:"",loading:true}))
    createaProduct(user._id,token,formData).then(data => {
      if (data.error) {
        setValues({...values,error:data.error})
      }else{
        setValues({
          ...values,
          name:"",
          description:"",
          price:"",
          photo:"",
          stock:"",
          loading:false,
          createdProduct:data.name         
        })
      }
    })
  };

  const handleChange = name => event => {
    const value = name === "photo" ? event.target.files[0] : event.target.value
    formData.set(name,value );
    setValues({...values,[name]:value})
  };

  const successMessage = () => {
    setTimeout(()=>{
      if(createdProduct){
        setValues({...values,getRedirect:true})
      }
    },2000);
    return(
    <div className="alert alert-success mt-3" style={{display:createdProduct?"":"none"}}>
      <h4>{createdProduct} created succesfully</h4>
    </div>)
  }

  const Redirecting = () => {
    if(getRedirect){
      return <Redirect to = "/admin/dashboard"/>
    }
  }
  const createProductForm = () => (
    <form>
      <span>Upload photo</span>
      <div className="form-group">
        <label className="btn btn-block btn-success">
          <input
            onChange={handleChange("photo")}
            type="file"
            name="photo"
            accept="image"
            placeholder="choose a file"
          />
        </label>
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("name")}
          name="photo"
          className="form-control"
          placeholder="Name"
          value={name}
        />
      </div>
      <div className="form-group">
        <textarea
          onChange={handleChange("description")}
          name="photo"
          className="form-control"
          placeholder="Description"
          value={description}
        />
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("price")}
          type="number"
          className="form-control"
          placeholder="Price"
          value={price}
        />
      </div>
      <div className="form-group">
        <select
          onChange={handleChange("category")}
          className="form-control"
          placeholder="Category"
        >
          <option>Select</option>
          {categories && 
          categories.map((cate,index) => (
            <option key={index} value={cate._id}>{cate.name}</option>
          ))
          }
        </select>
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("stock")}
          type="number"
          className="form-control"
          placeholder="Stock"
          value={stock}
        />
      </div>

      <button
        type="submit"
        onClick={onSubmit}
        className="btn btn-outline-success mb-3"
      >
        Create Product
      </button>
    </form>
  );

  return (
    <Base
      title="Add a product here!"
      description="Welcome to product creation section"
      className="container bg-info p-4"
    >
      <Link to="/admin/dashboard" className="btn btn-md btn-dark mb-3">
        Admin Home
      </Link>
      <div className="row bg-dark text-white rounded">
        <div className="col-md-8 offset-md-2">
          {successMessage()}
          {createProductForm()}
          {Redirecting()}
        </div>
      </div>
    </Base>
  );
};

export default AddProduct;
