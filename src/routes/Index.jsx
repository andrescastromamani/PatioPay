import { Routes, Route } from 'react-router-dom';
import { Home } from '../pages/Home';
import { Merchant } from '../pages/Merchant';
import { Login } from '../pages/auth/Login';
import { Register } from '../pages/auth/Register';
import { MerchantDetails } from '../components/MerchantDetails';

export const Index = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="merchants" element={<Merchant />} />
      <Route path="merchant/:merchantId" element={<MerchantDetails />} />
    </Routes>
  )
}
