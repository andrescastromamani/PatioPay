import { useState } from 'react';
import { Formik } from 'formik';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import Geocode from 'react-geocode';
import axios from 'axios';
import Resizer from 'react-image-file-resizer';

import './css/modal.css';
import Map from './Map';


Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAPS_API_KEY);
Geocode.setLanguage("en");
Geocode.setRegion("es");

export const Modal = ({ id }) => {
  const defaultImage = 'https://www.leadershipmartialartsct.com/wp-content/uploads/2017/04/default-image-620x600.jpg';
  const [addressFormated, setAddressFormated] = useState('');
  const [marker, setMarker] = useState({
    lat: -17.8145819,
    lng: -63.1560853
  });
  const { lat, lng } = marker;
  const [check, setCheck] = useState(false)
  Geocode.fromLatLng(lat, lng)
    .then(
      response => {
        const address = response.results[0].formatted_address;
        setAddressFormated(address);
      }
    )
  const handleChangeCheck = (e) => {
    const { checked } = e.target
    setCheck(checked)
  }
  const handleClickSubmit = () => {
    document.getElementById('btnsubmit').click();
  }
  const resizeFile = (file) => {
    if (file.type === 'image/jpeg' || file.type === 'image/png') {
      return new Promise((resolve) => {
        Resizer.imageFileResizer(
          file,
          300,
          300,
          'JPEG',
          100,
          0,
          (uri) => {
            resolve(uri);
          },
          "base64"
        );
      });
    }
    return new Promise((resolve) => {
      resolve(file);
    })
  }

  const dataURIToBlob = (dataURI) => {
    const splitDataURI = dataURI.split(",");
    const byteString =
      splitDataURI[0].indexOf("base64") >= 0
        ? atob(splitDataURI[1])
        : decodeURI(splitDataURI[1]);
    const mimeString = splitDataURI[0].split(":")[1].split(";")[0];
    const ia = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++) ia[i] = byteString.charCodeAt(i);
    return new Blob([ia], { type: mimeString });
  };
  const previewImage = async (file) => {
    if (file) {
      const dataUri = await resizeFile(file);
      document.getElementById('previewImage').src = dataUri;
    }
  }

  return (
    <>
      <div className="modal fade" tabIndex="-1" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="storeModalLabel" aria-hidden="true" id={id}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="storeModalLabel">Add New Store</h5>
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
                  if (values.image.type !== 'image/jpeg' && values.image.type !== 'image/png' && values.image.type !== 'image/jpg') {
                    errors.image = 'Only jpg, jpeg and png files are allowed';
                  } else if (values.image.size > 2000000) {
                    errors.image = 'File size is too large (max: 2MB)';
                  }
                  return errors;
                }}
                onSubmit={async (values) => {
                  const { name, email, city, lat, lng, address, pincode, priority, phone, image, category } = values;
                  const dataUri = await resizeFile(image);
                  const newBlob = dataURIToBlob(dataUri);
                  const newFile = new File([newBlob], `${image.name}`, {
                    type: "image/png",
                    lastModified: Date.now()
                  })
                  if (newFile.size > 20000) {
                    alert('File size is too large');
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
                  const url = await getUrl(newFile).then(res => res.data.link);
                  console.log(url);
                  const data = {
                    name,
                    email,
                    city,
                    lat,
                    lng,
                    address,
                    pincode,
                    priority,
                    phone,
                    image: url,
                    category
                  }

                  console.log(data);
                }}
              >
                {({ values, errors, handleSubmit, handleChange, handleBlur, touched, setFieldValue }) => (
                  <form onSubmit={handleSubmit}>
                    <div className="form-group row">
                      <label htmlFor="name" className="col-3 form-control-label text-end">Store Name:</label>
                      <div className="col-9">
                        <input
                          className={`form-control ${errors.name && touched.name && 'is-invalid'}`}
                          placeholder="Nombre"
                          name="name"
                          type="text"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.name}
                          autoComplete="off"
                        />
                        {errors.name && touched.name && <div className="text-danger">{errors.name}</div>}
                      </div>
                    </div>
                    <div className="mt-2 form-group row">
                      <label htmlFor="email" className="form-label col-3 text-end">Email:</label>
                      <div className="col-9">
                        <input
                          type="email"
                          className={`form-control ${errors.email && touched.email && 'is-invalid'}`}
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
                    </div>
                    <div className="mt-2 form-group row">
                      <label htmlFor="city" className="form-label col-3 text-end">City:</label>
                      <div className="col-9">
                        <select
                          className={`form-select ${errors.city && touched.city && 'is-invalid'}`}
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
                    </div>
                    <div className="mt-2 form-group row">
                      <label htmlFor="location" className="form-label col-3 text-end">Address:</label>
                      <div className="col-9">
                        <button type='button' className='pin-location' data-bs-target="#googlemaps" data-bs-toggle="modal" data-bs-dismiss="modal">
                          <i className="fa-solid fa-location-dot"></i>
                        </button>
                        {
                          errors.lat && touched.lat && <div className="text-danger">{errors.lat}</div>
                        }
                      </div>
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
                    <div className="mt-2 form-group row">
                      <label htmlFor="address" className="form-label col-3 text-end">Display Address:</label>
                      <div className="col-9">
                        <input
                          type="text"
                          autoComplete="off"
                          className={`form-control ${errors.address && touched.address && 'is-invalid'}`}
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
                    </div>
                    <div className="mt-2 form-group row">
                      <label htmlFor="pincode" className="form-label col-3 text-end">Pin Code:</label>
                      <div className="col-9">
                        <input
                          type="number"
                          className={`form-control ${errors.pincode && touched.pincode && 'is-invalid'}`}
                          id="pincode"
                          placeholder="Pin code"
                          name='pincode'
                          value={values.pincode}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {errors.pincode && touched.pincode && <div className="text-danger">{errors.pincode}</div>}
                      </div>
                    </div>
                    <div className="mt-2 form-group row">
                      <label htmlFor="priority" className="form-label col-3 text-end">Priority:</label>
                      <div className="col-9">
                        <input
                          type="number"
                          className={`form-control ${errors.priority && touched.priority && 'is-invalid'}`}
                          id="priority"
                          placeholder="Enter Priority"
                          name='priority'
                          value={values.priority}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {errors.priority && touched.priority && <div className="text-danger">{errors.priority}</div>}
                      </div>
                    </div>
                    <div className="mt-2 form-group row">
                      <label htmlFor="phone" className="col-3 form-control-label text-end">Phone:</label>
                      <div className="col-9">
                        <PhoneInput
                          className={`form-control ${errors.phone && touched.phone && 'is-invalid'}`}
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
                    </div>
                    <div className="mt-2 form-group row">
                      <label htmlFor="image" className="col-3 form-control-label text-end">Image:</label>
                      <div className="col-9">
                        <input
                          className="form-control"
                          type="file"
                          name="image"
                          id="image"
                          accept="image/*"
                          onChange={
                            (e) => {
                              previewImage(e.target.files[0]);
                              setFieldValue('image', e.target.files[0]);
                            }
                          }
                          onBlur={handleBlur}
                        />
                        <div className="text-danger" id="errorImage"></div>
                        {errors.image && touched.image && <div className="text-danger">{errors.image}</div>}
                      </div>
                    </div>
                    <div className="mt-2 row" >
                      <div className="col-3"></div>
                      <div className="col-3">
                        <img src={defaultImage} id="previewImage" width="100%" alt='img previes' />
                      </div>
                    </div>
                    <div className="mt-2 form-group row">
                      <label htmlFor="email" className="form-label col-3 text-end">Merchant Category:</label>
                      <div className="col-9">
                        <select
                          className={`form-select ${errors.category && touched.category && 'is-invalid'}`}
                          aria-label="Default select example"
                          name='category'
                          id='category'
                          value={values.category}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        >
                          <option value="">Select a Category</option>
                          <option value="1">One</option>
                          <option value="2">two</option>
                          <option value="3">three</option>
                        </select>
                        {errors.category && touched.category && <div className="text-danger">{errors.category}</div>}
                      </div>
                    </div>
                    <div className="mt-2 form-group row">
                      <label htmlFor="locales" className="form-label col-3 text-end">Locales:</label>
                      <div className="col-9">
                        <div className="form-check form-switch">
                          <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" checked={check} onChange={handleChangeCheck} />
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
              <button type="button" className="btn btn-one" onClick={handleClickSubmit}>Submit</button>
              <button type="button" className="btn btn-two" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div >
      <Map id="googlemaps" marker={marker} setMarker={setMarker} />
    </>
  )
}
