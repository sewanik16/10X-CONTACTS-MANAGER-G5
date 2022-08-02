import React from 'react'
import { FiLogOut } from "react-icons/fi"
import { MdContacts } from "react-icons/md"
import "./style.css"
import { useNavigate } from 'react-router-dom'
const Sidebar = () => {
  const Navigate = useNavigate()
  const Logouthandler = ()=>{
    localStorage.setItem("authorization", "");
    Navigate("/")
  }
  return (
    <div>
      <div className="sidebar">
        <div className="sidebar-top">
          <h2>Logo</h2>
          <br />
          <label style={{ fontWeight: "bold" }}> <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 2V4H12V2H16ZM6 2V8H2V2H6ZM16 10V16H12V10H16ZM6 14V16H2V14H6ZM18 0H10V6H18V0ZM8 0H0V10H8V0ZM18 8H10V18H18V8ZM8 12H0V18H8V12Z" fill="#181818" />
          </svg>
            Dashboard</label>
          <br /><br />
          <button> <MdContacts size={"16px"} /> Total Contacts <b style={{ fontSize: "16px" }}>|</b></button>
        </div>
        <div className="sidebar-bottom">
          <span style={{"cursor":"pointer"}}> <FiLogOut size={"16px"}  onClick={(e)=>Logouthandler(e)} /> Log out</span>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
