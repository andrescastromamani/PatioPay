import { Index } from './routes/Index';
import { Sidebar } from './components/Sidebar';
import { MerchantContextProvider } from './contexts/MerchantContext';

function App() {
  return (

    <div className='container mt-3'>
      <MerchantContextProvider>
        <Sidebar id="sidebar" />
        <Index />
      </MerchantContextProvider>
    </div>
  );
}

export default App;
