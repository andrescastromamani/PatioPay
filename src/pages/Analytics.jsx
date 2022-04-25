import React from 'react'
import { Chart as ChartJS } from 'chart.js/auto';
import { Doughnut, Bar } from 'react-chartjs-2'
import { Navbar } from '../components/Navbar'

export const Analytics = () => {
    return (
        <>
            <Navbar />
            <div className="container">
                <div className='d-flex justify-content-between mt-5'>
                    <h4 className="text-uppercase">Analiticas</h4>
                    <div className='d-flex justify-content-between'>
                        <input type="text" className="form-control border-0 me-3" />
                        <input type="text" className="form-control border-0 me-3" />
                        <button className="btn btn-dark"><i className="fa-solid fa-calendar-days"></i></button>
                    </div>
                </div>
                <div className="row mt-5">
                    <div className="col-12 col-md-6">
                        <div className="shadow-sm p-3 mb-5 bg-body rounded">
                            <div className="border p-2 rounded mb-2">
                                <div className="row ">
                                    <div className="col-10">
                                        <h5 className="text-uppercase mb-0">ingresos</h5>
                                        <p className="mb-0">Intervalo de tiempo</p>
                                    </div>
                                    <div className="col-2 d-flex justify-content-end d-flex align-items-center">
                                        <h5 className="text-uppercase">1340</h5>
                                    </div>
                                </div>
                            </div>
                            <div className='border p-2 rounded mb-2'>
                                <div className="row">
                                    <div className="col-10">
                                        <h5 className="text-uppercase mb-0">cobros programados</h5>
                                        <p className=" mb-0">Intervalo de tiempo</p>
                                    </div>
                                    <div className="col-2 d-flex justify-content-end d-flex align-items-center">
                                        <h5 className="text-uppercase">1340</h5>
                                    </div>
                                </div>
                            </div>
                            <div className="border p-2 rounded">
                                <div className="row">
                                    <div className="col-10">
                                        <h5 className="text-uppercase mb-0">ingresos</h5>
                                        <p className="mb-0">Intervalo de tiempo</p>
                                    </div>
                                    <div className="col-2 d-flex justify-content-end d-flex align-items-center">
                                        <h5 className="text-uppercase">1340</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-6 ">
                        <div className="shadow-sm p-3 bg-body rounded">
                            <h4>Ingresos por fecha</h4>
                            <Bar
                                data={{
                                    labels: ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'],
                                    datasets: [
                                        {
                                            label: 'Ingresos',
                                            backgroundColor: 'rgba(255,99,132,0.2)',
                                            borderColor: 'rgba(255,99,132,1)',
                                            borderWidth: 1,
                                            hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                                            hoverBorderColor: 'rgba(255,99,132,1)',
                                            data: [65, 59, 80, 81, 56, 55, 40]
                                        }
                                    ]
                                }}

                            />
                        </div>
                    </div>
                </div>
                <div className="row mt-5">
                    <div className="col-12 col-md-6">
                        <div className="shadow-sm p-3 mb-5 bg-body rounded">
                            <h2>Pagos</h2>
                            <Doughnut
                                data={{
                                    labels: ['QR', 'Tarjeta', 'Patio Pay'],
                                    datasets: [{
                                        data: [300, 50, 100],
                                        backgroundColor: [
                                            '#FF6384',
                                            '#36A2EB',
                                            '#FFCE56',
                                        ],
                                    }]
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
