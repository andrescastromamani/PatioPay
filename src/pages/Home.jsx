import { Link } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Widget } from '../components/Widget';
import { Table } from '../components/Table';
import { data } from '../data/data';
export const Home = () => {
    return (
        <>
            <Navbar />
            <div className="container">
                <div className="row mt-3">
                    <div className="col-12 col-md-4 mt-3">
                        <Widget
                            title="SUSCRIPCIONES"
                            icon="fa-users"
                            mount={data.suscripciones}
                        />
                    </div>
                    <div className="col-12 col-md-4 mt-3">
                        <Widget
                            title="RECIBIDOS"
                            icon="fa-envelope"
                            mount={` $ ${data.monto_pagos_recibidos}`}
                        />
                    </div>
                    <div className="col-12 col-md-4 mt-3">
                        <Widget
                            title="PROGRAMADOS"
                            icon="fa-calendar"
                            mount={` $ ${data.monto_cobros_programados}`}
                        />
                    </div>
                </div>
                <div className=" mt-4">
                    <div className='d-flex justify-content-between'>
                        <p>COBROS RCIENTES</p>
                        <Link to='/cobros/crear' className='btn btn-dark'>Config</Link>
                    </div>
                    <div className="mt-3 border">
                        <Table
                            data={data.cobros}
                        />
                    </div>
                </div>
                <div className="row mt-4 mb-4">
                    <div className="col-12 col-md-6 ">
                        <p>HISTORIAL DE ACCIONES</p>
                        <div className="border rounded p-3">
                            <ul className='mb-0'>
                                {
                                    data.historial_acciones.map((accion, index) => {
                                        return (
                                            <li key={index} className="timeline-item">
                                                <div className="d-flex justify-content-between timeline-content">
                                                    <p>{accion.detalle}</p>
                                                    <p className=''>{accion.fecha_evento}</p>
                                                </div>
                                            </li>
                                        )
                                    })
                                }
                                <li className="timeline-item-all">
                                    Ver todo
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <p>ULTIMOS MENSAJES</p>
                        <div className="border p-3">
                            <ul>
                                {
                                    data.mensajes.map((mensaje, index) => {
                                        return (
                                            <li key={index}>
                                                <p>
                                                    <span className="font-weight-bold">
                                                        <i className="fa fa-user"></i>
                                                        <span className="ml-2">{mensaje.nombre}</span>
                                                    </span>
                                                </p>
                                                <p>{mensaje.mensaje}</p>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
