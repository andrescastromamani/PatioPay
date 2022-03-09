import React from 'react';
import { Link, useParams } from 'react-router-dom';

import { data } from '../data/data';

export const MerchantDetails = () => {
    const { merchantId } = useParams();
    const { id, name, city, phone, email, address, status, payment_method, category } = data.find(merchant => merchant.id == merchantId);
    return (
        <>
            <div className="shadow-sm p-3 mb-5 bg-body rounded">
                <div className="row">
                    <div className="col-md-1">
                        <a href="/merchants" className='btn btn-dark'>Back</a>
                    </div>
                    <div className="col-md-10">
                        <h3 className='text-center'>Merchant Details</h3>
                    </div>
                </div>
            </div>
            <div className='shadow-lg p-4'>
                <div className='row'>
                    <div className="col-12 col-md-9">
                        <h2>Merchant Info</h2>
                        <hr />
                        <div className="row">
                            <div className="col-12 col-sm-6">
                                <p className='merchantInput'><span >Merchant ID: </span>{id}</p>
                                <p className='merchantInput'><span >Delivery Merchant ID: </span> {id}</p>
                                <p className='merchantInput'><span >Merchant Name: </span> {name} </p>
                                <p className='merchantInput'><span >Merchant Category: </span> {category}</p>
                                <p className='merchantInput'><span >Merchant Priority: </span>0</p>
                                <p className='merchantInput'><span >Registered Phone: </span>{phone}</p>
                                <p className='merchantInput'><span >Calling Number: </span> +591123131</p>
                                <p className='merchantInput'><span >Alternate Numbers: </span> +591123131</p>
                                <p className='merchantInput'><span >Email: </span>{email}</p>
                            </div>
                            <div className="col-12 col-md-6">
                                <p className='merchantInput'><span>Address: </span>{address}</p>
                                <p className='merchantInput'><span>Display Address: </span> Quinto anillo av. alemana</p>
                                <p className='merchantInput'><span>Status: </span>{status}</p>
                                <p className='merchantInput'><span>City: </span>{city}</p>
                                <p className='merchantInput'><span>Minimum order Amount: </span> 0 </p>
                                <p className='merchantInput'><span>Minimum delivery time: </span> 40 min</p>
                                <p className='merchantInput'><span>Auto Accept order: </span> disabled</p>
                                <p className='merchantInput'><span>Price Range: </span> economic</p>
                                <p className='merchantInput'><span>Rating: </span> -</p>
                            </div>
                        </div>
                        <h2>Payment Info</h2>
                        <hr />
                        <div className="row">
                            <div className="col-12 col-sm-6">
                                <p className='merchantInput'><span>Payment Mode: </span>{payment_method}</p>
                                <p className='merchantInput'><span>Packing Changes: </span> 0</p>
                            </div>
                            <div className="col-12 col-sm-6">
                                <p className='merchantInput'><span>Delivery Radius: </span>8 km</p>
                                <p className='merchantInput'><span>Delivery Radius threshold: </span> 0km</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-3">
                        <div className="row">
                            <img src="https://securionpay.com/wp-content/uploads/2016/03/Online-merchant-%E2%80%93-what-is-it.svg" alt="merchant" className='rounded' width="100%" />
                        </div>
                        <div className='row mt-2'>
                            <div className="col-12">
                                <Link to="/merchants" className='btn btn-info d-block'>Edit Merchant</Link>
                            </div>
                        </div>
                        <div className='row mt-2'>
                            <div className="col-12">
                                <a href="/merchants" className='btn btn-info d-block'>Edit Image</a>
                            </div>
                        </div>
                        <div className='row mt-2'>
                            <div className="col-12">
                                <a href="/merchants" className='btn btn-info d-block'>Change Password</a>
                            </div>
                        </div>
                        <div className='row mt-2'>
                            <div className="col-12">
                                <a href="/merchants" className='btn btn-info d-block'>Restaurant Timings</a>
                            </div>
                        </div>
                        <div className='row mt-2'>
                            <div className="col-12">
                                <a href="/merchants" className='btn btn-info d-block'>Order History</a>
                            </div>
                        </div>
                        <div className='row mt-2'>
                            <div className="col-12">
                                <a href="/merchants" className='btn btn-info d-block'>Activate Merchant</a>
                            </div>
                        </div>
                        <div className='row mt-2'>
                            <div className="col-12">
                                <a href="/merchants" className='btn btn-info  d-block'>Enable Auto Accept</a>
                            </div>
                        </div>
                        <div className='row mt-2'>
                            <div className="col-12">
                                <a href="/merchants" className='btn btn-info d-block' >View OTP</a>
                            </div>
                        </div>
                        <div className='row mt-2'>
                            <div className="col-12">
                                <a href="/merchants" className='btn btn-info d-block' >Change Order Mode</a>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}
