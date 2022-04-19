import React from 'react'
import { Navbar } from '../../components/Navbar'

export const ChargesCreate = () => {
    return (
        <>
            <Navbar />
            <div className="container mt-4">
                <form>
                    <div className="row">
                        <div className="col-12 col-md-8">
                            <h3>Nuevo Cobro</h3>
                            <hr />
                            <div className="row">
                                <div className="col-12 col-md-10">
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Buscar Cliente"
                                        />
                                    </div>
                                </div>
                                <div className="col-12 col-md-2">
                                    <i className="fa-solid fa-magnifying-glass"></i>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12 col-md-6">
                                    <input
                                        type="text"
                                        className="form-control mt-3"
                                        placeholder="Nombre"
                                    />
                                    <select class="form-select mt-3" aria-label="Default select example">
                                        <option selected>Pais</option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </select>
                                    <input
                                        type="text"
                                        className="form-control mt-3"
                                        placeholder="Ciudad"
                                    />
                                </div>
                                <div className="col-12 col-md-6">
                                    <input
                                        type="text"
                                        className="form-control mt-3"
                                        placeholder="Apellido"
                                    />
                                    <select class="form-select mt-3" aria-label="Default select example">
                                        <option selected>Departamento/Estado</option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </select>
                                    <input
                                        type="text"
                                        className="form-control mt-3"
                                        placeholder="Direccion"
                                    />
                                </div>
                                <div className="col-12">
                                    <div className="bg-secondary mt-3 p-4 rounded">
                                        map content
                                    </div>
                                </div>
                                <div className="col-12 col-md-6">
                                    <input
                                        type="text"
                                        className="form-control mt-3"
                                        placeholder="Telefono"
                                    />
                                    <select class="form-select mt-3" aria-label="Default select example">
                                        <option selected>Documento</option>
                                        <option value="1">CI</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </select>
                                    <input
                                        type="text"
                                        className="form-control mt-3"
                                        placeholder="Razon Social"
                                    />
                                </div>
                                <div className="col-12 col-md-6">
                                    <input
                                        type="text"
                                        className="form-control mt-3"
                                        placeholder="Email"
                                    />
                                    <input
                                        type="text"
                                        className="form-control mt-3"
                                        placeholder="CI/RUC"
                                    />
                                    <input
                                        type="text"
                                        className="form-control mt-3"
                                        placeholder="NIT"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-4">
                            <h3>Datos</h3>
                            <hr />
                            <input type="text" className="form-control" placeholder="Monto Total" />
                            <div className="form-check mt-3">
                                <input className="form-check-input" type="checkbox" value="" id="comision" />
                                <label className="form-check-label" for="comision">Incluir Comision</label>
                            </div>
                            <p>La comision que cobra Patio Pay el del 3.5%, se incluira en el detalle del cobro</p>
                            <div className="form-check mt-2">
                                <input className="form-check-input" type="checkbox" value="" id="sms" />
                                <label className="form-check-label" for="sms">Enviar por SMS (+0.20 ctvs)</label>
                            </div>
                            <div className="form-check mt-2">
                                <input className="form-check-input" type="checkbox" value="" id="whatsapp" />
                                <label className="form-check-label" for="whatsapp">Enviar por Whatsapp</label>
                            </div>
                            <div className="form-check mt-2">
                                <input className="form-check-input" type="checkbox" value="" id="email" />
                                <label className="form-check-label" for="email">Enviar por Email</label>
                            </div>
                            <h4 className="mt-3">Factura Recibo (Opcional)</h4>
                            <p>La factura o recibo cargada se adjuntara el mensaje de cobro enviado para su descarga</p>
                            <div className="bg-secondary p-2">
                                imagen previa
                            </div>
                            <div className="mb-3">
                                <label for="formFile" className="form-label">Default file input example</label>
                                <input className="form-control" type="file" id="formFile" />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <h4>Detalles (Opcional)</h4>
                        <hr />
                        <div className="col-12 col-md-8">
                            <input type="text" className="form-control" placeholder="Detalle" />
                        </div>
                        <div className="col-12 col-md-4 d-flex">
                            <input type="text" className="form-control me-2" placeholder="Cantidad" />
                            <input type="text" className="form-control ms-2" placeholder="Monto" />
                        </div>
                        <div className="col-12 mt-3 d-flex justify-content-end">
                            <button className="btn btn-dark">Agregar Detalle</button>
                        </div>
                    </div>
                    <hr />
                    <div className="mb-5 d-flex">
                        <button className="btn btn-dark me-3 ps-5 pe-5">Guardar y Previsualizar Cobro</button>
                        <button className="btn btn-danger ps-5 pe-5">Cancelar</button>
                    </div>
                </form>
            </div>
        </>
    )
}
