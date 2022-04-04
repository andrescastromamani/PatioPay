import { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import Geocode from 'react-geocode';
import { useDispatch, useSelector } from "react-redux";

import { MerchantEdit } from "./MerchantEdit";
import { MerchantCreate } from "./MerchantCreate";
import Map from './Map';
import { ExpandableRows } from "./ExpandableRows";
import { getMerchantsAction, getMerchantAction } from "../redux/actions/merhantActions";

Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAPS_API_KEY);
Geocode.setLanguage("en");
Geocode.setRegion("es");

const MerchantList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMerchantsAction());
  }, [dispatch])
  const merchants = useSelector(state => state.merchants.merchants);
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
  const ExpandedComponent = ({ data }) => {
    return (
      <ExpandableRows data={data} />
    )
  }
  const columns = [
    {
      name: 'ID',
      selector: row => row.id,
      sortable: true,
      width: '5%',
    },
    {
      name: 'Imagen',
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
      name: 'Nombre ',
      selector: row => row.name,
      sortable: true,
      width: '10%',
    },
    {
      name: 'Numero de Telefono',
      selector: row => row.phone,
      sortable: true,
      width: '10%',
    },
    {
      name: 'Correo Electronico',
      selector: row => row.email,
      sortable: true,
      width: '15%',
    },
    {
      name: 'Direccion',
      selector: row => row.address,
      sortable: true,
      width: '20%',
    },
    {
      name: 'Metodo de Pago',
      selector: row => row.payment_method,
      sortable: true,
      width: '10%',
    },
    {
      name: 'Categoria',
      selector: row => row.category,
      sortable: true,
      width: '10%',
    },
    {
      name: 'Acciones',
      width: '10%',
      cell: row => (
        <div>
          <button
            data-bs-toggle="modal"
            data-bs-target="#merchantEdit"
            className="btn btn-sm btn-two"
            onClick={
              () => {
                dispatch(getMerchantAction(row));
              }
            }
          >
            Editar
          </button>
        </div >
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
              <i className="fa-solid fa-circle-plus"></i> Agregar Comerciante
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
              <option value="">Seleccionar Categoria</option>
              <option value="category1">Categoria 1</option>
              <option value="category2">Categoria 2</option>
              <option value="category3">Categoria 3</option>
              <option value="category4">Categoria 4</option>
            </select>
          </div>
          <div className="col-12 col-md-3 mt-3">
            <div className="form-group">
              <div className="">
                <input
                  id="search"
                  name="search"
                  autoComplete="off"
                  placeholder="Buscar"
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
            >Resetear</button>
          </div>
        </div >
        <div className="row p-3">
          <DataTable
            title="Comerciantes"
            pagination={true}
            columns={columns}
            data={
              category === '' ? filterSearch(merchants) : filterCategory(merchants)
            }
            expandableRows
            expandableRowsComponent={ExpandedComponent}
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
