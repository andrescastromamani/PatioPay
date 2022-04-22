import React from 'react';
import DataTable from 'react-data-table-component';

const columns = [
    {
        name: 'Nombre',
        selector: row => row.nombre,
        sortable: true,
    },
    {
        name: 'Cantidad',
        selector: row => row.monto,
        sortable: true,
    },
    {
        name: 'Telefono',
        selector: row => row.telefono,
        sortable: true,
    },
    {
        name: 'Ubicacion',
        selector: row => row.direccion,
        sortable: true,
    },
    {
        name: 'Estado',
        selector: row => row.estado,
        sortable: true,
    },
    {
        name: 'Actions',
        selector: row => {
            return (
                <div className="">
                    <button className="btn btn-one d-flex justify-content-end">Detalles</button>
                </div>
            );
        }
    }
];

export const Table = ({ data }) => {
    return (
        <DataTable
            columns={columns}
            data={data}
            pagination
        />
    )
}

