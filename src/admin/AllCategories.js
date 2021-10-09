import React,{useState} from "react";
import { Link } from "react-router-dom";
import Base from "../core/Base";
import { getCategories } from "./helper/adminapicall";

const AllCategories = () => {
    const [values, setValues] = useState({categories:[]})
    getCategories().then(data => {
        console.log(data);
        setValues({...values,categories:data})
        console.log(values);
    });
    //setlistCategories("jksdkfsnj")
    return(
        <Base title="Categories List" description="Get All categories " className="container bg-success p-4">
            <div className="card">
                <h4 className="card-header bg-dark text-white">List of Categories</h4>
                <ul className="list-group">
                    <li className="list-group-item">`${values[0]}`</li>
                </ul>
            </div>
        </Base>
    )
}
export default AllCategories;