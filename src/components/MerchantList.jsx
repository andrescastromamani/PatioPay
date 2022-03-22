import { useState, useContext } from "react";
import DataTable from "react-data-table-component";
import Geocode from 'react-geocode';

import { MerchantEdit } from "./MerchantEdit";
import { MerchantCreate } from "./MerchantCreate";
import { MerchantContext } from "../contexts/MerchantContext";
import Map from './Map';

Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAPS_API_KEY);
Geocode.setLanguage("en");
Geocode.setRegion("es");

const MerchantList = () => {
  const { merchants } = useContext(MerchantContext);
  const [addressFormated, setAddressFormated] = useState('');
  const [merchant, setMerchant] = useState({
    name: '',
    email: '',
    city: '',
    lat: '',
    lng: '',
    address: '',
    pincode: '',
    priority: '',
    phone: '',
    image: '',
    category: '',
  });
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [mapCreateEdit, setMapCreateEdit] = useState('');
  const [marker, setMarker] = useState({ lat: -17.8145819, lng: -63.1560853 });
  const { lat, lng } = marker;
  Geocode.fromLatLng(lat, lng)
    .then(
      response => {
        const address = response.results[0].formatted_address;
        setAddressFormated(address);
      }
    )
  const filterSearch = (data) => {
    return data.filter(item => {
      return item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.city.toLowerCase().includes(search.toLowerCase()) ||
        item.phone.toLowerCase().includes(search.toLowerCase()) ||
        item.email.toLowerCase().includes(search.toLowerCase()) ||
        item.address.toLowerCase().includes(search.toLowerCase()) ||
        item.category.toLowerCase().includes(search.toLowerCase());
    })
  }
  const filterCategory = (data) => {
    return data.filter(item => {
      return item.category.toLowerCase().includes(category.toLowerCase());
    })
  }
  const columns = [
    {
      name: 'ID',
      selector: row => row.id,
      sortable: true,
      width: '5%',
    },
    {
      name: 'Image',
      grow: 0,
      with: '5%',
      cell: row => <img
        className="img-thumbnail mt-2 mb-2"
        style={{
          width: "60px",
          height: "60px",
          objectFit: "cover",
        }}
        alt={row.name}
        src={row.image}
      />
    },
    {
      name: 'Merchant Name',
      selector: row => row.name,
      sortable: true,
      width: '10%',
    },
    {
      name: 'Phone Number',
      selector: row => row.phone,
      sortable: true,
      width: '10%',
    },
    {
      name: 'Email',
      selector: row => row.email,
      sortable: true,
      width: '15%',
    },
    {
      name: 'Merchant Address',
      selector: row => row.address,
      sortable: true,
      width: '20%',
    },
    {
      name: 'Payment Method',
      selector: row => row.payment_method,
      sortable: true,
      width: '10%',
    },
    {
      name: 'Category',
      selector: row => row.category,
      sortable: true,
      width: '10%',
    },
    {
      name: 'Actions',
      width: '10%',
      cell: row => (
        <div>
          <button
            data-bs-toggle="modal"
            data-bs-target="#merchantEdit"
            className="btn btn-sm btn-dark"
            onClick={() => setMerchant(row)}
          >
            Edit
          </button>
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    }
  ];

  return (
    <>
      <div className="shadow-lg mt-3 p-3 mb-5">
        <div className="row p-3">
          <div className="col-12 col-md-3 mt-3">
            <button type="button" className="btn btn-dark w-100" data-bs-toggle="modal" data-bs-target="#merchantCreate">
              <i className="fa-solid fa-circle-plus"></i> Add New Merchant
            </button>
            <MerchantCreate
              mapCreateEdit={mapCreateEdit}
              setMapCreateEdit={setMapCreateEdit}
              marker={marker}
              setMarker={setMarker}
              addressFormated={addressFormated}
            />
          </div>
          <div className="col-12 col-md-3 mt-3">
            <select
              name="category"
              id="category"
              className="form-select shadow-sm"
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
              }}
            >
              <option value="">Select Category</option>
              <option value="category1">Category 1</option>
              <option value="category2">Category 2</option>
              <option value="category3">Category 3</option>
              <option value="category4">Category 4</option>
            </select>
          </div>
          <div className="col-12 col-md-3 mt-3">
            <div className="form-group">
              <div className="">
                <input
                  id="search"
                  name="search"
                  autoComplete="off"
                  placeholder="Search"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                  className="form-control shadow-sm"
                />
              </div>
            </div>
          </div>
          <div className="col-12 col-md-3 mt-3">
            <button
              className="btn btn-danger w-100"
              onClick={
                () => {
                  setSearch('');
                  setCategory('');
                }
              }
            >Reset</button>
          </div>
        </div >
        <div className="row p-3">
          <DataTable
            pagination={true}
            columns={columns}
            data={
              category === '' ? filterSearch(merchants) : filterCategory(merchants)
            }
          />
          <MerchantEdit
            merchant={merchant}
            setMerchant={setMerchant}
            mapCreateEdit={mapCreateEdit}
            setMapCreateEdit={setMapCreateEdit}
            marker={marker}
            setMarker={setMarker}
            addressFormated={addressFormated}
          />
        </div>
      </div>
      <Map marker={marker} setMarker={setMarker} mapCreateEdit={mapCreateEdit} />
    </>
  )
}

export default MerchantList
