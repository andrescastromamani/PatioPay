import React from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom'
import { signOut } from '../redux/actions/authActions';

export const Sidebar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogout = () => {
        dispatch(signOut());
        navigate('/login');
    }
    const user = JSON.parse(localStorage.getItem('user'));
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
                        <i className="fa-solid fa-house me-2"></i>Dashboard
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/cobros" className="text-white nav-link">
                        <i className="fa-solid fa-shopping-cart me-2"></i>Pagos
                    </NavLink>
                </li>
            </ul>
            <hr />
            <div className="dropdown">
                <a href="/" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser2" data-bs-toggle="dropdown" aria-expanded="false">
                    <img src="https://github.com/mdo.png" alt="" width="32" height="32" className="rounded-circle me-2" />
                    <strong className="text-white">{
                        user ? user.name : ''
                    }</strong>
                </a>
                <ul className="dropdown-menu text-small shadow" aria-labelledby="dropdownUser2">
                    <li><a href='/' className="dropdown-item" onClick={handleLogout} data-bs-dismiss="offcanvas" aria-label="Close">Cerrar Sesion</a></li>
                </ul>
            </div>
        </div>
    )
}
