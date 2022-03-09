import React from 'react'
import { NavLink, Link } from 'react-router-dom'

export const Sidebar = ({ id }) => {
    const handleClick = () => {
        document.getElementsByClassName('nav-link-item').addClass('active').siblings().removeClass('active')
    }
    return (
        <div className="offcanvas offcanvas-start d-flex flex-column flex-shrink-0 p-3 bg-dark" tabIndex="-1" id={id} aria-labelledby="offcanvasWithBackdropLabel" style={{ width: 280 }}>
            <a href="/" className="d-flex align-items-center mb-md-0 me-md-auto text-white text-decoration-none">
                <span className="fs-4 text-center">
                    <img src="https://patiodelivery.com/wp-content/uploads/2021/02/logo_patio_1.png" alt="logo Patio" width="50%" />
                </span>
            </a>
            <hr />
            <ul className="nav nav-pills flex-column mb-auto" >
                <li>
                    <NavLink to="/" className="text-white nav-link">
                        <i className="fa-solid fa-house me-2"></i>Home
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/merchants" className="text-white nav-link">
                        <i className="fa-solid fa-table-columns me-2"></i>Merchants
                    </NavLink>
                </li>
                <li>
                    <div className="nav-link" role="button" data-bs-toggle="collapse" data-bs-target="#dashboard-collapse">
                        <i className="fa-solid fa-gauge me-2"></i>Dashboard<i className="fa-solid fa-sort-down ms-2 float-end"></i>
                    </div>
                    <div className="collapse" id="dashboard-collapse">
                        <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small ps-3">
                            <NavLink to="/dashboard1" className="text-white nav-link" >
                                <i className="fa-solid fa-table-columns"></i> Dashboard 1
                            </NavLink>
                            <NavLink to="/dashboard2" className="text-white nav-link" >
                                <i className="fa-solid fa-table-columns"></i> Dashboard 2
                            </NavLink>
                        </ul>
                    </div>
                </li>
                <li>
                    <NavLink to="/orders" className="text-white nav-link" >
                        <i className="fa-solid fa-bag-shopping me-2"></i>Orders
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/products" className="text-white nav-link">
                        <i className="fa-solid fa-award me-2"></i>Products
                    </NavLink>
                </li>
            </ul>
        </div>
    )
}
