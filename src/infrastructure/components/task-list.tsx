import React from 'react';

interface TaskListProps {
    items: Array<{
        label: string;
        onClick: () => void;
        tags: Array<{
            label: string;
            color: 'primary'|'secondary'|'warning'|'danger'|'info'|'light'|string;
        }>
        img_src?: string;
        options?: Array<{
            element: JSX.Element;
        }>
        completed?: boolean;
        data: any;

    }>;
    onChecked:(item:any)=>void;

}

const TaskList = (props:TaskListProps)=>(
    
    <ul className="todo-task-list-wrapper list-unstyled" id="todo-task-list-drag">
        {
            props.items.map((item, index) => {
                return (
                    <li className={item.completed===true?" todo-item completed":"todo-item "} data-name="David Smith" >
                    <div className="todo-title-wrapper d-flex justify-content-sm-between justify-content-end align-items-center">
                        <div className="todo-title-area d-flex" onClick={item.onClick}>
                            <i className='bx bx-grid-vertical handle'></i>
                            <div className="checkbox">
                                <input type="checkbox" className="checkbox-input"
                                 id={index+""} onChange={()=>props.onChecked(item.data)}
                                 checked={item.completed===true?true:false}
                                 disabled={item.completed===true?true:false}
                                 />
                                <label htmlFor={index+""}></label>
                            </div>
                            <p className="todo-title mx-50 m-0 truncate">{item.label}</p>
                        </div>
                        <div className="todo-item-action d-flex align-items-center">
                            <div className="todo-badge-wrapper d-flex">
                                {
                                    item.tags.map((tag, index) => {
                                        return (
                                            <span className={`badge badge-light-${tag.color} badge-pill`}>{tag.label}</span>

                                        )
                                    })
                                }
                            </div>
                           
                            {
                                item.options && item.options.map((option, index) => {
                                    return option.element
                                })
                            }
                            
                        </div>
                    </div>
                </li>
                )
            })
        }
        
       
    </ul>
)

export default TaskList;