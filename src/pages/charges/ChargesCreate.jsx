import { Formik } from 'formik';
import { v4 as uuidv4 } from 'uuid';
import Geocode from "react-geocode";
import { useDispatch } from 'react-redux';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import React, { useState, useEffect } from 'react';

import { Map } from '../../components/Map';
import { Navbar } from '../../components/Navbar';
import { useDetails } from '../../hooks/useDetails';
import { useCharges } from '../../hooks/useCharges';
import { useClients } from '../../hooks/useClientes';
import { fileUpload } from '../../helpers/fileHelper';
import { addCharge } from '../../redux/actions/chargesActions';

Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAPS_API_KEY);
Geocode.setLanguage("en");
Geocode.setRegion("es");

export const ChargesCreate = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        getCountries();
        getClients();
    }, []);
    const charge = {
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
    }
    const [addressFormated, setAddressFormated] = useState('');
    const { addDetail, details, handleChangeDetails } = useDetails();
    const [marker, setMarker] = useState({ lat: -17.8145819, lng: -63.1560853 });
    const { countries, departaments, getCountries, getDepartaments } = useCharges();
    const { search, suggestions, searchClients, getClients, selectClient } = useClients();
    const defaultImage = 'https://patioserviceonline.com/uploads/ventrega/popup/1647351931-default-merchant.jpg';
    Geocode.fromLatLng(marker.lat, marker.lng)
        .then(
            response => {
                const address = response.results[0].formatted_address;
                setAddressFormated(address);
            }
        )
    const submit = async (values) => {
        console.log(values);
        const { invoice } = values;
        let imageUrl = '';
        if (typeof invoice === 'string') {
            imageUrl = invoice;
        } else {
            imageUrl = await fileUpload(invoice).then(res => res.data.link);
        }
        const data = {
            id: uuidv4(),
            ...values,
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
    return (
        <>
            <Navbar />
            <div className="container mt-4">
                <Formik
                    initialValues={charge}
                    validate={
                        (values) => {
                            const errors = {};
                            if (!values.name) {
                                errors.name = 'El nombre es requerido';
                            } else if (!/^[a-zA-Z0-9 ]+$/.test(values.name)) {
                                errors.name = 'Only alphabets, Numbers and spaces are allowed';
                            }
                            if (!values.lastname) {
                                errors.lastname = 'El apellido es requerido';
                            } else if (!/^[a-zA-Z0-9 ]+$/.test(values.lastname)) {
                                errors.lastname = 'Only alphabets, Numbers and spaces are allowed';
                            }
                            if (!values.country) {
                                errors.country = 'El país es requerido';
                            }
                            if (!values.departament) {
                                errors.departament = 'El departamento es requerido';
                            }
                            if (!values.city) {
                                errors.city = 'La ciudad es requerida';
                            }
                            if (!values.address) {
                                errors.address = 'La dirección es requerida';
                            }
                            if (!values.phone) {
                                errors.phone = 'El teléfono es requerido';
                            }
                            if (!values.email) {
                                errors.email = 'El correo es requerido';
                            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                                errors.email = 'Invalid email address';
                            }
                            if (!values.document) {
                                errors.document = 'El tipo de documento es requerido';
                            }
                            if (!values.document_number) {
                                errors.document_number = 'El número de documento es requerido';
                            }
                            if (!values.business_name) {
                                errors.business_name = 'El nombre de la empresa es requerido';
                            }
                            if (!values.nit) {
                                errors.nit = 'El NIT es requerido';
                            }
                            if (!values.mount) {
                                errors.mount = 'El monto es requerido';
                            }
                            return errors;
                        }
                    }
                    onSubmit={(values) => {
                        submit(values);
                    }}
                >
                    {({ values, errors, handleSubmit, handleChange, handleBlur, touched, setFieldValue }) => (
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
                                                    className="form-control"
                                                    placeholder="Buscar Cliente"
                                                />
                                                {
                                                    suggestions.length > 0 && (
                                                        <div className="bg-white combobox suggestion">
                                                            {suggestions.map((client, index) => (
                                                                <p
                                                                    key={index}
                                                                    className="m-0 suggestion-item"
                                                                    onClick={() => {
                                                                        selectClient(client);
                                                                        setFieldValue('name', client.name);
                                                                        setFieldValue('lastname', client.lastname);
                                                                        setFieldValue('country', client.country);
                                                                        setFieldValue('departament', client.departament);
                                                                        setFieldValue('city', client.city);
                                                                        setFieldValue('address', client.address);
                                                                        setFieldValue('phone', client.phone);
                                                                        setFieldValue('email', client.email);
                                                                        setFieldValue('document', client.document);
                                                                        setFieldValue('document_number', client.document_number);
                                                                        setFieldValue('business_name', client.business_name);
                                                                        setFieldValue('nit', client.nit);
                                                                    }}
                                                                >
                                                                    {client.name} {client.lastname}
                                                                </p>
                                                            ))}
                                                        </div>

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
                                                autoComplete='off'
                                                placeholder="Nombre"
                                                className={`form-control mt-3 ${errors.name && 'is-invalid'}`}
                                                value={values.name}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                            {errors.name && touched.name && <div className="text-danger">{errors.name}</div>}
                                            <select
                                                name='country'
                                                value={values.country}
                                                onChange={
                                                    (e) => {
                                                        setFieldValue('country', e.target.value);
                                                        getDepartaments(e.target.value);
                                                    }
                                                }
                                                onBlur={handleBlur}
                                                className={`form-select mt-3 ${errors.country && 'is-invalid'}`}
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
                                            {errors.country && touched.country && <span className='text-danger'>{errors.country}</span>}
                                            <input
                                                type="text"
                                                name='city'
                                                value={values.city}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                className={`form-control mt-3 ${errors.city && 'is-invalid'}`}
                                                placeholder="Ciudad"
                                            />
                                            {errors.city && touched.city && <span className='text-danger'>{errors.city}</span>}
                                        </div>
                                        <div className="col-12 col-md-6">
                                            <input
                                                type="text"
                                                name='lastname'
                                                placeholder="Apellido"
                                                className={`form-control mt-3 ${errors.lastname && 'is-invalid'}`}
                                                value={values.lastname}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                            {errors.lastname && touched.lastname && <span className='text-danger'>{errors.lastname}</span>}
                                            <select
                                                name='departament'
                                                value={values.departament}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                className={`form-select mt-3 ${errors.departament && 'is-invalid'}`}
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
                                            {errors.departament && touched.departament && <span className='text-danger'>{errors.departament}</span>}
                                            <input
                                                type="text"
                                                name='address'
                                                id='address'
                                                value={values.address}
                                                onChange={handleChange}
                                                onClick={(e) => {
                                                    setFieldValue('address', addressFormated);
                                                }}
                                                className={`form-control mt-3 ${errors.address && 'is-invalid'}`}
                                                placeholder="Direccion"
                                            />
                                            {errors.address && touched.address && <span className='text-danger'>{errors.address}</span>}
                                        </div>
                                        <div className="col-12">
                                            <button type="button" className="btn mt-3 border" data-bs-toggle="modal" data-bs-target="#map" style={
                                                {

                                                    backgroundImage: `url('https://i.blogs.es/0a0517/google-maps-detalles-nivel-calle/1366_2000.jpg')`,
                                                    width: '100%',
                                                    height: '80px',
                                                    border: 'none',
                                                    objectFit: 'cover',
                                                    backgroundRepeat: 'no-repeat',
                                                    backgroundPosition: 'center',
                                                    backgroundSize: 'cover',
                                                }
                                            }>
                                                <i className="fa-solid fa-location-dot fs-2 text-danger"></i>
                                            </button>
                                            <Map marker={marker} setMarker={setMarker} />
                                        </div>
                                        <div className="col-12 col-md-6">
                                            <input
                                                type="hidden"
                                                id="lat"
                                                name='lat'
                                                value={values.lat}
                                                onChange={handleChange}
                                                onClick={
                                                    (e) => {
                                                        setFieldValue('lat', marker.lat);
                                                    }
                                                }
                                            />
                                            <input
                                                type="hidden"
                                                id="lng"
                                                name='lng'
                                                value={values.lng}
                                                onChange={handleChange}
                                                onClick={
                                                    (e) => {
                                                        setFieldValue('lng', marker.lng);
                                                    }
                                                }
                                            />
                                            <PhoneInput
                                                className={`form-control custom-input-tel mt-3 ${errors.phone && 'is-invalid'}`}
                                                id="phone"
                                                name="phone"
                                                autoComplete="off"
                                                value={values.phone}
                                                onChange={
                                                    (phone) => {
                                                        setFieldValue('phone', phone);
                                                    }
                                                }
                                                onBlur={handleBlur}
                                            />
                                            {errors.phone && touched.phone && <span className='text-danger'>{errors.phone}</span>}
                                            <select
                                                name='document'
                                                className={`form-select mt-3 ${errors.document && 'is-invalid'}`}
                                                value={values.document}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            >
                                                <option value="">Documento</option>
                                                <option value="ci">CI</option>
                                                <option value="dni">DNI</option>
                                            </select>
                                            {errors.document && touched.document && <span className='text-danger'>{errors.document}</span>}
                                            <input
                                                type="text"
                                                name='business_name'
                                                className={`form-control mt-3 ${errors.business_name && 'is-invalid'}`}
                                                placeholder="Razon Social"
                                                value={values.business_name}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                            {errors.business_name && touched.business_name && <span className='text-danger'>{errors.business_name}</span>}
                                        </div>
                                        <div className="col-12 col-md-6">
                                            <input
                                                type="text"
                                                name='email'
                                                className={`form-control mt-3 ${errors.email && 'is-invalid'}`}
                                                placeholder="Email"
                                                value={values.email}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                            {errors.email && touched.email && <span className='text-danger'>{errors.email}</span>}
                                            <input
                                                type="text"
                                                name='document_number'
                                                className={`form-control mt-3 ${errors.document_number && 'is-invalid'}`}
                                                placeholder="CI"
                                                value={values.document_number}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                            {errors.document_number && touched.document_number && <span className='text-danger'>{errors.document_number}</span>}
                                            <input
                                                type="text"
                                                name='nit'
                                                className={`form-control mt-3 ${errors.nit && 'is-invalid'}`}
                                                placeholder="NIT"
                                                value={values.nit}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                            {errors.nit && touched.nit && <span className='text-danger'>{errors.nit}</span>}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 col-md-4">
                                    <h3>Datos</h3>
                                    <hr />
                                    <input
                                        type="text"
                                        name='mount'
                                        className="form-control border-0"
                                        placeholder="Monto Total"
                                        value={values.mount}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    <div className="form-check mt-3">
                                        <input
                                            className="form-check-input border-0"
                                            type="checkbox"
                                            name="commission"
                                            id="commission"
                                            value={values.commission}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        <label className="form-check-label" htmlFor="comision">Incluir Comision</label>
                                    </div>
                                    <p>La comision que cobra Patio Pay el del 3.5%, se incluira en el detalle del cobro</p>
                                    <div className="form-check mt-2">
                                        <input
                                            className="form-check-input border-0"
                                            type="checkbox"
                                            name="sms"
                                            id="sms"
                                            value={values.sms}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        <label className="form-check-label" htmlFor="sms">Enviar por SMS (+0.20 ctvs)</label>
                                    </div>
                                    <div className="form-check mt-2">
                                        <input
                                            className="form-check-input border-0"
                                            type="checkbox"
                                            name="whatsapp"
                                            id="whatsapp"
                                            value={values.whatsapp}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        <label className="form-check-label" htmlFor="whatsapp">Enviar por Whatsapp</label>
                                    </div>
                                    <div className="form-check mt-2">
                                        <input
                                            className="form-check-input border-0"
                                            type="checkbox"
                                            name="sendemail"
                                            id="sendemail"
                                            value={values.sendemail}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
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
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="row mt-3">
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
                                                        onChange={(e) => { handleChangeDetails(e, detail.id) }}
                                                        className="form-control border-0"
                                                        placeholder="Detalle"
                                                    />
                                                </div>
                                                <div className="col-12 col-md-6 d-flex">
                                                    <input
                                                        type="text"
                                                        name='quantity'
                                                        value={detail.quantity}
                                                        onChange={(e) => { handleChangeDetails(e, detail.id) }}
                                                        className="form-control border-0 me-2"
                                                        placeholder="Cantidad"
                                                    />
                                                    <input
                                                        type="text"
                                                        name='unitprice'
                                                        value={detail.unitprice}
                                                        onChange={(e) => { handleChangeDetails(e, detail.id) }}
                                                        className="form-control border-0 me-2"
                                                        placeholder="Precio Unitario"
                                                    />
                                                    <input
                                                        type="text"
                                                        name='amount'
                                                        value={detail.amount}
                                                        onChange={(e) => { handleChangeDetails(e, detail.id) }}
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
                    )}
                </Formik>
            </div>
        </>
    )
}
