import { Sidebar } from './components/Sidebar';
import { Index } from './routes/Index';

function App() {
  return (
    <div className='container mt-3'>
      <button className="btn btn-dark" type="button" data-bs-toggle="offcanvas" data-bs-target="#sidebar" aria-controls="offcanvasWithBackdrop"><i className="fa-solid fa-bars"></i></button>

      <Sidebar id="sidebar" />
      <Index />
    </div>
  );
}

export default App;
