import React from 'react'

export const ExpandableRows = ({ data }) => {
    return (
        <div className="row pt-3 pb-3 ">
            <div className="col">
                <span className="text-muted fw-bold">Merchant Name</span>
                <p className="fw-bold">{data.name}</p>
                <span className="text-muted">Correo Electrónico</span>
                <p className="fw-bold">{data.email}</p>
                <span className="text-muted">Ciudad</span>
                <p className="fw-bold">{data.city}</p>
            </div>
            <div className="col">
                <span className="text-muted">Codigo Pin</span>
                <p className="fw-bold">{data.pincode}</p>
                <span className="text-muted">Prioridad</span>
                <p className="fw-bold">{data.priority}</p>
                <span className="text-muted">Categoria</span>
                <p className="fw-bold">{data.category}</p>
            </div>
            <div className="col">
                <span className="text-muted">Ciudad</span>
                <p className="fw-bold">{data.city}</p>
                <span className="text-muted">Direccion</span>
                <p className="fw-bold">{data.address}</p>
                <span className="text-muted">Telefono</span>
                <p className="fw-bold">{data.phone}</p>
            </div>
        </div>
    )
}
