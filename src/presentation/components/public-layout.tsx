import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../application/common/hooks/use-auth";


const PublicLayout = () => {
    const { token, dataLogin } = useAuth();


    useEffect(()=>{
        document.body.classList.add('vertical-layout', 'vertical-menu-modern', 
        'boxicon-layout', 'no-card-shadow', '1-column',  'navbar-sticky', 'footer-static',
          'blank-page')
          document.body.setAttribute("data-open","click")
          document.body.setAttribute("data-menu","vertical-menu-modern")
          document.body.setAttribute("data-col","1-column")
          document.body.setAttribute("data-layout","semi-dark-layout")

    },[])

    if (token) {
        return <Navigate to="/" />
    }

    return (
        <>
            <div className="app-content content">
                <div className="content-overlay"></div>
                <div className="content-wrapper">
                    <div className="content-header row">
                    </div>
                    <div className="content-body">
                        <Outlet />
                    </div>
                </div>
            </div>
        </>
    )
}

export default PublicLayout;