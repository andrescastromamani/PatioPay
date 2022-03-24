import React from 'react'

export const Register = () => {
    return (
        <div className="mt-3 p-5">
            <div className="row">
                <div className="col-8 p-0">
                    <img src="https://www.expacioweb.com/wp-content/uploads/2021/03/tarifa-envio-merchant-center.jpg" alt="image" width="100%" />
                </div>
                <div className="col-4 bg-dark">
                    <div className="p-5">
                        <p className="text-center text-white">Register</p>
                        <form>
                            <div className="form-group mt-3">
                                <label htmlFor="exampleInputEmail1" className="text-white">Email address</label>
                                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                            </div>
                            <div className="form-group mt-3">
                                <label htmlFor="exampleInputPassword1" className="text-white">Password</label>
                                <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
                            </div>
                            <button className="btn btn-dark mt-4 w-100 bg-danger">Login</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
