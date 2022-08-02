import React, { useState } from 'react'
import "./style.css"
import SearchIcon from '@mui/icons-material/Search';
import pro from "./Images/pro.png"
const Navbar = ({ data, setdata , profile ,setget , get}) => {
    const [searchword, setsearchword] = useState("")
    const [filterdata, setfilterdata] = useState([])
    const searchhandler = (e) => {
        setsearchword(e.target.value)
        const queryword = e.target.value
        const resultdata = data.filter((eachitem)=>{
            return eachitem.email.toLowerCase().includes(queryword.toLowerCase())
        })
        if(queryword.length){
            setfilterdata(resultdata)
        }else{
            setget(!get)
        }
        
    }
    const selectitemhandler = async(e,id)=>{
       await setsearchword(id)
        setfilterdata([])
        const finalword = id;
        const searchresultdata = data.filter((eachitem)=>{
            return eachitem.email.toLowerCase().includes(finalword.toLowerCase())
        })
       await setdata(searchresultdata)
    }
    return (
        <div className='navbar-main'>
            <div className='title'>
                <div>Total Contants</div>
            </div>
            {
                searchword.length ? (<div className='searchactive'>
                    <div className='search-active'>
                        <SearchIcon className='searchicon' />
                        <input value={searchword} type="text" placeholder='Search by Email Id' onChange={(e) => searchhandler(e)} />
                    </div>
                    {
                        filterdata.length !== 0 && (
                            <div className='searchhead'>
                                {
                                    filterdata.map((item, idx) => {
                                        return (
                                            <div key={idx} className='search-active searchlist'>
                                            <SearchIcon className='searchicon Click' onClick={(e)=>selectitemhandler(e,item.email)}/>
                                            <div className='searchitem Click' onClick={(e)=>selectitemhandler(e,item.email)}>{item.email}</div>
                                        </div>
                                      )
                                    })
                                }
                            </div>
                        )
                    }
                </div>) : (<div className='searchbar'>
                    <div className='search-active'>
                        <SearchIcon className='searchicon'/>
                        <input value={searchword} type="text" placeholder='Search by Email Id....' onChange={(e) => searchhandler(e)} />
                    </div>
                </div>)
            }
            <div className='profile'>
                <div>
                    <img src={pro} alt=""/>
                </div>
                <div>
                    <ul>
                        <li className='profilename'>
                          {profile}
                        </li>
                        <li className='position'>
                          Super Admin
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Navbar
