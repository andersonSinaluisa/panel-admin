import React from "react";


interface CardItemProps{
    title:string;
    children:React.ReactNode;
    footer:string;
    color:string;
    onClick:Function;
}


const CardItem = (props:CardItemProps)=>{

    const handleClick = ()=>{
        props.onClick()
    }

    return(
        <div className={`card `} style={{background:props.color}} onClick={handleClick}>
            <div className="card-header text-white d-flex justify-content-center">
                <h5 className="text-white">
                {props.title}
                </h5>
            </div>
            <div className="card-body">
                {props.children}
            </div>
            <div className="card-footer d-flex justify-content-center text-white text-bold-400">
                {props.footer}
            </div>
        </div>
    )
}

export default CardItem;