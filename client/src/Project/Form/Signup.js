import React, { useState } from 'react'
import './form.css';
import Left from '../assets/left.png';
import Right from '../assets/right.png';
import Dots from '../assets/dots.png';
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Signup = () => {
    const [data, setData] = useState({ userName: "", password: "", confirmpassword: "" });
    const navigate = useNavigate();
    const handleData = (e) => {
        e.preventDefault();
        if(data.password === data.confirmpassword){
            console.log(data);
             axios({
                url: "http://localhost:5003/user/signup",
                method: "POST",
                headers: {
    
                },
                data: data
            }).then((res) => {
                console.log(res);
                navigate("/");
            }).catch((err) => {
                console.log(err);
            })    
        }else{
            alert("password & confirm password are not matching")
        }
        setData({userName:"", password:"", confirmpassword:""})

    }
    
    const inputHandler = (e,id)=>{
        if(id === "username"){
            setData({...data, userName:e.target.value})
        }else if(id === "password"){
            setData({...data, password:e.target.value})
        }else{
            setData({...data, confirmpassword:e.target.value})
        }
    }

    return (
        <>
            <div className='left-img'>
                <img src={Left} alt='Eclipse' />
            </div>
            <div className='signup-container'>
                <div className='left-dots'>
                    <img src={Dots} alt='Circles' id='dots' />
                </div>
                <div className='myform'>
                    <div className='logo' style={{ "alignItems": "center" }}>
                        <h1 style={{ "color": "#7D8CC4", "fontWeight": "500" }} >Logo</h1>
                        <p>Create New account</p><br />
                    </div>
                    <form onSubmit={(e) => handleData(e)}>
                        <div><input required onChange={(e) => inputHandler(e, "username") } style={{marginBottom:"20px",border:"1px solid grey"}} className="box1 field" type="text"  value={data.userName} placeholder="User Name" ></input></div>
                        <div><input required style={{marginBottom:"20px",border:"1px solid grey"}} onChange={(e) => inputHandler(e, "password") } className="box1 field" type="new-password" value={data.password} placeholder="Password" ></input></div>
                        <div><input required style={{marginBottom:"20px",border:"1px solid grey"}} onChange={(e) => inputHandler(e, "confirmpassword")} className="box1 field" type="new-password" value={data.confirmpassword} placeholder="Confirm Password" ></input></div>
                        <button className='register-btn field' type="submit" >Sign Up</button>

                    </form>
                </div>
                <div className='right-dots' >
                    <img src={Dots} alt='Circles' id='dots' />
                </div>
            </div>
            <div className='right-img'>
                <img src={Right} alt='Eclipse' />
            </div>
        </>
    )
};
export default Signup;