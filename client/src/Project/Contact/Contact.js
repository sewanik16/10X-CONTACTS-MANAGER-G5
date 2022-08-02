import React, { useEffect, useState } from 'react'
import "./style.css"
import Navbar from './Navbar/Navbar'
import Main from './Main/Main'
import axios from 'axios';
import Sidebar from './Sidebar/Sidebar';
const Contact = () => {
  const [data,setdata] = useState([])
  const [profilename,setprofilename] = useState("")
  const [get,setget] = useState(true)
  const authToken = localStorage.getItem("authorization");
  console.log(authToken)
  useEffect(()=>{
    axios({
     url:"http://localhost:5003/contact",
     method:"GET",
     headers:{
      authorization: authToken
     },
     data:{}
    }).then((res)=>{
      if(res.data[0].contact.length){
        setdata(res.data[0].contact)
      }
       
      setprofilename(res.data[0].userId.slice(0,5))
     
    })
 },[get])
  return (
    <div className='contact'>
      <div className='leftside'>
        <Sidebar/>
      </div>
      <div className='rightside'>
        <div className='righttop'>
            <Navbar data={data} setdata={setdata} profile = {profilename} setget = {setget} get ={get}/>
        </div>
        <div className='main'>
          <Main data={data} setget = {setget} get ={get}/>
        </div>
      </div>
    </div>
  )
}

export default Contact
