import React from 'react'

export const ExpandableRows = ({ data }) => {
    return (
        <div className="ps-5 pe-5 pt-3 pb-3">
            <div className="row rounded-3 shadow-sm border p-3 ">
                <div className="col-12 col-md-4">
                    <div className='text-center mb-3'>
                        <img
                            className="img-thumbnail"
                            style={{
                                width: "180px",
                                height: "180px",
                                objectFit: "cover",
                            }}
                            alt={data.name}
                            src={data.image}
                        />
                    </div>
                    <p className='text-center m-0'>Nombre</p>
                    <p className='text-center text-muted'>{data.name}</p>
                </div>
                <div className="col-12 col-md-4">
                    <span className="">Correo Electrónico</span>
                    <p className="text-muted">{data.email}</p>
                    <span className="">Telefono</span>
                    <p className="text-muted">{data.phone}</p>
                    <span className="">Ciudad</span>
                    <p className="text-muted">{data.city}</p>
                    <span className="">Dirección</span>
                    <p className="text-muted">{data.address}</p>
                </div>
                <div className="col-12 col-md-4">
                    <span className="">Prioridad</span>
                    <p className="text-muted">{data.priority}</p>
                    <span className="">Codigo Pin</span>
                    <p className="text-muted">{data.pincode}</p>
                    <span className="">Categoria</span>
                    <p className="text-muted">{data.category}</p>
                </div>
            </div>
        </div>
    )
}
