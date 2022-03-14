import { useState } from "react";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import { Modal } from "./Modal"
import { data } from "../data/data";

const Merchant = () => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');

  const columns = [
    {
      name: 'ID',
      selector: row => row.id,
      sortable: true,
    },
    {
      name: 'Image',
      grow: 0,
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
    },
    {
      name: 'Phone Number',
      selector: row => row.phone,
      sortable: true,
    },
    {
      name: 'Email',
      selector: row => row.email,
      sortable: true,
    },
    {
      name: 'Merchant Address',
      selector: row => row.address,
      sortable: true,
    },
    {
      name: 'Status',
      selector: row => row.status,
      sortable: true,
    },
    {
      name: 'Payment Method',
      selector: row => row.payment_method,
      sortable: true,
    },
    {
      name: 'Category',
      selector: row => row.category,
      sortable: true,
    },
    {
      name: 'Details',
      cell: row => (
        <Link to={`/merchant/${row.id}`} className="btn btn-dark">Details</Link>
      )
    }
  ];
  const handleChangeSearch = (e) => {
    setSearch(e.target.value);
  }
  const handleChangeCategory = (e) => {
    setCategory(e.target.value);
  }
  const handleClickReset = () => {
    setSearch('');
    setCategory('');
  }
  const filterSearch = (data) => {
    return data.filter(item => {
      return item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.city.toLowerCase().includes(search.toLowerCase()) ||
        item.phone.toLowerCase().includes(search.toLowerCase()) ||
        item.email.toLowerCase().includes(search.toLowerCase()) ||
        item.address.toLowerCase().includes(search.toLowerCase()) ||
        item.status.toLowerCase().includes(search.toLowerCase()) ||
        item.payment_method.toLowerCase().includes(search.toLowerCase()) ||
        item.category.toLowerCase().includes(search.toLowerCase());
    })
  }
  const filterCategory = (data) => {
    return data.filter(item => {
      return item.category.toLowerCase().includes(category.toLowerCase());
    })
  }
  return (
    <>
      <div className="shadow-sm p-3 bg-body rounded">
        <h2 className="text-center">Merchant List</h2>
      </div>
      <div className="shadow-lg mt-3 p-3 mb-5">
        <div className="row p-3">
          <div className="col-12 col-md-3 mt-3">
            <button type="button" className="btn btn-dark w-100" data-bs-toggle="modal" data-bs-target="#newstore">
              <i className="fa-solid fa-circle-plus"></i> Add New Merchant
            </button>
          </div>
          <div className="col-12 col-md-3 mt-3">
            <select
              name="category"
              id="category"
              className="form-select shadow-sm"
              value={category}
              onChange={handleChangeCategory}
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
                  onChange={handleChangeSearch}
                  className="form-control shadow-sm"
                />
              </div>
            </div>
          </div>
          <div className="col-12 col-md-3 mt-3">
            <button className="btn btn-danger w-100" onClick={handleClickReset}>Reset</button>
          </div>
          <Modal id="newstore" />
        </div >
        <div className="row p-3">
          <DataTable
            pagination={true}
            columns={columns}
            data={
              category === '' ?
                filterSearch(data) :
                filterCategory(data)
            }
          />
        </div>
      </div>
    </>
  )
}

export default Merchant
