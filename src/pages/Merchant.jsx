import MerchantList from '../components/MerchantList';

export const Merchant = () => {
  return (
    <>
      <div className="shadow-sm p-3 bg-body rounded">
        <button className="btn btn-dark" type="button" data-bs-toggle="offcanvas" data-bs-target="#sidebar" aria-controls="offcanvasWithBackdrop"><i className="fa-solid fa-bars"></i></button>
        <h2 className="text-center">Merchant List</h2>
      </div>
      <MerchantList />
    </>
  )
}
