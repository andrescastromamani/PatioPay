import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import React, { useState, useEffect } from 'react';
import { Navbar } from '../../components/Navbar';

export const ChargesCreate = () => {
    const [countries, setCountries] = useState();
    const [departaments, setDepartaments] = useState();

    const getDepartaments = async (id) => {
        console.log(id);
        const formData = new FormData();
        formData.append('countryid', id);
        await axios.post('http://localhost:8080/PatioService/pais.php', formData)
            .then(response => {
                setDepartaments(response.data);
            })
            .catch(error => {
                console.log(error);
            })
    }
    const getCountries = async () => {
        await axios.get('http://localhost:8080/PatioService/pais.php')
            .then(response => {
                setCountries(response.data)
            }).catch(error => {
                console.log(error);
            })
    }
    useEffect(() => {
        getCountries()
    }, [])
    const [details, setDetails] = useState([
        {
            id: uuidv4(),
            detail: '',
            quantity: '',
            unitprice: '',
            amount: '',
        },
    ]);
    const handleChange = (e, index) => {
        const detailInput = details.map((i) => {
            if (i.id === index) {
                i[e.target.name] = e.target.value;
            }
            return i;
        })
        setDetails(detailInput);
    }
    const addDetail = () => {
        setDetails([...details, { id: uuidv4(), detail: '', quantity: '', amount: '' }]);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(details);
    }
    return (
        <>
            <Navbar />
            <div className="container mt-4">
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-12 col-md-8">
                            <h3>Nuevo Cobro</h3>
                            <hr />
                            <div className="row">
                                <div className="col-12 col-md-10">
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            name='search'
                                            className="form-control"
                                            placeholder="Buscar Cliente"
                                        />
                                    </div>
                                </div>
                                <div className="col-12 col-md-2">
                                    <i className="fa-solid fa-magnifying-glass"></i>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12 col-md-6">
                                    <input
                                        type="text"
                                        name='name'
                                        className="form-control mt-3"
                                        placeholder="Nombre"
                                    />
                                    <select
                                        name='country'
                                        onChange={
                                            (e) => {
                                                getDepartaments(e.target.value);
                                            }
                                        }
                                        className="form-select mt-3"
                                        aria-label="Default select example"
                                    >
                                        <option value="">Pais</option>
                                        {
                                            countries && countries.map((country) => {
                                                return (
                                                    <option key={country.id} value={country.id}>{country.name}</option>
                                                )
                                            })
                                        }
                                    </select>
                                    <input
                                        type="text"
                                        name='city'
                                        className="form-control mt-3"
                                        placeholder="Ciudad"
                                    />
                                </div>
                                <div className="col-12 col-md-6">
                                    <input
                                        type="text"
                                        name='lastname'
                                        className="form-control mt-3"
                                        placeholder="Apellido"
                                    />
                                    <select
                                        name='departament'
                                        className="form-select mt-3"
                                        aria-label="Default select example"
                                    >
                                        <option value="">Departamento/Estado</option>
                                        {
                                            departaments && departaments.map((departament) => {
                                                return (
                                                    <option key={departament.id} value={departament.id}>{departament.name}</option>
                                                )
                                            })
                                        }
                                    </select>
                                    <input
                                        type="text"
                                        name='address'
                                        className="form-control mt-3"
                                        placeholder="Direccion"
                                    />
                                </div>
                                <div className="col-12">
                                    <div className="bg-secondary mt-3 p-4 rounded">
                                        map content
                                    </div>
                                </div>
                                <div className="col-12 col-md-6">
                                    <input
                                        type="text"
                                        name='phone'
                                        className="form-control mt-3"
                                        placeholder="Telefono"
                                    />
                                    <select
                                        name='document'
                                        className="form-select mt-3"
                                        aria-label="Default select example"
                                    >
                                        <option value="">Documento</option>
                                        <option value="1">CI</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </select>
                                    <input
                                        type="text"
                                        name='businessname'
                                        className="form-control mt-3"
                                        placeholder="Razon Social"
                                    />
                                </div>
                                <div className="col-12 col-md-6">
                                    <input
                                        type="text"
                                        name='email'
                                        className="form-control mt-3"
                                        placeholder="Email"
                                    />
                                    <input
                                        type="text"
                                        name='ci'
                                        className="form-control mt-3"
                                        placeholder="CI"
                                    />
                                    <input
                                        type="text"
                                        name='nit'
                                        className="form-control mt-3"
                                        placeholder="NIT"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-4">
                            <h3>Datos</h3>
                            <hr />
                            <input type="text" className="form-control" placeholder="Monto Total" />
                            <div className="form-check mt-3">
                                <input className="form-check-input" type="checkbox" value="" id="comision" />
                                <label className="form-check-label" htmlFor="comision">Incluir Comision</label>
                            </div>
                            <p>La comision que cobra Patio Pay el del 3.5%, se incluira en el detalle del cobro</p>
                            <div className="form-check mt-2">
                                <input className="form-check-input" type="checkbox" value="" id="sms" />
                                <label className="form-check-label" htmlFor="sms">Enviar por SMS (+0.20 ctvs)</label>
                            </div>
                            <div className="form-check mt-2">
                                <input className="form-check-input" type="checkbox" value="" id="whatsapp" />
                                <label className="form-check-label" htmlFor="whatsapp">Enviar por Whatsapp</label>
                            </div>
                            <div className="form-check mt-2">
                                <input className="form-check-input" type="checkbox" value="" id="email" />
                                <label className="form-check-label" htmlFor="email">Enviar por Email</label>
                            </div>
                            <h4 className="mt-3">Factura Recibo (Opcional)</h4>
                            <p>La factura o recibo cargada se adjuntara el mensaje de cobro enviado para su descarga</p>
                            <div className="bg-secondary p-2">
                                imagen previa
                            </div>
                            <div className="mb-3">
                                <label htmlFor="formFile" className="form-label">Default file input example</label>
                                <input className="form-control" type="file" id="formFile" />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <h4>Detalles (Opcional)</h4>
                        <hr />
                        {
                            details.map((detail) => {
                                return (
                                    <div className='row mt-3' key={detail.id}>
                                        <div className="col-12 col-md-6">
                                            <input
                                                type="text"
                                                name='detail'
                                                value={detail.detail}
                                                onChange={
                                                    (e) => {
                                                        handleChange(e, detail.id)
                                                    }
                                                }
                                                className="form-control"
                                                placeholder="Detalle"
                                            />
                                        </div>
                                        <div className="col-12 col-md-6 d-flex">
                                            <input
                                                type="text"
                                                name='quantity'
                                                value={detail.quantity}
                                                onChange={(e) => {
                                                    handleChange(e, detail.id)
                                                }}
                                                className="form-control me-2"
                                                placeholder="Cantidad"
                                            />
                                            <input
                                                type="text"
                                                name='unitprice'
                                                value={detail.unitprice}
                                                onChange={(e) => {
                                                    handleChange(e, detail.id)
                                                }}
                                                className="form-control me-2"
                                                placeholder="Precio Unitario"
                                            />
                                            <input
                                                type="text"
                                                name='amount'
                                                value={detail.amount}
                                                onChange={(e) => {
                                                    handleChange(e, detail.id)
                                                }}
                                                className="form-control ms-2"
                                                placeholder="Monto"
                                            />
                                        </div>
                                    </div>
                                )
                            })
                        }
                        <div className="col-12 mt-3 d-flex justify-content-end">
                            <button className="btn btn-dark" onClick={addDetail}>Agregar Detalle</button>
                        </div>
                    </div>
                    <hr />
                    <div className="mb-5 d-flex">
                        <button type='submit' className="btn btn-dark me-3 ps-5 pe-5">Guardar y Previsualizar Cobro</button>
                        <button className="btn btn-danger ps-5 pe-5">Cancelar</button>
                    </div>
                </form>
            </div>
        </>
    )
}
