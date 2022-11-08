import React from "react";

interface SidebarLeftProps {
    children: React.ReactNode;
}

const SidebarLeft = (props:SidebarLeftProps) => {
    return <div className="sidebar-left">
    <div className="sidebar">
        {props.children}
    </div>
    </div>
}

export default SidebarLeft;