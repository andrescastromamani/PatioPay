import React from 'react';
import DataTable from 'react-data-table-component';

const columns = [
    {
        name: 'Nombre',
        selector: row => row.name,
        sortable: true,
    },
    {
        name: 'Cantidad',
        selector: row => row.mount,
        sortable: true,
    },
    {
        name: 'Telefono',
        selector: row => row.phone,
        sortable: true,
    },
    {
        name: 'Ubicacion',
        selector: row => row.address,
        sortable: true,
    },
    {
        name: 'Estado',
        selector: row => row.state,
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

