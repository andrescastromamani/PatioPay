import React from 'react';
import { NavLink } from 'react-router-dom'

export const Sidebar = () => {
    return (
        <div className="offcanvas offcanvas-start d-flex flex-column flex-shrink-0 p-3 text-white bg-dark" tabIndex="-1" id="sidebar" aria-labelledby="offcanvasWithBackdropLabel" style={{ width: 280 }}>
            <a href="/" className="d-flex align-items-center mb-md-0 me-md-auto text-white text-decoration-none">
                <span className="fs-4 text-center">
                    <img src="https://patiodelivery.com/wp-content/uploads/2021/02/logo_patio_1.png" alt="logo Patio" width="50%" />
                </span>
            </a>
            <hr />
            <ul className="nav nav-pills flex-column mb-auto" >
                <li>
                    <NavLink to="/" className="text-white nav-link">
                        <i className="fa-solid fa-house me-2"></i>DASHBOARD
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/cobros" className="text-white nav-link">
                        <i className="fa-solid fa-shopping-cart me-2"></i>COBROS
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/analiticas" className="text-white nav-link">
                        <i className="fa-solid fa-shopping-cart me-2"></i>ANALITICAS
                    </NavLink>
                </li>
            </ul>
        </div>
    )
}
