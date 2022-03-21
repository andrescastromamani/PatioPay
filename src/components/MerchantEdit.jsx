import { useContext, useState } from 'react';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import { MerchantContext } from '../contexts/MerchantContext';

export const MerchantEdit = ({ merchant, setMerchant, mapCreateEdit, setMapCreateEdit }) => {
    const { updateMerchant, merchants } = useContext(MerchantContext);
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(merchant);
        updateMerchant(merchant.id, merchant);
    };
    return (
        <>
            <div className="modal fade" tabIndex="-1" data-bs-keyboard="false" aria-hidden="true" id="merchantEdit">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="storeModalLabel">Edit Merchant</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={
                                (e) => {
                                    handleSubmit(e);
                                }
                            }>
                                <div className="form-group row">
                                    <label htmlFor="name" className="col-3 form-control-label text-end">Store Name:</label>
                                    <div className="col-9">
                                        <input
                                            className={`form-control`}
                                            placeholder="Nombre"
                                            name="name"
                                            type="text"
                                            value={merchant.name}
                                            onChange={(e) => {
                                                setMerchant({ ...merchant, name: e.target.value });
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="mt-2 form-group row">
                                    <label htmlFor="email" className="form-label col-3 text-end">Email:</label>
                                    <div className="col-9">
                                        <input
                                            type="email"
                                            className={`form-control`}
                                            id="email"
                                            name="email"
                                            value={merchant.email}
                                            onChange={(e) => {
                                                setMerchant({ ...merchant, email: e.target.value });
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="mt-2 form-group row">
                                    <label htmlFor="city" className="form-label col-3 text-end">City:</label>
                                    <div className="col-9">
                                        <select
                                            className={`form-select`}
                                            aria-label="Default select example"
                                            id='city'
                                            name='city'
                                            value={merchant.city}
                                            onChange={(e) => {
                                                setMerchant({ ...merchant, city: e.target.value });
                                            }}
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
                                    </div>
                                </div>
                                <div className="mt-2 form-group row">
                                    <label htmlFor="location" className="form-label col-3 text-end">Address:</label>
                                    <div className="col-9">
                                        <button type='button' className='pin-location' data-bs-target="#googlemaps" data-bs-toggle="modal" data-bs-dismiss="modal" onClick={
                                            () => {
                                                setMapCreateEdit('edit');
                                            }
                                        }>
                                            <i className="fa-solid fa-location-dot"></i>
                                        </button>
                                    </div>
                                </div>
                                <input
                                    type="hidden"
                                    id="lat"
                                    name="lat"
                                    value={merchant.lat}
                                    onChange={(e) => {
                                        setMerchant({ ...merchant, lat: e.target.value });
                                    }}
                                />
                                <input
                                    type="hidden"
                                    id="lng"
                                    name="lng"
                                    value={merchant.lng}
                                    onChange={(e) => {
                                        setMerchant({ ...merchant, lng: e.target.value });
                                    }}
                                />
                                <div className="mt-2 form-group row">
                                    <label htmlFor="address" className="form-label col-3 text-end">Display Address:</label>
                                    <div className="col-9">
                                        <input
                                            type="text"
                                            autoComplete="off"
                                            className={`form-control`}
                                            id="address"
                                            name="address"
                                            value={merchant.address}
                                            onChange={(e) => {
                                                setMerchant({ ...merchant, address: e.target.value });
                                            }}

                                        />
                                    </div>
                                </div>
                                <div className="mt-2 form-group row">
                                    <label htmlFor="pincode" className="form-label col-3 text-end">Pin Code:</label>
                                    <div className="col-9">
                                        <input
                                            type="number"
                                            className={`form-control`}
                                            id="pincode"
                                            placeholder="Pin code"
                                            name='pincode'
                                            value={merchant.pincode}
                                            onChange={(e) => {
                                                setMerchant({ ...merchant, pincode: e.target.value });
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="mt-2 form-group row">
                                    <label htmlFor="priority" className="form-label col-3 text-end">Priority:</label>
                                    <div className="col-9">
                                        <input
                                            type="number"
                                            className={`form-control `}
                                            id="priority"
                                            placeholder="Enter Priority"
                                            name='priority'
                                            value={merchant.priority}
                                            onChange={(e) => {
                                                setMerchant({ ...merchant, priority: e.target.value });
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="mt-2 form-group row">
                                    <label htmlFor="phone" className="col-3 form-control-label text-end">Phone:</label>
                                    <div className="col-9">
                                        <PhoneInput
                                            className={`form-control`}
                                            id='phone'
                                            name='phone'
                                            value={merchant.phone}
                                            onChange={(e) => {
                                                setMerchant({ ...merchant, phone: e });
                                            }}
                                        />
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
                                            onChange={(e) => {
                                                setMerchant({ ...merchant, image: e.target.files[0] });
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="mt-2 row" >
                                    <div className="col-3"></div>
                                    <div className="col-3">
                                        <img src={merchant.image} id="previewImage" width="100%" alt='img preview' />
                                    </div>
                                </div>
                                <div className="mt-2 form-group row">
                                    <label htmlFor="email" className="form-label col-3 text-end">Merchant Category:</label>
                                    <div className="col-9">
                                        <select
                                            className={`form-select`}
                                            aria-label="Default select example"
                                            name='category'
                                            id='category'
                                            value={merchant.category}
                                            onChange={(e) => {
                                                setMerchant({ ...merchant, category: e.target.value });
                                            }}
                                        >
                                            <option value="">Select a Category</option>
                                            <option value="category1">Category One</option>
                                            <option value="category2">Category two</option>
                                            <option value="category3">Category three</option>
                                        </select>
                                    </div>
                                </div>
                                <button type='submit' hidden className='btn btn-info' id='btnUpdate'>Save</button>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-one" onClick={() => {
                                document.getElementById('btnUpdate').click();
                            }}>Update</button>
                            <button type="button" className="btn btn-two" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}
