import React from 'react';

export const Invoice = () => {
    return (
        <div className="container">
            <div className="row bg-invoice p-5">
                <div className="col-12 col-md-6 ">
                    <div className="">
                        <h4 className="d-flex justify-content-start text-uppercase text-white">Recibo</h4>
                    </div>
                </div>
                <div className="col-12 col-md-6">
                    <div>
                        <img src="https://patioserviceonline.com/uploads/ventrega/popup/1652278651-patio%20service%20online%20(1).png" style={{ width: 150 }} className="d-flex justify-content-end" />
                        <p className="mb-0 text-white">Av. Libertador, Santa Cruz de la Sierra, Bolivia</p>
                    </div>
                </div>
                <div className="row mt-5">
                    <div className="col-12 col-md-6">
                        <div className="row">
                            <div className="col-12 col-md-6">
                                <p className="text-uppercase text-white mb-0 fw-bold">Fecha</p>
                                <p className="text-white mb-0">01-02-2022</p>
                            </div>
                            <div className="col-12 col-md-6">
                                <p className="text-uppercase text-white mb-0 fw-bold">factura no.</p>
                                <p className="text-white mb-0">1234</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row mt-5 mb-5">
                    <div className="col-12 col-md-12">
                        <div className="row">
                            <div className="col-md-6">
                                <p className="fw-bold mb-0 text-uppercase text-white">De: Administracion</p>
                                <p className="mb-0 text-white">Teléfono: (+591) 77666780</p>
                                <p className="mb-0 text-white">patioservicedelivery@gmail.com</p>
                            </div>
                            <div className="col-md-6">
                                <p className="fw-bold mb-0 text-uppercase text-white">a: hambuerguesas gohan</p>
                                <p className="text-white mb-0">Cliente 1</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="custom-shape">
                    <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                        <path d="M1200 120L0 16.48 0 0 1200 0 1200 120z" className="shape-fill"></path>
                    </svg>
                </div>
            </div>
            <div className="row bg-white p-5">
                <div className="col-12">
                    <h4 className="text-center text-uppercase mb-5">Ventas por la APP</h4>
                    <div className="overflow-auto">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">Id</th>
                                    <th scope="col">Local</th>
                                    <th scope="col">Cant. Pedidos</th>
                                    <th scope="col">Monto Pedidos</th>
                                    <th scope="col">Comision</th>
                                    <th scope="col">Monto</th>
                                    <th scope="col">Detalle</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row">1</th>
                                    <td>Hamburguesas</td>
                                    <td>3</td>
                                    <td>338.00</td>
                                    <td>200</td>
                                    <td>45</td>
                                    <td className="d-flex">
                                        <button className="btn btn-danger me-2"><i className="fa-solid fa-file-pdf"></i></button>
                                        <button className="btn btn-success"><i className="fa-solid fa-table"></i></button>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">2</th>
                                    <td>Hamburguesas</td>
                                    <td>3</td>
                                    <td>338.00</td>
                                    <td>200</td>
                                    <td>45</td>
                                    <td className="d-flex">
                                        <button className="btn btn-danger me-2"><i className="fa-solid fa-file-pdf"></i></button>
                                        <button className="btn btn-success"><i className="fa-solid fa-table"></i></button>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">3</th>
                                    <td>Hamburguesas</td>
                                    <td>3</td>
                                    <td>338.00</td>
                                    <td>200</td>
                                    <td>45</td>
                                    <td className="d-flex">
                                        <button className="btn btn-danger me-2"><i className="fa-solid fa-file-pdf"></i></button>
                                        <button className="btn btn-success"><i className="fa-solid fa-table"></i></button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div className="row p-5 bg-resume">
                <div className="custom-shape-divider-top-1652277184">
                    <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                        <path d="M1200 120L0 16.48 0 0 1200 0 1200 120z" className="shape-fill"></path>
                    </svg>
                </div>
                <h4 className="text-white text-center text-uppercase mb-5">Resumen</h4>
                <div className="col-12 col-md-6">
                    <div className='d-flex justify-content-between'>
                        <p className="fw-bold mb-0  text-white">Total Pedidos</p>
                        <p className="mb-0 text-white">3</p>
                    </div>
                    <hr className="text-white m-0" />
                    <div className='d-flex justify-content-between'>
                        <p className="fw-bold mb-0  text-white">Comision</p>
                        <p className="mb-0 text-white">66.7 Bs</p>
                    </div>
                    <hr className="text-white mt-0" />
                    <p className="text-white">
                        Enviar comprobante de pago:
                    </p>
                    <a href="/" className='btn btn-success me-3'><i className="fa-brands fa-whatsapp"></i></a>
                    <a href="/" className='btn btn-danger'><i className="fa-solid fa-envelope"></i></a>
                </div>
                <div className="col-12 col-md-6">
                    <div className='d-flex justify-content-center'>
                        <img src="https://cdn.pixabay.com/photo/2020/04/10/13/23/paid-5025785_1280.png" alt="paid" width={200} />
                    </div>
                </div>
                <div className="custom-shape">
                    <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                        <path d="M1200 120L0 16.48 0 0 1200 0 1200 120z" className="shape-fill"></path>
                    </svg>
                </div>
            </div>
            <div className="row bg-white">
                <div className="d-flex justify-content-center">
                    <img src="https://i1.wp.com/patioserviceonline.com/wp-content/uploads/2020/04/logo_patio.png?fit=272%2C166&ssl=1" alt="logo image" width={150} />
                </div>
            </div>
        </div >
    )
}

