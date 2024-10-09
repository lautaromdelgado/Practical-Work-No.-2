import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const baseURL = 'https://api.openf1.org/v1/drivers';

export const DriverDetails = () => {
  const { driver_number } = useParams();
  const [driver, setDriver] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDriver = async () => {
      try {
        const response = await axios.get(`${baseURL}/${driver_number}`);
        setDriver(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching driver details:', error);
        setLoading(false);
      }
    };
    fetchDriver();
  }, [driver_number]);

  if (loading) {
    return <p>Cargando datos del piloto...</p>;
  }

  if (!driver) {
    return <p>No se encontraron detalles del piloto.</p>;
  }

  return (
    <div>
      <h1>{driver.full_name}</h1>
      <img src={driver.headshot_url} alt={driver.full_name} />
      <p>Equipo: {driver.team_name}</p>
      <p>Número de piloto: {driver.driver_number}</p>
      <p>Nacionalidad: {driver.nationality}</p>
      <p>Fecha de nacimiento: {driver.birth_date}</p>
      {/* Puedes agregar más detalles si es necesario */}
    </div>
  );
};
