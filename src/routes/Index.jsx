import { Routes, Route } from 'react-router-dom';
import { Home } from '../pages/Home';
import { Login } from '../pages/auth/Login';
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
      <Route path="/" element={
        <ProtectedRoutes>
          <Home />
        </ProtectedRoutes>
      } />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
