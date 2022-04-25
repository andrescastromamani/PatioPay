import React from 'react'
import { Table } from '../../components/Table'
import { Navbar } from '../../components/Navbar'
import { Link } from 'react-router-dom';
import { data } from '../../data/data';

export const Charges = () => {

    return (
        <>
            <Navbar />
            <div className="container mt-4">
                <div className='d-flex justify-content-between'>
                    <h3>COBROS</h3>
                    <Link to='/cobros/crear' className='btn btn-dark'>Nuevo</Link>
                </div>
                <div className="mt-3 shadow-sm p-3 mb-5 bg-body rounded">
                    <Table
                        data={data.cobros}
                    />
                </div>
            </div>
        </>
    )
}
