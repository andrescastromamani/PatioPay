import React, { useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext';

export const Login = () => {
    const { user, setUser, handleLogin } = useContext(AuthContext);
    const handleSubmit = (e) => {
        e.preventDefault()
        if (user.email === '' || user.password === '') {
            alert('Please fill all fields')
        } else {
            if (user.email === 'admin@admin.com' && user.password === 'admin123') {
                handleLogin(user)
            } else {
                alert('Invalid credentials')
            }
        }
    }
    return (
        <div className="content-center">
            <div className="row border-radius border shadow-lg">
                <div className="col-12 col-md-8 border-radius-start  bg-green-two m-0 p-0">
                    <div className="d-flex justify-content-center">
                        <img src="https://scontent.fvvi1-1.fna.fbcdn.net/v/t39.30808-6/276131696_2989285371383891_9039273915655545356_n.jpg?_nc_cat=107&ccb=1-5&_nc_sid=8bfeb9&_nc_ohc=WPr5MsRQLGwAX-8Bh-B&tn=zWX-mDAOBWl5WnNC&_nc_ht=scontent.fvvi1-1.fna&oh=00_AT_bOiKewcnEZ01Y8OwkHe1w_-z63Kn6VgCz4t-aWyzoYQ&oe=623F93C8" width="70%" style={{ objectFit: 'cover' }} alt="parner" />
                    </div>
                </div>
                <div className="col-12 col-md-4">
                    <div className="d-flex justify-content-center align-items-center h-100">
                        <div>
                            <div className="d-flex justify-content-center mb-3">
                                <img src="https://patiodelivery.com/wp-content/uploads/2021/02/logo_patio_1.png" className="text-center" width="50%" alt="log" />
                            </div>
                            <p className="text-center m-0">Iniciar sesion con tu cuenta</p>
                            <form id="form-login" className="login-form" onSubmit={handleSubmit}>
                                <div className="form-group mt-4">
                                    <input
                                        placeholder="Ingresa tu correo"
                                        type="email"
                                        name="email"
                                        className="auth-input w-100 rounded-top"
                                        id="email"
                                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                                    />
                                </div>
                                <div className="form-group mt-4">
                                    <input
                                        type="password"
                                        name="password"
                                        className="auth-input w-100 rounded-top"
                                        id="password"
                                        placeholder="Contraseña"
                                        onChange={(e) => setUser({ ...user, password: e.target.value })}
                                    />
                                </div>
                                <div className="form-group mt-4">
                                    <button type="submit" className="btn w-100 btn-one text-white mb-3">
                                        Iniciar sesion
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}
