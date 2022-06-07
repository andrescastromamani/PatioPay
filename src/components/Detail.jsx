import React from 'react'
import { useDetails } from '../hooks/useDetails'

export const Detail = () => {
    const { details, addDetail, removeDetail, handleChangeDetails, handleBlurDetails } = useDetails()
    return (
        <div className="row mt-3">
            <h4>Detalles (Opcional)</h4>
            <hr />
            {
                details.map((detail) => {
                    return (
                        <div className='row mt-3' key={detail.id}>
                            <div className="col-12 col-md-6">
                                <input
                                    type="text"
                                    name='detail'
                                    className="form-control border-0"
                                    placeholder="Detalle"
                                    value={detail.detail}
                                    onChange={(e) => { handleChangeDetails(e, detail.id) }}
                                    onBlur={
                                        (e) => {
                                            handleBlurDetails(e, detail.id);
                                        }
                                    }
                                />
                            </div>
                            <div className="col-12 col-md-6 d-flex">
                                <input
                                    type="text"
                                    name='quantity'
                                    placeholder="Cantidad"
                                    className="form-control border-0 me-2"
                                    value={detail.quantity}
                                    onChange={(e) => { handleChangeDetails(e, detail.id) }}
                                    onBlur={
                                        (e) => {
                                            handleBlurDetails(e, detail.id);
                                        }
                                    }
                                />
                                <input
                                    type="text"
                                    name='unitprice'
                                    placeholder="Precio Unitario"
                                    className="form-control border-0 me-2"
                                    value={detail.unitprice}
                                    onChange={(e) => { handleChangeDetails(e, detail.id) }}
                                />
                                <input
                                    type="text"
                                    name='amount'
                                    className="form-control border-0 ms-2"
                                    placeholder="Monto"
                                    value={detail.amount}
                                    onChange={(e) => { handleChangeDetails(e, detail.id) }}
                                />
                                <button
                                    type='button'
                                    className="btn btn-danger ms-2"
                                    onClick={() => { removeDetail(detail.id) }}
                                ><i className="fa-solid fa-trash"></i></button>
                            </div>
                        </div>
                    )
                })
            }
            <div className="col-12 mt-3 d-flex justify-content-end">
                <button className="btn btn-dark" type="button" onClick={addDetail}>Agregar Detalle</button>
            </div>
        </div>
    )
}
