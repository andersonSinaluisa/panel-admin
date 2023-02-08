import React, { useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

interface TaskListProps {
    items: Array<{
        label: string;
        onClick: () => void;
        tags: Array<{
            label: string;
            color: 'primary' | 'secondary' | 'warning' | 'danger' | 'info' | 'light' | string;
        }>
        img_src?: string;
        options?: Array<{
            element: JSX.Element;
        }>
        completed?: boolean;
        data: any;

    }>;
    onChecked: (item: any) => void;
    fetchData? : () => void;
    hasMore?: boolean;

}

const TaskList = (props: TaskListProps) => {
    const [hasMore, setHasMore] = React.useState(true);
    
    React.useEffect(()=>{
        setHasMore(props.hasMore!=undefined? props.hasMore : false)
        console.log('hasMore', props.hasMore)
    })

    return <InfiniteScroll
    className="todo-task-list-wrapper list-unstyled" 
        dataLength={props.items.length} //This is important field to render the next data
        next={props.fetchData? props.fetchData : () => { }}
        hasMore={hasMore}
        loader={
            //spinner
            <div className="d-flex justify-content-center align-items-center">
                <div className="spinner-border text-primary" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        }
        endMessage={
            <p style={{ textAlign: 'center' }}>
                
                <b> 
                    Esos son todos los registros
                </b>
            </p>
        }
        refreshFunction={
            () => console.log('refreshing')
        }
        // below props only if you need pull down functionality
        pullDownToRefresh
        pullDownToRefreshThreshold={50}
        pullDownToRefreshContent={
            <h3 style={{ textAlign: 'center' }}>&#8595; Pull down to refresh</h3>
        }
        releaseToRefreshContent={
            <h3 style={{ textAlign: 'center' }}>&#8593; Release to refresh</h3>
        }
    >
            {
                props.items.map((item, index) => {
                    return (
                        <li className={item.completed === true ? " todo-item completed" : "todo-item "} data-name="David Smith" >
                            <div className="todo-title-wrapper d-flex justify-content-sm-between justify-content-end align-items-center">
                                <div className="todo-title-area d-flex" onClick={item.onClick}>
                                    <i className='bx bx-grid-vertical handle'></i>
                                    <div className="checkbox">
                                        <input type="checkbox" className="checkbox-input"
                                            id={index + ""} onChange={() => props.onChecked(item.data)}
                                            checked={item.completed === true ? true : false}
                                            disabled={item.completed === true ? true : false}
                                        />
                                        <label htmlFor={index + ""}></label>
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


    </InfiniteScroll>

        }

export default TaskList;