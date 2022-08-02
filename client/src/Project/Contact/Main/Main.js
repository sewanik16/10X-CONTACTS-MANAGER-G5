import React, { useState } from 'react'
import "./style.css"
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import ImportForm from './ImportForm';
import { parse } from "papaparse"
import Pagination from './Pagenation';
import Tippy from '@tippyjs/react'
import "tippy.js/dist/tippy.css"

const Main = ({ data, setget, get }) => {
  const [tickes, settickes] = useState([])
  const [show, setshow] = useState(false)
  const [value, setvalue] = useState("")
  const [show1, setshow1] = useState(false)
  const [show2, setshow2] = useState(false)
  const [show3, setshow3] = useState(false)
  const showPerPage = 10;
  const [pagination, setPagination] = useState({
    start: 0,
    end: showPerPage,
  });
  const authToken = localStorage.getItem("authorization");
  const handleShow = () => setshow(true);
  const handleClose = () => setshow(false);
  const handleShow1 = () => setshow1(true);
  const handleClose1 = () => setshow1(false);
  const handleShow2 = () => setshow2(true);
  const handleClose2 = () => setshow2(false);
  const handleShow3 = () => setshow3(true);
  const handleClose3 = () => setshow3(false);
  const deletecollector = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      settickes([...tickes, value])
    } else {
      settickes(tickes.filter((e) => e !== value))
    }
  }
  const deletehandler = (e) => {
    axios({
      url: "http://localhost:5003/contact/delete",
      method: "DELETE",
      headers: {
        authorization: authToken
      },
      data: tickes
    }).then((res) => {
      document.getElementById("name").checked = false;
      let parent = document.getElementById("tbody")
      const inputelements = parent.getElementsByTagName("input")
      Array.from(inputelements).forEach((item) => {
        item.checked = false;
      })
      handleClose2()
      handleShow3()
      setTimeout(() => {
        handleClose3()
        setget(!get)
      }, 1000);
      setget(!get)
    })
  }
  const Draghandler = (e) => {
    e.preventDefault()
  }
  const Drophandler = (e) => {
    e.preventDefault()
    Array.from(e.dataTransfer.files).map(async file => {
      const text = await file.text()
      let { data } = parse(text, { header: true })
      if (data[data.length - 1].name === "") {
        data.pop()
      }
      axios({
        url: "http://localhost:5003/contact",
        method: "POST",
        headers: {
          authorization: authToken
        },
        data: data
      }).then(() => {
        handleClose()
        handleShow1()
        setTimeout(() => {
          handleClose1()
          setget(!get)
        }, 1000);
      }).catch((err) => {
        console.log(err.message)
      })
    })

  }
  const filehandler = (e) => {
    Array.from(e.target.files).map(async file => {
      const text = await file.text()
      let { data } = parse(text, { header: true })
      if (data[data.length - 1].name === "") {
        data.pop()
      }
      setvalue("")
      axios({
        url: "http://localhost:5003/contact",
        method: "POST",
        headers: {
          authorization: authToken
        },
        data: data
      }).then(() => {
        handleClose()
        handleShow1()
        setTimeout(() => {
          handleClose1()
          setget(!get)
        }, 1000);
      }).catch((err) => {
        console.log(err.message)
      })
    })
  }
  const deleteAll = (e, id) => {
    let arr = data.map((ele) => {
      return ele._id
    })
    settickes(arr)
    let parent = document.getElementById(id)
    const inputelements = parent.getElementsByTagName("input")
    Array.from(inputelements).forEach((item) => {
      if (e.target.checked) {
        item.checked = true
      } else {
        item.checked = false;
      }
    })
  }
  const singledeletehandler = (id) => {
    settickes([id])
    handleShow2()
  }
  const onPaginationChange = (start, end) => {
    setPagination({ start: start, end: end });
  };
  return (
    <>
      <div className="contacts">
        <div className="row1">
          <div className='row1-left'>
            <span> <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 2H15V0H13V2H5V0H3V2H2C0.89 2 0.00999999 2.9 0.00999999 4L0 18C0 19.1 0.89 20 2 20H16C17.1 20 18 19.1 18 18V4C18 2.9 17.1 2 16 2ZM16 18H2V8H16V18ZM16 6H2V4H16V6ZM6 12H4V10H6V12ZM10 12H8V10H10V12ZM14 12H12V10H14V12ZM6 16H4V14H6V16ZM10 16H8V14H10V16ZM14 16H12V14H14V16Z" fill="black" />
            </svg>
              Select Date
              <svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 1.33198L10.59 0L6 4.32659L1.41 0L-2.38417e-07 1.33198L6 7L12 1.33198Z" fill="black" />
              </svg>

            </span>&nbsp;&nbsp;&nbsp;
            <span> <svg width="18" height="12" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 12H11V10H7V12ZM0 0V2H18V0H0ZM3 7H15V5H3V7Z" fill="black" />
            </svg>
              Filters
              <svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 1.33198L10.59 0L6 4.32659L1.41 0L-2.38417e-07 1.33198L6 7L12 1.33198Z" fill="black" />
              </svg>

            </span>
          </div>
          <div className='rowright'>
            <span onClick={(e) => handleShow2()}> <svg width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11.7857 5.33333V14.2222H3.21429V5.33333H11.7857ZM10.1786 0H4.82143L3.75 0.888889H0V2.66667H15V0.888889H11.25L10.1786 0ZM13.9286 3.55556H1.07143V14.2222C1.07143 15.2 2.03571 16 3.21429 16H11.7857C12.9643 16 13.9286 15.2 13.9286 14.2222V3.55556Z" fill="black" />
            </svg>
              Delete </span>
            <span onClick={handleShow}> <svg width="15" height="18" viewBox="0 0 15 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4.73979 0L0.652832 3.89268H3.71805V10.7317H5.76153V3.89268H8.82675L4.73979 0ZM11.892 13.6683V6.82927H9.84848V13.6683H6.78327L10.8702 17.561L14.9572 13.6683H11.892Z" fill="black" />
            </svg>
              Import</span>
            <span><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14 11V14H2V11H0V14C0 15.1 0.9 16 2 16H14C15.1 16 16 15.1 16 14V11H14ZM3 5L4.41 6.41L7 3.83V12H9V3.83L11.59 6.41L13 5L8 0L3 5Z" fill="black" />
            </svg>
              Export</span>
          </div>
        </div>
        <div className='Tablesection'>
          <table>
            <thead>
              <tr>
                <th className='child'>
                  <input type="checkbox" id='name' onChange={(e) => deleteAll(e, "tbody")} />
                  Name</th>
                <th className='child'><svg className='Line' width="2" height="25" viewBox="0 0 2 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 0V25" stroke="#7D7D7D" stroke-width="2" />
                </svg>
                  Designation <svg className='downarrow' width="11" height="15" viewBox="0 0 11 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.25 14.225L0 9H10.5L5.25 14.225Z" fill="#605750" />
                    <path d="M5.25 9.82285e-05L10.5 5.2251L0 5.2251L5.25 9.82285e-05Z" fill="#605750" />
                  </svg>
                </th>
                <th >
                  <svg className='Line' width="2" height="25" viewBox="0 0 2 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 0V25" stroke="#7D7D7D" stroke-width="2" />
                  </svg>

                  Company <svg className='downarrow' width="11" height="15" viewBox="0 0 11 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.25 14.225L0 9H10.5L5.25 14.225Z" fill="#605750" />
                    <path d="M5.25 9.82285e-05L10.5 5.2251L0 5.2251L5.25 9.82285e-05Z" fill="#605750" />
                  </svg></th>
                <th >
                  <svg className='Line' width="2" height="25" viewBox="0 0 2 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 0V25" stroke="#7D7D7D" stroke-width="2" />
                  </svg>

                  Industry <svg className='downarrow' width="11" height="15" viewBox="0 0 11 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.25 14.225L0 9H10.5L5.25 14.225Z" fill="#605750" />
                    <path d="M5.25 9.82285e-05L10.5 5.2251L0 5.2251L5.25 9.82285e-05Z" fill="#605750" />
                  </svg></th>
                <th >
                  <svg className='Line' width="2" height="25" viewBox="0 0 2 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 0V25" stroke="#7D7D7D" stroke-width="2" />
                  </svg>

                  Email</th>
                <th >
                  <svg className='Line' width="2" height="25" viewBox="0 0 2 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 0V25" stroke="#7D7D7D" stroke-width="2" />
                  </svg>

                  Phone number</th>
                <th>
                  <svg className='Line' width="2" height="25" viewBox="0 0 2 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 0V25" stroke="#7D7D7D" stroke-width="2" />
                  </svg>
                  Country</th>
                <th >
                  <svg className='Line' width="2" height="25" viewBox="0 0 2 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 0V25" stroke="#7D7D7D" stroke-width="2" />
                  </svg>
                  Action</th>
              </tr>
            </thead>
            <tbody id='tbody'>
              {
                data.slice(pagination.start, pagination.end).map((item, idx) => {
                  return (
                    <tr key={idx}>
                      <td className='child'>
                        <input type="checkbox" onChange={(e) => deletecollector(e)}
                          value={item._id}
                        />
                        <span>{item.name}</span></td>
                      <td >{item.designation}</td>
                      <td >{item.company}</td>
                      <td >{item.industry}</td>
                      <Tippy placement="bottom-start" arrow={true} content={<p style={{ position: "relative" }} className={"displaytootip"}>{item.email.slice(0,20)}</p>}>
                        <td style={{ cursor: "pointer" }}>{item.email} </td>
                      </Tippy>
                      <td >{item.phoneNumber}</td>
                      <td >{item.country}</td>
                      <td className='deletesvg'><svg width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.24989 17.1249C1.16169 17.1255 1.07438 17.1073 0.993696 17.0717C0.91301 17.0361 0.840777 16.9838 0.781743 16.9183C0.72271 16.8528 0.678213 16.7755 0.651179 16.6915C0.624144 16.6076 0.615185 16.5189 0.624888 16.4312L1.10614 12.0562C1.12327 11.9164 1.18714 11.7864 1.28739 11.6874L11.5124 1.46244C11.6982 1.2763 11.9188 1.12863 12.1617 1.02787C12.4046 0.927108 12.665 0.875244 12.928 0.875244C13.191 0.875244 13.4514 0.927108 13.6943 1.02787C13.9372 1.12863 14.1579 1.2763 14.3436 1.46244L16.2874 3.40619C16.4735 3.59196 16.6212 3.81262 16.722 4.05553C16.8227 4.29844 16.8746 4.55884 16.8746 4.82182C16.8746 5.0848 16.8227 5.3452 16.722 5.58811C16.6212 5.83102 16.4735 6.05167 16.2874 6.23744L6.06864 16.4562C5.96966 16.5564 5.83972 16.6203 5.69989 16.6374L1.32489 17.1187L1.24989 17.1249ZM2.33114 12.4062L1.95614 15.7937L5.34364 15.4187L15.4061 5.35619C15.4761 5.28652 15.5315 5.20372 15.5694 5.11256C15.6072 5.02139 15.6267 4.92365 15.6267 4.82494C15.6267 4.72623 15.6072 4.62849 15.5694 4.53733C15.5315 4.44617 15.4761 4.36337 15.4061 4.29369L13.4561 2.34369C13.3865 2.27377 13.3037 2.2183 13.2125 2.18044C13.1213 2.14259 13.0236 2.1231 12.9249 2.1231C12.8262 2.1231 12.7284 2.14259 12.6373 2.18044C12.5461 2.2183 12.4633 2.27377 12.3936 2.34369L2.33114 12.4062Z" fill="#0884FF" />
                        <path d="M14.3748 7.88117C14.2925 7.88165 14.211 7.86588 14.1348 7.83478C14.0587 7.80367 13.9894 7.75785 13.931 7.69992L10.0498 3.80617C9.9915 3.7479 9.94527 3.67872 9.91374 3.60258C9.8822 3.52644 9.86597 3.44483 9.86597 3.36242C9.86597 3.28001 9.8822 3.1984 9.91374 3.12226C9.94527 3.04613 9.9915 2.97694 10.0498 2.91867C10.108 2.8604 10.1772 2.81417 10.2534 2.78263C10.3295 2.7511 10.4111 2.73486 10.4935 2.73486C10.5759 2.73486 10.6575 2.7511 10.7337 2.78263C10.8098 2.81417 10.879 2.8604 10.9373 2.91867L14.831 6.81242C14.8896 6.87052 14.9361 6.93965 14.9678 7.01581C14.9996 7.09197 15.0159 7.17366 15.0159 7.25617C15.0159 7.33868 14.9996 7.42037 14.9678 7.49653C14.9361 7.57269 14.8896 7.64182 14.831 7.69992C14.7711 7.75936 14.6999 7.80607 14.6214 7.83722C14.543 7.86837 14.4591 7.88332 14.3748 7.88117Z" fill="#0884FF" />
                        <path d="M10.053 6.81464L5.18726 11.6804L6.07114 12.5643L10.9369 7.69852L10.053 6.81464Z" fill="#0884FF" />
                      </svg>
                        <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={(e) => singledeletehandler(item._id)}>
                          <path d="M14 19.375H4C3.50272 19.375 3.02581 19.1775 2.67417 18.8258C2.32254 18.4742 2.125 17.9973 2.125 17.5V5.625C2.125 5.45924 2.19085 5.30027 2.30806 5.18306C2.42527 5.06585 2.58424 5 2.75 5C2.91576 5 3.07473 5.06585 3.19194 5.18306C3.30915 5.30027 3.375 5.45924 3.375 5.625V17.5C3.375 17.6658 3.44085 17.8247 3.55806 17.9419C3.67527 18.0592 3.83424 18.125 4 18.125H14C14.1658 18.125 14.3247 18.0592 14.4419 17.9419C14.5592 17.8247 14.625 17.6658 14.625 17.5V5.625C14.625 5.45924 14.6908 5.30027 14.8081 5.18306C14.9253 5.06585 15.0842 5 15.25 5C15.4158 5 15.5747 5.06585 15.6919 5.18306C15.8092 5.30027 15.875 5.45924 15.875 5.625V17.5C15.875 17.9973 15.6775 18.4742 15.3258 18.8258C14.9742 19.1775 14.4973 19.375 14 19.375Z" fill="#F81D1D" />
                          <path d="M16.5 4.375H1.5C1.33424 4.375 1.17527 4.30915 1.05806 4.19194C0.940848 4.07473 0.875 3.91576 0.875 3.75C0.875 3.58424 0.940848 3.42527 1.05806 3.30806C1.17527 3.19085 1.33424 3.125 1.5 3.125H16.5C16.6658 3.125 16.8247 3.19085 16.9419 3.30806C17.0592 3.42527 17.125 3.58424 17.125 3.75C17.125 3.91576 17.0592 4.07473 16.9419 4.19194C16.8247 4.30915 16.6658 4.375 16.5 4.375Z" fill="#F81D1D" />
                          <path d="M11.5 4.375C11.3342 4.375 11.1753 4.30915 11.0581 4.19194C10.9408 4.07473 10.875 3.91576 10.875 3.75V1.875H7.125V3.75C7.125 3.91576 7.05915 4.07473 6.94194 4.19194C6.82473 4.30915 6.66576 4.375 6.5 4.375C6.33424 4.375 6.17527 4.30915 6.05806 4.19194C5.94085 4.07473 5.875 3.91576 5.875 3.75V1.25C5.875 1.08424 5.94085 0.925268 6.05806 0.808058C6.17527 0.690848 6.33424 0.625 6.5 0.625H11.5C11.6658 0.625 11.8247 0.690848 11.9419 0.808058C12.0592 0.925268 12.125 1.08424 12.125 1.25V3.75C12.125 3.91576 12.0592 4.07473 11.9419 4.19194C11.8247 4.30915 11.6658 4.375 11.5 4.375Z" fill="#F81D1D" />
                          <path d="M9 16.25C8.83424 16.25 8.67527 16.1842 8.55806 16.0669C8.44085 15.9497 8.375 15.7908 8.375 15.625V6.875C8.375 6.70924 8.44085 6.55027 8.55806 6.43306C8.67527 6.31585 8.83424 6.25 9 6.25C9.16576 6.25 9.32473 6.31585 9.44194 6.43306C9.55915 6.55027 9.625 6.70924 9.625 6.875V15.625C9.625 15.7908 9.55915 15.9497 9.44194 16.0669C9.32473 16.1842 9.16576 16.25 9 16.25Z" fill="#F81D1D" />
                          <path d="M12.125 15C11.9592 15 11.8003 14.9342 11.6831 14.8169C11.5658 14.6997 11.5 14.5408 11.5 14.375V8.125C11.5 7.95924 11.5658 7.80027 11.6831 7.68306C11.8003 7.56585 11.9592 7.5 12.125 7.5C12.2908 7.5 12.4497 7.56585 12.5669 7.68306C12.6842 7.80027 12.75 7.95924 12.75 8.125V14.375C12.75 14.5408 12.6842 14.6997 12.5669 14.8169C12.4497 14.9342 12.2908 15 12.125 15Z" fill="#F81D1D" />
                          <path d="M5.875 15C5.70924 15 5.55027 14.9342 5.43306 14.8169C5.31585 14.6997 5.25 14.5408 5.25 14.375V8.125C5.25 7.95924 5.31585 7.80027 5.43306 7.68306C5.55027 7.56585 5.70924 7.5 5.875 7.5C6.04076 7.5 6.19973 7.56585 6.31694 7.68306C6.43415 7.80027 6.5 7.95924 6.5 8.125V14.375C6.5 14.5408 6.43415 14.6997 6.31694 14.8169C6.19973 14.9342 6.04076 15 5.875 15Z" fill="#F81D1D" />
                        </svg>
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>

        <Modal show={show} onHide={handleClose} animation={false} centered
          style={{ marginLeft: "40%", marginTop: "10%", width: "300px", height: "300px", lineHeight: "40px", textAlign: "center" }}>
          <Modal.Body>
            <ImportForm handleClose={handleClose} Draghandler={Draghandler} Drophandler={Drophandler} filehandler={filehandler} value={value} setvalue={setvalue} />
          </Modal.Body>
        </Modal>
        <Modal show={show1} onHide={handleClose1} animation={false} centered
          style={{ marginLeft: "40%", marginTop: "10%", width: "300px", height: "400px", lineHeight: "60px", textAlign: "center" }}>
          <Modal.Body>
            <span className="filepic1"><span className="material-symbols-outlined">
              done
            </span></span>
            <div style={{ textAlign: "center" }}>
              <h6 style={{ textAlign: "center", marginTop: "15px", fontWeight: "bold" }}>Import Completed</h6>
              <span style={{ color: "#2DA5FC" }}>Csv File is Uploaded</span>
            </div>
          </Modal.Body>
        </Modal>
        <Modal show={show2} onHide={handleClose2} animation={false} centered
          style={{ marginLeft: "40%", marginTop: "10%", width: "300px", height: "400px", lineHeight: "60px", textAlign: "center" }}>
          <Modal.Body>
            <span className="filepic1"><span className="material-symbols-outlined">
              delete
            </span></span>
            <div style={{ textAlign: "center" }}>
              <h6 style={{ textAlign: "center", marginTop: "15px", fontWeight: "bold" }}>Delete Contants</h6>
              <span style={{ color: "#2DA5FC" }}>Sure you want delete this Contacts ?</span>
              <div className='deletesection'>
                <span className='cancel' onClick={(e) => handleClose2()}>Cancel</span>
                <span className='Ok' onClick={(e) => deletehandler(e)}>Ok</span>
              </div>

            </div>
          </Modal.Body>
        </Modal>
        <Modal show={show3} onHide={handleClose3} animation={false} centered
          style={{ marginLeft: "40%", marginTop: "10%", width: "300px", height: "400px", lineHeight: "60px", textAlign: "center" }}>
          <Modal.Body>
            <span className="filepic1"><span className="material-symbols-outlined">
              done
            </span></span>
            <div style={{ textAlign: "center", padding: "30px" }}>
              <h6 style={{ textAlign: "center", marginTop: "15px", fontWeight: "bold" }}>Deleted Contants</h6>
            </div>
          </Modal.Body>
        </Modal>
        {data.length ? (
          <div className='pagenation'>
            <Pagination showPerPage={showPerPage} total={data.length} onPaginationChange={onPaginationChange} />
          </div>
        ) : ""}
      </div>
    </>
  )
}

export default Main
