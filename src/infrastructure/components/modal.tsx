import React from 'react';
import './modal.css';


interface ModalProps{  
    show:boolean;
    children?:JSX.Element;
    className:string;
    style :Object
}

const Modal = (props:ModalProps) => {
    const showHideClassName = props.show ? "modal display-block" : "modal display-none";

    return (
      <div className={showHideClassName}>
        <section className={props.className} style={props.style}>
          {props.children}
        </section>
      </div>
    );
}

export default Modal;