import React, { useContext, useState } from 'react'
import { AuthContext } from '../../contexts/AuthContext';

export const Login = () => {
    const { user, setUser, users, handleLogin } = useContext(AuthContext);
    const handleSubmit = (e) => {
        e.preventDefault()
        if (user.email === '' || user.password === '') {
            alert('Please fill all fields')
        } else {
            if (users.find(u => u.email === user.email && u.password === user.password)) {
                handleLogin()
            } else {
                alert('Invalid credentials')
            }
        }
    }
    return (
        <div className="" >
            <div className="row rounded border shadow-lg mt-5">
                <div className="col-8 rounded-start bg-green-two m-0 p-0">
                    <div >
                        <img src="https://scontent.fvvi1-1.fna.fbcdn.net/v/t39.30808-6/276131696_2989285371383891_9039273915655545356_n.jpg?_nc_cat=107&ccb=1-5&_nc_sid=8bfeb9&_nc_ohc=WPr5MsRQLGwAX-8Bh-B&tn=zWX-mDAOBWl5WnNC&_nc_ht=scontent.fvvi1-1.fna&oh=00_AT_bOiKewcnEZ01Y8OwkHe1w_-z63Kn6VgCz4t-aWyzoYQ&oe=623F93C8" alt="image" width="80%" style={{ objectFit: 'cover' }} />
                    </div>
                </div>
                <div className="col-4 rounded-end">
                    <div className="d-flex justify-content-center mt-5">
                        <span className="fs-4 text-center">
                            <img src="https://patiodelivery.com/wp-content/uploads/2021/02/logo_patio_1.png" alt="logo Patio" width="50%" />
                        </span>
                    </div>
                    <div className="p-5">
                        <h2 className="text-center">Welcome!</h2>
                        <p className="text-center">Sign in to your account</p>
                        <form id="form-login" className="login-form" onSubmit={handleSubmit}>
                            <div className="form-group mt-5">
                                <input
                                    placeholder="Enter email"
                                    type="email"
                                    name="email"
                                    className="auth-input w-100"
                                    id="email"
                                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                                />
                            </div>
                            <div className="form-group mt-5">
                                <input
                                    type="password"
                                    name="password"
                                    className="auth-input w-100"
                                    id="password"
                                    placeholder="Password"
                                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                                />
                            </div>
                            <div className="form-group mt-5">
                                <button type="submit" className="btn w-100 btn-one text-white mb-3">Login</button>
                            </div>
                        </form>
                        <a href="/register" className="text-dark text-decoration-none">Create Account?</a>

                    </div>
                    <div className="p-5">
                        <div className="row">
                            <div className="col text-center">
                                <a href="https://www.facebook.com/" target="_blank" className="text-dark">
                                    <i className="fa-brands fa-facebook"></i>
                                </a>
                            </div>
                            <div className="col text-center">
                                <a href="https://www.instagram.com/" target="_blank" className="text-dark">
                                    <i className="fa-brands fa-instagram"></i>

                                </a>
                            </div>
                            <div className="col text-center">
                                <a href="https://twitter.com/" target="_blank" className="text-dark">
                                    <i className="fa-brands fa-twitter"></i>
                                </a>
                            </div>
                            <div className="col text-center">
                                <a href="https://twitter.com/" target="_blank" className="text-dark">
                                    <i className="fa-brands fa-linkedin"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}
