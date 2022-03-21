import { Routes, Route } from 'react-router-dom';
import { Home } from '../pages/Home';
import { Merchant } from '../pages/Merchant';
import { MerchantDetails } from '../components/MerchantDetails';

export const Index = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="merchants" element={<Merchant />} />
      <Route path="merchant/:merchantId" element={<MerchantDetails />} />
    </Routes>
  )
}
