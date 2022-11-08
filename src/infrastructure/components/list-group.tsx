import React from "react";


export interface ListGroupProps {
    items: Array<{
        label: string|any;
        icon?: string;
        onClick?: () => void;
        classes?:string;
    }>
}


const ListGroup = (props: ListGroupProps) => {
    return (
        <div className="list-group">
            {
                props.items.map((item, index) => {
                    return (
                        <a key={index} href="#" className={"list-group-item list-group-item-action border-0 "+item.classes} onClick={item.onClick}>
                            {
                                item.icon&&<span className="fonticon-wrap mr-50">
                                <i className={item.icon}></i>
                            </span>
                            } {item.label}
                        </a>
                    )
                })
            }
        </div>
    )
}

export default ListGroup;