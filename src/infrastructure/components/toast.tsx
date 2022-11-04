import React, { useEffect, useState } from "react";

export interface ToastProps{
    type: 'success'|'info'|'primary'|'secondary'|'danger'|'dark'|'light'|"warning";
    visible:boolean;
    title:string;
    description:string;
}

const Toast = (props:ToastProps)=>{

    const [open,setOpen] = useState(false)
    const [data,setData] = useState({
        type: "success",
        visible:false,
        title:"",
        description:""
    })

 
    useEffect(()=>{
        setData(props)
    },[props])

    const handleClose = ()=>{
        setData({
            ...data,
            visible:false
        });
    }

    return(
        <div className={`toast ${data.visible?'show':'hide'}`}>
        <div className={`toast-header bg-${data.type}`}>
            <i className="bx bx-bulb"></i>
            <span className="mr-auto toast-title">{data.title}</span>
            <button type="button" className="close" onClick={handleClose}>
                <i className="bx bx-x"></i>
            </button>
        </div>
        <div className="toast-body">
            {data.description}
        </div>
    </div>
    )
}

export default Toast;