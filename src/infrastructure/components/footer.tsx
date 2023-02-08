import React from "react";


const Footer = () => {
    return (
        <footer className="footer footer-static fixed footer-light">
            <p className="clearfix mb-0"><span className="float-left d-inline-block">
                {
                    new Date().getFullYear()
                }
                &copy; PROBULON</span><span className="float-right d-sm-inline-block d-none">
                    Diseñador<i className="bx bx-code-alt pink mx-50 font-small-3"></i>
                    por
                    <a style={{
                        color: "#FF0000"
                    }} href="http://andersonsinaluisa.com" target="_blank" rel="noreferrer">
                        Anderson Sinaluisa
                    </a>
                </span>
            </p>
        </footer>
    )
}

export default Footer;