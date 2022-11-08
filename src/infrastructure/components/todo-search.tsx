import React from "react";


interface TodoSearchProps {

    items:Array<{
        label:string;
        onClick:() => void;

    }>
}


const TodoSearch = (props:TodoSearchProps) => {

    return (
        <div className="todo-fixed-search d-flex justify-content-between align-items-center">
            <div className="sidebar-toggle d-block d-lg-none">
                <i className="bx bx-menu"></i>
            </div>
            <fieldset className="form-group position-relative has-icon-left m-0 flex-grow-1">
                <input type="text" className="form-control todo-search"
                    id="todo-search" placeholder="Search Task" />
                <div className="form-control-position">
                    <i className="bx bx-search"></i>
                </div>
            </fieldset>
           
        </div>
    )
}

export default TodoSearch;