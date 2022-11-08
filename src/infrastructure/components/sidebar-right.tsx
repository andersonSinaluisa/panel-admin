import React, { useEffect } from "react";


interface SidebarRightProps {
    children: JSX.Element;
    show: boolean;
    onClose: () => void;
    title: string;
    buttonHeader?: JSX.Element;
    options?: JSX.Element;
}

const SidebarRight = (props: SidebarRightProps) => {

    const [show, setShow] = React.useState(props.show);

    useEffect(() => {
        setShow(props.show);
    }, [props.show]);

    return (
        <div className={`todo-new-task-sidebar  ${show ? "show ps--active-y" : ""}`}  style={{overflow:'auto'}}>
            <div className="card shadow-none p-0 m-0">
                <div className="card-header border-bottom py-75">
                    <div className="task-header d-flex justify-content-between align-items-center">
                        <h5 className="new-task-title mb-0">{props.title}</h5>
                        {
                            props.buttonHeader
                        }
                        {
                            props.options
                        }

                    </div>
                    <button type="button" className="close close-icon" onClick={() => setShow(!show)}>
                        <i className="bx bx-x"></i>
                    </button>
                </div>

            </div>
            <form id="compose-form" className="mt-1" >
                <div className="card-content" >
                    <div className="card-body py-0 border-bottom" >
                        {
                            props.children
                        }
                    </div>
                </div>
            </form>
        </div>
    )
}

export default SidebarRight;