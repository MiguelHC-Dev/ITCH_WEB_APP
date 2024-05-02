import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import './App.css';
import Formatos from './components/Formatos';
import CartaPresentacion from './components/CartaPresentacion';
import MisDatos from './components/MisDatos';
import AdminHome from './components/admin/AdminHome';
import AdminFormatos from './components/admin/AdminFormatos';
import AdminUsuarios from './components/admin/AdminUsuarios';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute'; // Importa PrivateRoute aquí

function App() {
  return (
    <AuthProvider>
      <div className='font-sans'>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
          <Route path="/formatos" element={<PrivateRoute><Formatos /></PrivateRoute>} /> 
          <Route path="/carta-presentacion" element={<PrivateRoute><CartaPresentacion /></PrivateRoute>} /> 
          <Route path="/mis-datos" element={<PrivateRoute><MisDatos /></PrivateRoute>} />
          <Route path="/administrador/" element={<PrivateRoute><AdminHome /></PrivateRoute>} />
          <Route path="/administrador/formatos" element={<PrivateRoute><AdminFormatos /></PrivateRoute>} />
          <Route path="/administrador/administrar-usuarios" element={<PrivateRoute><AdminUsuarios /></PrivateRoute>} />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
