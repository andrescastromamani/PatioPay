import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

import { Navbar } from '../components/Navbar';
import { Widget } from '../components/Widget';
import { Table } from '../components/Table';
import { getCharges } from '../redux/actions/chargesActions';
import { data } from '../data/data';
export const Home = () => {
    const dispatch = useDispatch();
    const charges = useSelector(state => state.charges.charges);
    useEffect(() => {
        dispatch(getCharges());
    }, [dispatch]);
    return (
        <>
            <Navbar />
            <div className="container">
                <div className="row mt-5">
                    <div className="col-12 col-md-4 ">
                        <Widget
                            type="total"
                            title="Suscripciones"
                            icon="fa-users"
                            mount={data.suscripciones}
                        />
                    </div>
                    <div className="col-12 col-md-4 ">
                        <Widget
                            type="pagos"
                            title="recibidos"
                            icon="fa-envelope"
                            mount={` $ ${data.monto_pagos_recibidos}`}
                        />
                    </div>
                    <div className="col-12 col-md-4 ">
                        <Widget
                            type="cobros"
                            title="programados"
                            icon="fa-calendar"
                            mount={` $ ${data.monto_cobros_programados}`}
                        />
                    </div>
                </div>
                <div className="mt-3">
                    <div className='d-flex justify-content-between'>
                        <p className="text-uppercase">cobros recientes</p>
                        <Link to='/cobros/crear' className='btn bg-dark text-white'>
                            Config
                        </Link>
                    </div>
                    <div className="mt-3 shadow-sm p-3 mb-5 bg-body rounded">
                        <Table
                            data={charges}
                        />
                    </div>
                </div>
                <div className="row mb-3 ">
                    <div className="col-12 col-md-6 mb-3">
                        <p className="text-uppercase">historial de acciones</p>
                        <div className="shadow-sm p-3 bg-body rounded">
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
                        <p className="text-uppercase">ultimos mensajes</p>
                        <div className="shadow-sm p-3 bg-body rounded">
                            <ul>
                                {
                                    data.mensajes.map((mensaje, index) => {
                                        return (
                                            <li key={index} className="p-2 border rounded-3 bg-green text-white mb-2">
                                                <div className='row'>
                                                    <div className="col-1 d-flex align-items-center">
                                                        <div>
                                                            <img src="https://github.com/mdo.png" alt="profile" className="rounded-circle me-2d-flex justify-content-center d-flex align-items-center " width={40} />
                                                        </div>
                                                    </div>
                                                    <div className="col-11">
                                                        <p className="text-capitalize mb-0 fw-bold">{mensaje.nombre}</p>
                                                        <span>{mensaje.fecha_mensaje}</span>
                                                    </div>
                                                    <div className="col-12">
                                                        <p className='mb-0'>{mensaje.mensaje}</p>
                                                    </div>
                                                </div>
                                            </li>
                                        )
                                    })
                                }
                                <li>
                                    Ver todo
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
