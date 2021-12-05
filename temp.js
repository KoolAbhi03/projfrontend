import React,{useRef,useState} from "react"
import {Login, Close,Submit} from './Login'
import Icon from "./imgs/icon.png"
import data from "./DATA/dataUsers"
import crossIcon from "./imgs/cross-icon.png"
import {Link} from "react-router-dom"
import "./css/header.css"


const Header=()=>{
    const signin = ({email,password}) =>{
        const [tempAuthObj]=data.filter((item)=>item.email=== email.current.value && item.password===password.current.value);
        return tempAuthObj;
    }
    const [values, setValues] = useState({
        email: "",
        password: "",
        error: "",
        redirect:false
      });
  const { email, password, error,redirect } = values;
  const handleChange = name => event => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };
  const onSubmit = event => {
    event.preventDefault();
    setValues({ ...values, error: false });
    var data = signin({ email, password })
    if (data==undefined) {
        setValues({ ...values, error: 'Invalid' });
      } else {
        setValues({...values,redirect:true});
      }
  };
    
  const errorMessage = () => {
    if (error=='Invalid') {
        <p>{error}</p>
    }
  };
  const performRedirect = () => {
    if(redirect){if(data.role==='1'){
      return <Redirect to="/abc">nikal yaha se</Redirect>
    }}
  }
    
return (
    <div>
        <div className="header">
            <div className="surface">
            <div className="hamburger">
                <div className="line1"></div>
                <div className="line2"></div>
                <div className="line3"></div>
            </div>
                <Link to="/"><h1 className="header-head">Fine Dine</h1></Link>
                 <img src={Icon} alt="NA" className="icon"/>
            <ul>
                   <li><Link to="/">Home</Link></li>
                   <li><a href="#book">Search</a></li>
                   <li><a href="#about">Why Us</a></li>
                   <li><a href="#contact">App</a></li>
                   <li><a href="#social">Info</a></li>
                   <li><button onClick={Login} className="loginButton">Login</button></li>
                   <li><Link to="/signup" className="sign"><button className="signupButton">Sign up</button></Link></li>

        
            </ul>
            </div>
            
        </div>
        <div className="loginmodal">
        <div className="modal">
            <img src={crossIcon} alt="NA" className="crossIcon" onClick={Close}/>
            <img src={Icon} alt="NA" className="login-modal-icon"/>
            <h1 className="modalHead">Fine Dine</h1>
            <form>
            <input ref={email} type="text"  name="lbox" className="lBox" placeholder="Enter email" autoComplete="off" onChange={handleChange(email)}/><br />
            <input ref={password} type="password" className="pBox" placeholder="Enter Password"  autoComplete="off"onChange={handleChange(password)}/><br />
            <p ref={displayAuth}></p>
            {errorMessage()}
            {performRedirect()}
            <button className="loginmodalbutton" onClick={onSubmit}>Login</button><br />
            </form>
            <a href="#" className="forgotpass">Forgot Password?</a>
        </div>
        </div>
        
     
    </div>
)
}


export default Header;