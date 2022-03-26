import React from 'react'

export const ExpandableRows = ({ data }) => {
    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <label htmlFor="name">Nombre:</label>
                    <input type="text" className="form-control" disabled value={data.name} />
                </div>
                <div className="col">
                    <label htmlFor="name">Correo Electronico:</label>
                    <input type="text" className="form-control" disabled value={data.email} />
                </div>
                <div className="col">
                    <label htmlFor="name">Ciudad:</label>
                    <input type="text" className="form-control" disabled value={data.city} />
                </div>
                <div className="col">
                    <label htmlFor="name">Codigo Pin:</label>
                    <input type="text" className="form-control" disabled value={data.pincode} />
                </div>
                <div className="col">
                    <label htmlFor="name">Prioridad:</label>
                    <input type="text" className="form-control" disabled value={data.priority} />
                </div>
            </div>
            <div className="row">
                <div className="col-6">
                    <label htmlFor="name">Direccion:</label>
                    <input type="text" className="form-control" disabled value={data.address} />
                </div>
                <div className="col">
                    <label htmlFor="name">Telefono:</label>
                    <input type="text" className="form-control" disabled value={data.phone} />
                </div>
                <div className="col">
                    <label htmlFor="name">Categoria Comercio:</label>
                    <input type="text" className="form-control" disabled value={data.category} />
                </div>
            </div>
        </div>
    )
}
