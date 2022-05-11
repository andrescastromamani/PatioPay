import { Routes, Route } from 'react-router-dom';
import { Home } from '../pages/Home';
import { Login } from '../pages/auth/Login';
import { ProtectedRoutes } from './ProtectedRoutes';
import { PublicRoutes } from './PublicRoutes';
import { NotFound } from '../pages/NotFound';
import { Charges } from '../pages/charges/Charges';
import { ChargesCreate } from '../pages/charges/ChargesCreate';
import { Analytics } from '../pages/Analytics';
import { Invoice } from '../pages/Invoice';

export const Index = () => {
  return (
    <Routes>
      <Route path='/login' element={
        <PublicRoutes>
          <Login />
        </PublicRoutes>} />
      <Route path='/' element={
        <ProtectedRoutes>
          <Home />
        </ProtectedRoutes>} />
      <Route path='/cobros' element={
        <ProtectedRoutes>
          <Charges />
        </ProtectedRoutes>} />
      <Route path='/cobros/crear' element={
        <ProtectedRoutes>
          <ChargesCreate />
        </ProtectedRoutes>} />
      <Route path='/analiticas' element={
        <ProtectedRoutes>
          <Analytics />
        </ProtectedRoutes>} />
      <Route path='/recibo' element={
        <ProtectedRoutes>
          <Invoice />
        </ProtectedRoutes>} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
