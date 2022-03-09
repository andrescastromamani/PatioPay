import { Routes, Route } from 'react-router-dom';
import Merchant from '../components/Merchant';
import { MerchantDetails } from '../components/MerchantDetails';
import { Home } from '../pages/Home';

export const Index = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="merchants" element={<Merchant />} />
      <Route path="merchant/:merchantId" element={<MerchantDetails />} />
    </Routes>
  )
}
