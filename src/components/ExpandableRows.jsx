import React from 'react'

export const ExpandableRows = ({ data }) => {
    return (
        <div className="container">
            <div className="row p-2">
                <div className="col">
                    <label htmlFor="name" className="form-label">Nombre:</label>
                    <input type="text" className="form-control" disabled value={data.name} />
                </div>
                <div className="col">
                    <label htmlFor="name" className="form-label">Correo Electronico:</label>
                    <input type="text" className="form-control" disabled value={data.email} />
                </div>
                <div className="col">
                    <label htmlFor="name" className="form-label">Ciudad:</label>
                    <input type="text" className="form-control" disabled value={data.city} />
                </div>
                <div className="col">
                    <label htmlFor="name" className="form-label">Codigo Pin:</label>
                    <input type="text" className="form-control" disabled value={data.pincode} />
                </div>
                <div className="col">
                    <label htmlFor="name" className="form-label">Prioridad:</label>
                    <input type="text" className="form-control" disabled value={data.priority} />
                </div>
            </div>
            <div className="row p-2">
                <div className="col-6">
                    <label htmlFor="name" className="form-label">Direccion:</label>
                    <input type="text" className="form-control" disabled value={data.address} />
                </div>
                <div className="col">
                    <label htmlFor="name" className="form-label">Telefono:</label>
                    <input type="text" className="form-control" disabled value={data.phone} />
                </div>
                <div className="col">
                    <label htmlFor="name" className="form-label">Categoria Comercio:</label>
                    <input type="text" className="form-control" disabled value={data.category} />
                </div>
            </div>
        </div>
    )
}
