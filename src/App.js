import { Index } from './routes/Index';
import { MerchantContextProvider } from './contexts/MerchantContext';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <div className='container-fluid'>
      <AuthProvider>
        <MerchantContextProvider>
          <Index />
        </MerchantContextProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
