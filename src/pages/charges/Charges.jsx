import React, { useEffect } from 'react'
import { Table } from '../../components/Table'
import { Navbar } from '../../components/Navbar'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCharges } from '../../redux/actions/chargesActions';

export const Charges = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getCharges());
    }, [dispatch]);
    const charges = useSelector(state => state.charges.charges);
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
                        data={charges}
                    />
                </div>
            </div>
        </>
    )
}
