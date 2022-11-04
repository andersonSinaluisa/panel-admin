import React from "react";



interface SelectProps {
    options: Array<{
        label: string;
        value: number|string;
    }>;
    name: string;
    label: string;
    onChange?:React.ChangeEventHandler<HTMLSelectElement>,
    selected?:number|undefined|string;
    multiple?:boolean;
    classes?:string;
}

const Select = (props: SelectProps) => {
    return (
        <fieldset className="form-group">
            <h6>{props.label}</h6>
            <select className={`${props.classes} form-control `} 
            id={props.name} name={props.name} onChange={props.onChange}
            multiple={props.multiple}
            >   
            <option value="">{"Seleccione una opción"}</option>
                {
                    props.options.map(e => {
                        
                        return <option value={e.value} selected={e.value===props.selected}>{e.label}</option>
                    })
                }

            </select>
        </fieldset>
    )
}


export default Select;