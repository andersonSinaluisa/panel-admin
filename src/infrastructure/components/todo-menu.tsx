import React from 'react';


interface TodoMenuProps{
    children:React.ReactNode;
}

const TodoMenu = (props:TodoMenuProps) => {
    return (

        <div className="todo-sidebar d-flex">
            <span className="sidebar-close-icon">
                <i className="bx bx-x"></i>
            </span>
            {/* todo app menu */}
            <div className="todo-app-menu">
                {props.children}
            </div>
        </div>
    )
}

export default TodoMenu;