import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { signOut } from '../redux/actions/authActions';


export const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogout = () => {
        dispatch(signOut());
        navigate('/login');
    }
    const user = JSON.parse(localStorage.getItem('user'));
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <button className="btn btn-dark" type="button" data-bs-toggle="offcanvas" data-bs-target="#sidebar" aria-controls="offcanvasWithBackdrop"><i className="fa-solid fa-bars"></i></button>
                <div>
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="/" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <img src="https://github.com/mdo.png" alt="" width="32" height="32" className="rounded-circle me-2" />
                                <strong className="text-white">{
                                    user ? user.name : ''
                                }</strong>
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li><a className="dropdown-item" type='button' href="/">Configuracion</a></li>
                                <li className="dropdown-divider"></li>
                                <li><a className="dropdown-item" href="/" onClick={handleLogout}>Cerrar Sesion</a></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}
