import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Buscador } from './buscador';
import { DriverDetails } from './detallesPiloto';

function App() {
  return (
    <Routes>
      {/* Ruta para el buscador de pilotos */}
      <Route path="/" element={<Buscador />} />

      {/* Ruta para los detalles de un piloto específico */}
      <Route path="/drivers/:driver_number" element={<DriverDetails />} />
    </Routes>
  );
}

export default App;
