import React from 'react'


function ImportForm({ handleClose , Draghandler ,Drophandler , filehandler , value , setvalue}) {
    return (
        <div style={{ minHeight: "200px", textAlign: "center" }}
            onDragOver={(e) => Draghandler(e)}
            onDrop={(e) => Drophandler(e)}
        >
             <label htmlFor='File' className="filepic"><i className="material-icons">upload_file</i></label><br/>
            <input type="file" onChange={(e)=>filehandler(e)} value={value} id="File" style={{position:"absolute",display:"none"}}/>
            <h6 style={{ textAlign: "center", marginTop: "15px" ,fontWeight:"bold"}}>Import File</h6>
            <span style={{color : "#2DA5FC"}}>Drag & Drop a CSV File to Upload</span>
            <br />
            <button style={{ padding: "0px 20px", background: "skyblue", border: "none", borderRadius: "4px", color: "white" }} onClick={(e) => handleClose()}>Cancel</button>

        </div>
    )
}

export default ImportForm;