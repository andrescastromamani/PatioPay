import { useContext, useState } from 'react';
import { Formik } from 'formik';
import Swal from 'sweetalert2';
import axios from 'axios';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

import { MerchantContext } from '../contexts/MerchantContext';
import { resizeFile, dataURIToBlob, previewImage } from '../helpers/helperFile'

export const MerchantCreate = ({ setMapCreateEdit, marker, addressFormated }) => {
  const { merchants, addMerchant } = useContext(MerchantContext);
  const defaultImage = 'https://patioserviceonline.com/uploads/ventrega/popup/1647351931-default-merchant.jpg';
  const { lat, lng } = marker;
  const [check, setCheck] = useState(false)

  return (
    <>
      <div className="modal fade" tabIndex="-1" data-bs-keyboard="false" aria-labelledby="storeModalLabel" aria-hidden="true" id="merchantCreate">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="storeModalLabel">Crear</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <Formik
                initialValues={{
                  name: '',
                  email: '',
                  city: '',
                  lat: '',
                  lng: '',
                  address: '',
                  pincode: '',
                  priority: '',
                  phone: '',
                  image: defaultImage,
                  category: '',
                }}
                validate={(values) => {
                  const errors = {};
                  if (!values.name) {
                    errors.name = 'This field is required';
                  } else if (!/^[a-zA-Z0-9 ]+$/.test(values.name)) {
                    errors.name = 'Only alphabets, Numbers and spaces are allowed';
                  }
                  if (!values.email) {
                    errors.email = 'This field is required';
                  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                    errors.email = 'Invalid email address';
                  }
                  if (!values.city) {
                    errors.city = 'This field is required, select a city';
                  }
                  if (!values.lat || !values.lng) {
                    errors.lat = 'This field is required, select a location';
                  }
                  if (!values.address) {
                    errors.address = 'This field is required';
                  }
                  if (!values.pincode) {
                    errors.pincode = 'This field is required';
                  } else if (!/^[0-9]{6}$/.test(values.pincode)) {
                    errors.pincode = '6 digits only';
                  }
                  if (!values.priority) {
                    errors.priority = 'This field is required';
                  } else if (!/^[0-9]{1}$/.test(values.priority)) {
                    errors.priority = 'Only 1 digit is allowed';
                  }
                  if (!values.phone) {
                    errors.phone = 'This field is required';
                  }
                  if (!values.category) {
                    errors.category = 'This field is required';
                  }
                  return errors;
                }}
                onSubmit={async (values) => {
                  const { name, email, city, lat, lng, address, pincode, priority, phone, image, category } = values;
                  let urlImage = '';
                  if (typeof image === 'string') {
                    urlImage = image;
                  } else {
                    const dataUri = await resizeFile(image);
                    const newBlob = dataURIToBlob(dataUri);
                    const newFile = new File([newBlob], `${image.name}`, {
                      type: "image/png",
                      lastModified: Date.now()
                    })
                    if (newFile.size > 200000) {
                      const divError = document.getElementById('errorImage');
                      divError.appendChild(document.createTextNode('File size is too large (Max: 20kB)'));
                      divError.style.display = 'block';
                      return;
                    }
                    const getUrl = async (file) => {
                      const formData = new FormData();
                      formData.append('popup', file);
                      return await axios({
                        method: 'POST',
                        url: 'http://patioserviceonline.com/api/v2/?route=app_cliente&type=subir_popup',
                        data: formData,
                        headers: {
                          'Content-Type': 'multipart/form-data',
                        }
                      })
                    }
                    urlImage = await getUrl(newFile).then(res => res.data.link);
                    if (urlImage.includes('error')) {
                      const divError = document.getElementById('errorImage');
                      divError.appendChild(document.createTextNode('Error uploading file'));
                      divError.style.display = 'block';
                      return;
                    }
                  }
                  const data = { id: merchants.length + 1, name, email, city, lat, lng, address, pincode, priority, phone, image: urlImage, category };
                  await addMerchant(data);
                  Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Your work has been saved',
                    showConfirmButton: false,
                    timer: 1500
                  })
                }}
              >
                {({ values, errors, handleSubmit, handleChange, handleBlur, touched, setFieldValue }) => (
                  <form onSubmit={handleSubmit}>
                    <div className="">
                      <label htmlFor="name" className="form-label">Nombre:</label>
                      <input
                        className="auth-input w-100 rounded-top"
                        placeholder="Nombre"
                        name="name"
                        type="text"
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        autoComplete="off"
                      />
                      {errors.name && touched.name && <div className="text-danger">{errors.name}</div>}
                    </div>
                    <div className="mt-2">
                      <label htmlFor="email" className="form-label">Correo Electronico:</label>
                      <input
                        type="email"
                        className="auth-input w-100 rounded-top"
                        id="email"
                        name="email"
                        placeholder="Enter Email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        autoComplete="off"
                      />
                      {errors.email && touched.email && <div className="text-danger">{errors.email}</div>}
                    </div>
                    <div className="mt-2">
                      <label htmlFor="city" className="form-label">City:</label>
                      <select
                        className="auth-input w-100 rounded-top"
                        aria-label="Default select example"
                        id='city'
                        name='city'
                        value={values.city}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      >
                        <option value="">Select a City</option>
                        <option value="arequipa">Arequipa</option>
                        <option value="chandigarh">Chandigarh</option>
                        <option value="cochabamba">Cochabamba</option>
                        <option value="elalto">El Alto</option>
                        <option value="juliaca">Juliaca</option>
                        <option value="lapaz">La Paz</option>
                        <option value="montevideo">Montevideo</option>
                        <option value="newyorkcity">New York City</option>
                        <option value="sanjosedemayo">San Jose de Mayo</option>
                        <option value="santacruzdelasierra">Santa Cruz de la Sierra</option>
                        <option value="sucre">Sucre</option>
                        <option value="tarija">Tarija</option>
                        <option value="villaimperialdepotosi">Villa Imperial de Potosi</option>
                      </select>
                      {errors.city && touched.city && <div className="text-danger">{errors.city}</div>}
                    </div>
                    <div className="mt-2">
                      <label htmlFor="location" className="form-label">Direccion:</label>
                      <button type='button' className='pin-location ms-3' data-bs-target="#googlemaps" data-bs-toggle="modal" data-bs-dismiss="modal" onClick={
                        () => {
                          setMapCreateEdit('create');
                        }
                      }>
                        <i className="fa-solid fa-location-dot"></i>
                      </button>
                      {
                        errors.lat && touched.lat && <div className="text-danger">{errors.lat}</div>
                      }
                    </div>
                    <input
                      type="hidden"
                      id="lat"
                      name="lat"
                      value={values.lat}
                      onClick={() => {
                        setFieldValue('lat', lat);
                      }}
                      onChange={handleChange}
                    />
                    <input
                      type="hidden"
                      id="lng"
                      name="lng"
                      value={values.lng}
                      onClick={() => {
                        setFieldValue('lng', lng);
                      }}
                      onChange={handleChange}
                    />
                    <div className="mt-2">
                      <label htmlFor="address" className="form-label">Mostrar Direccion:</label>
                      <input
                        type="text"
                        className="auth-input w-100 rounded-top"
                        id="address"
                        name="address"
                        value={values.address}
                        onChange={handleChange}
                        onClick={() => {
                          setFieldValue('address', addressFormated);
                        }}
                        onBlur={handleBlur}
                      />
                      {errors.address && touched.address && <div className="text-danger">{errors.address}</div>}
                    </div>
                    <div className="mt-2">
                      <label htmlFor="pincode" className="form-label">Codigo Pin:</label>
                      <input
                        type="number"
                        className="auth-input w-100 rounded-top"
                        id="pincode"
                        placeholder="Pin code"
                        name='pincode'
                        value={values.pincode}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.pincode && touched.pincode && <div className="text-danger">{errors.pincode}</div>}
                    </div>
                    <div className="mt-2">
                      <label htmlFor="priority" className="form-label">Prioridad:</label>
                      <input
                        type="number"
                        className="auth-input w-100 rounded-top"
                        id="priority"
                        placeholder="Enter Priority"
                        name='priority'
                        value={values.priority}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.priority && touched.priority && <div className="text-danger">{errors.priority}</div>}
                    </div>
                    <div className="mt-2">
                      <label htmlFor="phone" className="form-label">Telefono:</label>
                      <PhoneInput
                        className="auth-input w-100 rounded-top"
                        id='phone'
                        name='phone'
                        placeholder="+591 9999999"
                        value={values.phone}
                        onChange={
                          (phone) => {
                            setFieldValue('phone', phone);
                          }
                        }
                        onBlur={handleBlur}
                      />
                      {errors.phone && touched.phone && <div className="text-danger">{errors.phone}</div>}
                    </div>
                    <div className="mt-2">
                      <label htmlFor="image" className="form-label">Imagen:</label>
                      <input
                        className="auth-input w-100 rounded-top"
                        type="file"
                        name="image"
                        id="image"
                        accept="image/*"
                        onChange={
                          (e) => {
                            previewImage(e.target.files[0]);
                            setFieldValue('image', e.target.files[0] ? e.target.files[0] : defaultImage);
                          }
                        }
                        onBlur={handleBlur}
                      />
                      <div className="text-danger" id="errorImage"></div>
                      {errors.image && touched.image && <div className="text-danger">{errors.image}</div>}
                    </div>
                    <div className="mt-2" >
                      <div className="col-3"></div>
                      <div className="col-3">
                        <img src={defaultImage} id="previewImage" width="100%" alt='img preview' />
                      </div>
                    </div>
                    <div className="mt-2">
                      <label htmlFor="email" className="form-label">Categoria:</label>
                      <select
                        className="auth-input w-100 rounded-top"
                        aria-label="Default select example"
                        name='category'
                        id='category'
                        value={values.category}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      >
                        <option value="">Seleccionar categoria</option>
                        <option value="category1">Categoria 1</option>
                        <option value="category2">Categoria 2</option>
                        <option value="category3">Categoria 3</option>
                      </select>
                      {errors.category && touched.category && <div className="text-danger">{errors.category}</div>}
                    </div>
                    <div className="mt-2">
                      <label htmlFor="locales" className="form-label">Locales:</label>
                      <div className="col-9">
                        <div className="form-check form-switch">
                          <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" checked={check} onChange={
                            (e) => {
                              const { checked } = e.target
                              setCheck(checked)
                            }
                          } />
                        </div>
                      </div>
                    </div>
                    {
                      check ?
                        (<div className="p-3 rounded border mt-3">
                          <div className="row">
                            <div className="col-4">
                              <select className="form-select" aria-label="Default select example">
                                <option defaultValue="Select a Category">Select Local</option>
                                <option value="1">One</option>
                                <option value="2">One</option>
                                <option value="3">One</option>
                              </select>
                            </div>
                            <div className="col-4">
                              <input className="form-control" placeholder="Name" name="name" id="name" type="text" />
                            </div>
                            <div className="col-4">
                              <a href="www.google.com" className="m-3">
                                <i className="fa-solid fa-xmark"></i>
                              </a>
                              <a href="www.google.com" className="m-3">
                                <i className="fa-solid fa-circle-plus"></i>
                              </a>
                            </div>
                          </div>
                        </div>)
                        : null
                    }
                    <button type='submit' hidden className='btn btn-info' id='btnsubmit'>Save</button>
                  </form>
                )}
              </Formik>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-one"
                onClick={() => {
                  document.getElementById('btnsubmit').click();
                }}
              >Guardar</button>
              <button type="button" className="btn btn-two" data-bs-dismiss="modal">Cerrar</button>
            </div>
          </div>
        </div>
      </div >
    </>
  )
}
