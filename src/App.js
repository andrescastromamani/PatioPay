import { Provider } from 'react-redux';

import { Index } from './routes/Index';
import { MerchantContextProvider } from './contexts/MerchantContext';
import { AuthProvider } from './contexts/AuthContext';
import store from './redux/store';

function App() {
  return (
    <div className='container-fluid'>
      <Provider store={store}>
        <AuthProvider>
          <MerchantContextProvider>
            <Index />
          </MerchantContextProvider>
        </AuthProvider>
      </Provider>
    </div>
  );
}

export default App;
