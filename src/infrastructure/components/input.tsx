import React, { ChangeEventHandler, HTMLInputTypeAttribute } from "react";


interface InputProps {
    name: string;
    onChange?: ChangeEventHandler<HTMLInputElement> | undefined;
    type: HTMLInputTypeAttribute;
    placeholder?: string | undefined;
    label: string;
    value?:string | undefined;
    step?:string|undefined;
    enabled?:boolean|undefined;
}


const Input = (props: InputProps) => {
    return (
        <div className="form-group">
            <label htmlFor={props.name}>{props.label}</label>
            <input type={props.type}
             id={props.name} onChange={props.onChange} 
             step={props.step}
             disabled={props.enabled}
            className="form-control" name={props.name} placeholder={props.placeholder} value={props.value} />
        </div>
    )
}

export default Input;