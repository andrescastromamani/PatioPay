import { Routes, Route } from 'react-router-dom';
import { Home } from '../pages/Home';
import { Merchant } from '../pages/Merchant';
import { Login } from '../pages/auth/Login';
import { Register } from '../pages/auth/Register';
import { MerchantDetails } from '../components/MerchantDetails';
import { ProtectedRoutes } from './ProtectedRoutes';
import { PublicRoutes } from './PublicRoutes';
import { NotFound } from '../pages/NotFound';

export const Index = () => {
  return (
    <Routes>
      <Route path="/login" element={
        <PublicRoutes>
          <Login />
        </PublicRoutes>} />
      <Route path="/register" element={
        <PublicRoutes>
          <Register />
        </PublicRoutes>} />
      <Route path="/" element={
        <ProtectedRoutes>
          <Home />
        </ProtectedRoutes>
      } />
      <Route path="/merchants" element={
        <ProtectedRoutes>
          <Merchant />
        </ProtectedRoutes>
      } />
      <Route path="merchant/:merchantId" element={
        <ProtectedRoutes>
          <MerchantDetails />
        </ProtectedRoutes>
      } />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
