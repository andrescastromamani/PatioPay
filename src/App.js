import { Index } from './routes/Index';
import { Sidebar } from './components/Sidebar';
import { MerchantContextProvider } from './contexts/MerchantContext';

function App() {
  return (

    <div className='container mt-3'>
      <button className="btn btn-dark" type="button" data-bs-toggle="offcanvas" data-bs-target="#sidebar" aria-controls="offcanvasWithBackdrop"><i className="fa-solid fa-bars"></i></button>
      <MerchantContextProvider>
        <Sidebar id="sidebar" />
        <Index />
      </MerchantContextProvider>
    </div>
  );
}

export default App;
