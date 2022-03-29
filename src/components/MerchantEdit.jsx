import { useContext, useState } from 'react';
import Swal from 'sweetalert2';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import axios from 'axios';

import { MerchantContext } from '../contexts/MerchantContext';
import { resizeFile, dataURIToBlob, previewImageEdit } from '../helpers/helperFile'

export const MerchantEdit = ({ merchant, setMerchant, setMapCreateEdit, marker, addressFormated }) => {
    const { updateMerchant } = useContext(MerchantContext);
    const [errors, setErrors] = useState({});
    const validate = (values) => {
        if (!values.name) {
            setErrors({ ...errors, name: 'This field is required' });
        } else if (!/^[a-zA-Z0-9 ]+$/.test(values.name)) {
            setErrors({ ...errors, name: 'Name can only contain letters and numbers' });
        }
        if (!values.email) {
            setErrors({ ...errors, email: 'This field is required' });
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            setErrors({ ...errors, email: 'Invalid email address' });
        }
        if (!values.city) {
            setErrors({ ...errors, city: 'This field is required' });
        }
        if (!values.address) {
            setErrors({ ...errors, address: 'This field is required, please move market' });
        }
        if (!values.pincode) {
            setErrors({ ...errors, pincode: 'This field is required' });
        } else if (!/^[0-9]{6}$/.test(values.pincode)) {
            setErrors({ ...errors, pincode: 'Only 6 digits is allowed' });
        }
        if (!values.priority) {
            setErrors({ ...errors, priority: 'This field is required' });
        } else if (!/^[0-9]{1}$/.test(values.priority)) {
            setErrors({ ...errors, priority: 'Only 1 digit is allowed' });
        }
        if (!values.phone) {
            setErrors({ ...errors, phone: 'This field is required' });
        }
        if (!values.category) {
            setErrors({ ...errors, category: 'This field is required' });
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        validate(merchant);
        const { name, email, city, lat, lng, address, pincode, priority, phone, image, category } = merchant;
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
        const data = { id: merchant.id, name, email, city, lat, lng, address, pincode, priority, phone, image: urlImage, category };
        console.log(data);
        updateMerchant(merchant.id, data);
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Updated successfully',
            showConfirmButton: false,
            timer: 1500
        })
    };
    return (
        <>
            <div className="modal fade" tabIndex="-1" data-bs-keyboard="false" aria-hidden="true" id="merchantEdit">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="storeModalLabel">Editar</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={
                                (e) => {
                                    handleSubmit(e);
                                }
                            }>
                                <div className="">
                                    <label htmlFor="name" className="form-label">Nombre:</label>
                                    <input
                                        className="auth-input w-100 rounded-top"
                                        placeholder="Nombre"
                                        name="name"
                                        type="text"
                                        value={merchant.name}
                                        onChange={(e) => {
                                            setMerchant({ ...merchant, name: e.target.value });
                                            setErrors({ ...errors, name: '' });
                                        }}
                                        onBlur={() => {
                                            validate(merchant);

                                        }}
                                    />
                                    {errors.name && <div className="text-danger">{errors.name}</div>}
                                </div>
                                <div className="mt-2">
                                    <label htmlFor="email" className="form-label">Correo Electronico:</label>
                                    <input
                                        type="email"
                                        className="auth-input w-100 rounded-top"
                                        id="email"
                                        name="email"
                                        value={merchant.email}
                                        onChange={(e) => {
                                            setMerchant({ ...merchant, email: e.target.value });
                                            setErrors({ ...errors, email: '' });
                                        }}
                                        onBlur={() => {
                                            validate(merchant);
                                        }}
                                    />
                                    {errors.email && <div className="text-danger">{errors.email}</div>}
                                </div>
                                <div className="mt-2">
                                    <label htmlFor="city" className="form-label">Ciudad:</label>
                                    <select
                                        className="auth-input w-100 rounded-top"
                                        aria-label="Default select example"
                                        id='city'
                                        name='city'
                                        value={merchant.city}
                                        onChange={(e) => {
                                            setMerchant({ ...merchant, city: e.target.value });
                                            setErrors({ ...errors, city: '' });
                                        }}
                                        onBlur={() => {
                                            validate(merchant);
                                        }}
                                    >
                                        <option value="">Seleccionar Ciudad</option>
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
                                    {errors.city && <div className="text-danger">{errors.city}</div>}
                                </div>
                                <div className="mt-2">
                                    <label htmlFor="location" className="form-label">Direccion:</label>
                                    <button type='button' className='pin-location ms-3' data-bs-target="#googlemaps" data-bs-toggle="modal" data-bs-dismiss="modal" onClick={
                                        () => {
                                            setMapCreateEdit('edit');
                                        }
                                    }>
                                        <i className="fa-solid fa-location-dot"></i>
                                    </button>
                                </div>
                                <input
                                    type="hidden"
                                    id="latEdit"
                                    name="lat"
                                    value={merchant.lat}
                                    onChange={(e) => {
                                        setMerchant({ ...merchant, lat: e.target.value });
                                    }}
                                    onClick={() => {
                                        setMerchant({ ...merchant, lat: marker.lat });
                                    }}
                                />
                                <input
                                    type="hidden"
                                    id="lngEdit"
                                    name="lng"
                                    value={merchant.lng}
                                    onChange={(e) => {
                                        setMerchant({ ...merchant, lng: e.target.value });
                                    }}
                                    onClick={() => {
                                        setMerchant({ ...merchant, lng: marker.lng });
                                    }}
                                />
                                <div className="mt-2">
                                    <label htmlFor="address" className="form-label">Mostrar Direccion:</label>
                                    <input
                                        type="text"
                                        autoComplete="off"
                                        className="auth-input w-100 rounded-top"
                                        id="addressEdit"
                                        name="address"
                                        value={merchant.address}
                                        onChange={(e) => {
                                            setMerchant({ ...merchant, address: e.target.value });
                                            setErrors({ ...errors, address: '' });
                                        }}
                                        onClick={() => {
                                            setMerchant({ ...merchant, address: addressFormated });
                                        }}
                                        onBlur={() => {
                                            validate(merchant);
                                        }}
                                    />
                                    {errors.address && <div className="text-danger">{errors.address}</div>}
                                </div>
                                <div className="mt-2">
                                    <label htmlFor="pincode" className="form-label">Codigo Pin:</label>
                                    <input
                                        type="number"
                                        className="auth-input w-100 rounded-top"
                                        id="pincode"
                                        placeholder="Pin code"
                                        name='pincode'
                                        value={merchant.pincode}
                                        onChange={(e) => {
                                            setMerchant({ ...merchant, pincode: e.target.value });
                                            setErrors({ ...errors, pincode: '' });
                                        }}
                                        onBlur={() => {
                                            validate(merchant);
                                        }}
                                    />
                                    {errors.pincode && <div className="text-danger">{errors.pincode}</div>}
                                </div>
                                <div className="mt-2">
                                    <label htmlFor="priority" className="form-label">Prioridad:</label>
                                    <input
                                        type="number"
                                        className="auth-input w-100 rounded-top"
                                        id="priority"
                                        placeholder="Enter Priority"
                                        name='priority'
                                        value={merchant.priority}
                                        onChange={(e) => {
                                            setMerchant({ ...merchant, priority: e.target.value });
                                            setErrors({ ...errors, priority: '' });
                                        }}
                                        onBlur={() => {
                                            validate(merchant);
                                        }}
                                    />
                                    {errors.priority && <div className="text-danger">{errors.priority}</div>}
                                </div>
                                <div className="mt-2">
                                    <label htmlFor="phone" className="form-label">Telefono:</label>
                                    <PhoneInput
                                        className="auth-input w-100 rounded-top"
                                        id='phone'
                                        name='phone'
                                        value={merchant.phone}
                                        onChange={(e) => {
                                            setMerchant({ ...merchant, phone: e });
                                            setErrors({ ...errors, phone: '' });
                                        }}
                                        onBlur={() => {
                                            validate(merchant);
                                        }}
                                    />
                                </div>
                                <div className="mt-2">
                                    <label htmlFor="image" className="form-label">Imagen:</label>
                                    <input
                                        className="auth-input w-100 rounded-top"
                                        type="file"
                                        name="image"
                                        id="image"
                                        accept="image/*"
                                        onChange={(e) => {
                                            previewImageEdit(e.target.files[0]);
                                            setMerchant({ ...merchant, image: e.target.files[0] });
                                        }}
                                    />
                                </div>
                                <div className="mt-2" >
                                    <div className="col-3"></div>
                                    <div className="col-3">
                                        <img src={merchant.image} id="previewImageEdit" width="100%" alt='img preview' />
                                    </div>
                                </div>
                                <div className="mt-2">
                                    <label htmlFor="email" className="form-label">Categoria:</label>
                                    <select
                                        className="auth-input w-100 rounded-top"
                                        aria-label="Default select example"
                                        name='category'
                                        id='category'
                                        value={merchant.category}
                                        onChange={(e) => {
                                            setMerchant({ ...merchant, category: e.target.value });
                                            setErrors({ ...errors, category: '' });
                                        }}
                                        onBlur={() => {
                                            validate(merchant);
                                        }}
                                    >
                                        <option value="">Seleccionar Categoria</option>
                                        <option value="category1">Categoria 1</option>
                                        <option value="category2">Categoria 2</option>
                                        <option value="category3">Categoria 3</option>
                                        <option value="category4">Categoria 4</option>
                                    </select>
                                </div>
                                <button type='submit' hidden className='btn btn-info' id='btnUpdate'>Save</button>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-one" onClick={() => {
                                document.getElementById('btnUpdate').click();
                            }}>Actualizar</button>
                            <button type="button" className="btn btn-two" data-bs-dismiss="modal">Cerrar</button>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}
