import { v4 as uuidv4 } from 'uuid';
import Geocode from "react-geocode";
import { useDispatch } from 'react-redux';
import React, { useState, useEffect } from 'react';

import { Navbar } from '../../components/Navbar';
import { Map } from '../../components/Map';
import { addCharge } from '../../redux/actions/chargesActions';
import { useCharges } from '../../hooks/useCharges';
import { useClients } from '../../hooks/useClientes';
import { fileUpload } from '../../helpers/fileHelper';

Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAPS_API_KEY);
Geocode.setLanguage("en");
Geocode.setRegion("es");

export const ChargesCreate = () => {
    const dispatch = useDispatch();
    const { countries, departaments, getCountries, getDepartaments } = useCharges();
    const { search, suggestions, searchClients, getClients, selectClient } = useClients();
    const [addressFormated, setAddressFormated] = useState('');
    const [marker, setMarker] = useState({ lat: -17.8145819, lng: -63.1560853 });
    const [details, setDetails] = useState([{
        id: uuidv4(),
        detail: '',
        quantity: '',
        unitprice: '',
        amount: '',
    },]);
    const [charge, setCharge] = useState({
        name: '',
        lastname: '',
        country: '',
        departament: '',
        city: '',
        address: '',
        lat: '',
        lng: '',
        phone: '',
        email: '',
        document: '',
        document_number: '',
        business_name: '',
        nit: '',
        mount: '',
        commission: false,
        sms: false,
        whatsapp: false,
        sendemail: false,
        invoice: '',
    })
    const defaultImage = 'https://patioserviceonline.com/uploads/ventrega/popup/1647351931-default-merchant.jpg';
    const { lat, lng } = marker;
    Geocode.fromLatLng(lat, lng)
        .then(
            response => {
                const address = response.results[0].formatted_address;
                setAddressFormated(address);
            }
        )
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
        setDetails([
            ...details,
            {
                id: uuidv4(),
                detail: '',
                quantity: '',
                amount: ''
            }]);
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { invoice } = charge;
        let imageUrl = '';
        if (typeof invoice === 'string') {
            imageUrl = invoice;
        } else {
            imageUrl = await fileUpload(invoice).then(res => res.data.link);
        }
        const data = {
            id: uuidv4(),
            ...charge,
            invoice: imageUrl,
            details: details.map(i => ({
                detail: i.detail,
                quantity: i.quantity,
                unitprice: i.unitprice,
                amount: i.amount,
            }))
        }
        console.log(data);
        dispatch(addCharge(data));
    }
    useEffect(() => {
        getCountries();
        getClients();
    }, [])
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
                                <div className="col-11">
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            name='search'
                                            autoComplete='off'
                                            value={search}
                                            onChange={searchClients}
                                            className="form-control border-0"
                                            placeholder="Buscar Cliente"
                                        />
                                        {
                                            suggestions.length > 0 && (
                                                suggestions.map((client, index) => (
                                                    <div key={index} className="suggestion">
                                                        <button className='w-100' type='button' onClick={
                                                            () => {
                                                                setCharge({
                                                                    ...charge,
                                                                    name: client.name,
                                                                    lastname: client.lastname,
                                                                    document: client.document,
                                                                    document_number: client.document_number,
                                                                    business_name: client.business_name,
                                                                    nit: client.nit,
                                                                    phone: client.phone,
                                                                    email: client.email,
                                                                    country: client.country,
                                                                    departament: client.departament,
                                                                    city: client.city,
                                                                    address: client.address,
                                                                    lat: client.lat,
                                                                    lng: client.lng,
                                                                    commission: client.commission,
                                                                    sms: client.sms,
                                                                    whatsapp: client.whatsapp,
                                                                    sendemail: client.sendemail,
                                                                    invoice: client.invoice,
                                                                })
                                                                selectClient(client);
                                                            }
                                                        }>
                                                            {
                                                                `${client.name} ${client.lastname}`
                                                            }
                                                        </button>
                                                    </div>
                                                ))
                                            )
                                        }
                                    </div>
                                </div>
                                <div className="col-1 d-flex justify-content-end">
                                    <button className='btn btn-dark' type='button'>
                                        <i className="fa-solid fa-magnifying-glass"></i>
                                    </button>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12 col-md-6">
                                    <input
                                        type="text"
                                        name='name'
                                        value={charge.name}
                                        onChange={(e) => setCharge({ ...charge, name: e.target.value })}
                                        className="form-control border-0 mt-3"
                                        placeholder="Nombre"
                                    />
                                    <select
                                        name='country'
                                        value={charge.country}
                                        onChange={
                                            (e) => {
                                                setCharge({ ...charge, country: e.target.value })
                                                getDepartaments(e.target.value);
                                            }
                                        }
                                        className="form-select border-0 mt-3"
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
                                        value={charge.city}
                                        onChange={(e) => setCharge({ ...charge, city: e.target.value })}
                                        className="form-control border-0 mt-3"
                                        placeholder="Ciudad"
                                    />
                                </div>
                                <div className="col-12 col-md-6">
                                    <input
                                        type="text"
                                        name='lastname'
                                        value={charge.lastname}
                                        onChange={(e) => setCharge({ ...charge, lastname: e.target.value })}
                                        className="form-control border-0 mt-3"
                                        placeholder="Apellido"
                                    />
                                    <select
                                        name='departament'
                                        value={charge.departament}
                                        onChange={(e) => setCharge({ ...charge, departament: e.target.value })}
                                        className="form-select border-0 mt-3"
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
                                        value={charge.address}
                                        onChange={(e) => setCharge({ ...charge, address: e.target.value })}
                                        className="form-control border-0 mt-3"
                                        placeholder="Direccion"
                                    />
                                </div>
                                <div className="col-12">
                                    <div className="bg-secondary mt-3 p-4 rounded">
                                        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#map">
                                            Map
                                        </button>
                                        <Map marker={marker} setMarker={setMarker} />
                                    </div>
                                </div>
                                <div className="col-12 col-md-6">
                                    <input
                                        type="hidden"
                                        id="lat"
                                        name='lat'
                                        value={charge.lat}
                                        onChange={(e) => setCharge({ ...charge, lat: e.target.value })}
                                        onClick={(e) => setMarker({ ...marker, lat: e.target.value })}
                                    />
                                    <input
                                        type="hidden"
                                        id="lng"
                                        name='lng'
                                        value={charge.lng}
                                        onChange={(e) => setCharge({ ...charge, lng: e.target.value })}
                                        onClick={(e) => setMarker({ ...marker, lng: e.target.value })}
                                    />
                                    <input
                                        type="text"
                                        name='phone'
                                        value={charge.phone}
                                        onChange={(e) => setCharge({ ...charge, phone: e.target.value })}
                                        className="form-control border-0 mt-3"
                                        placeholder="Telefono"
                                    />
                                    <select
                                        name='document'
                                        value={charge.document}
                                        onChange={(e) => setCharge({ ...charge, document: e.target.value })}
                                        className="form-select border-0 mt-3"
                                        aria-label="Default select example"
                                    >
                                        <option value="">Documento</option>
                                        <option value="ci">CI</option>
                                        <option value="dni">DNI</option>
                                    </select>
                                    <input
                                        type="text"
                                        name='business_name'
                                        value={charge.business_name}
                                        onChange={(e) => setCharge({ ...charge, business_name: e.target.value })}
                                        className="form-control border-0 mt-3"
                                        placeholder="Razon Social"
                                    />
                                </div>
                                <div className="col-12 col-md-6">
                                    <input
                                        type="text"
                                        name='email'
                                        value={charge.email}
                                        onChange={(e) => setCharge({ ...charge, email: e.target.value })}
                                        className="form-control border-0 mt-3"
                                        placeholder="Email"
                                    />
                                    <input
                                        type="text"
                                        name='document_number'
                                        value={charge.document_number}
                                        onChange={(e) => setCharge({ ...charge, document_number: e.target.value })}
                                        className="form-control border-0 mt-3"
                                        placeholder="CI"
                                    />
                                    <input
                                        type="text"
                                        name='nit'
                                        value={charge.nit}
                                        onChange={(e) => setCharge({ ...charge, nit: e.target.value })}
                                        className="form-control border-0 mt-3"
                                        placeholder="NIT"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-4">
                            <h3>Datos</h3>
                            <hr />
                            <input
                                type="text"
                                name='mount'
                                value={charge.mount}
                                onChange={(e) => setCharge({ ...charge, mount: e.target.value })}
                                className="form-control border-0"
                                placeholder="Monto Total"
                            />
                            <div className="form-check mt-3">
                                <input
                                    className="form-check-input border-0"
                                    type="checkbox"
                                    name="commission"
                                    value={charge.commission}
                                    id="commission"
                                    onChange={(e) => setCharge({ ...charge, commission: e.target.checked })}
                                />
                                <label className="form-check-label" htmlFor="comision">Incluir Comision</label>
                            </div>
                            <p>La comision que cobra Patio Pay el del 3.5%, se incluira en el detalle del cobro</p>
                            <div className="form-check mt-2">
                                <input
                                    className="form-check-input border-0"
                                    type="checkbox"
                                    name="sms"
                                    value={charge.sms}
                                    id="sms"
                                    onChange={(e) => setCharge({ ...charge, sms: e.target.checked })}
                                />
                                <label className="form-check-label" htmlFor="sms">Enviar por SMS (+0.20 ctvs)</label>
                            </div>
                            <div className="form-check mt-2">
                                <input
                                    className="form-check-input border-0"
                                    type="checkbox"
                                    name="whatsapp"
                                    value={charge.whatsapp}
                                    id="whatsapp"
                                    onChange={(e) => setCharge({ ...charge, whatsapp: e.target.checked })}
                                />
                                <label className="form-check-label" htmlFor="whatsapp">Enviar por Whatsapp</label>
                            </div>
                            <div className="form-check mt-2">
                                <input
                                    className="form-check-input border-0"
                                    type="checkbox"
                                    name="sendemail"
                                    value={charge.sendemail}
                                    id="sendemail"
                                    onChange={(e) => setCharge({ ...charge, sendemail: e.target.checked })}
                                />
                                <label className="form-check-label" htmlFor="email">Enviar por Email</label>
                            </div>
                            <h4 className="mt-3">Factura Recibo (Opcional)</h4>
                            <p>La factura o recibo cargada se adjuntara el mensaje de cobro enviado para su descarga</p>
                            <div className="mb-3">
                                <img src={defaultImage} alt="" className="img-thumbnail" width={100} height={100} />
                            </div>
                            <div className="mb-3">
                                <input
                                    className="form-control "
                                    type="file"
                                    id="invoice"
                                    name="invoice"
                                    accept="image/*"
                                    onChange={
                                        (e) => {
                                            setCharge({ ...charge, invoice: e.target.files[0] });
                                        }}
                                />
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
                                                className="form-control border-0"
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
                                                className="form-control border-0 me-2"
                                                placeholder="Cantidad"
                                            />
                                            <input
                                                type="text"
                                                name='unitprice'
                                                value={detail.unitprice}
                                                onChange={(e) => {
                                                    handleChange(e, detail.id)
                                                }}
                                                className="form-control border-0 me-2"
                                                placeholder="Precio Unitario"
                                            />
                                            <input
                                                type="text"
                                                name='amount'
                                                value={detail.amount}
                                                onChange={(e) => {
                                                    handleChange(e, detail.id)
                                                }}
                                                className="form-control border-0 ms-2"
                                                placeholder="Monto"
                                            />
                                        </div>
                                    </div>
                                )
                            })
                        }
                        <div className="col-12 mt-3 d-flex justify-content-end">
                            <button className="btn btn-dark" type="button" onClick={addDetail}>Agregar Detalle</button>
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
