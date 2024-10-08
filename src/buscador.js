import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './buscador.css';

const baseURL = 'https://api.openf1.org/v1/drivers';

export const Buscador = () => {
  const [drivers, setDrivers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(baseURL);
        const newDrivers = response.data;
        
        console.log("Datos de la API:", newDrivers);
        
        setDrivers(prevDrivers => {
          const allDrivers = [...prevDrivers, ...newDrivers];
          return allDrivers.filter((driver, index, self) =>
            index === self.findIndex(d => d.full_name === driver.full_name)
          );
        });
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };
    fetchData();
  }, [page]);

  const filteredDrivers = drivers.filter(driver =>
    driver.full_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop
        >= document.documentElement.offsetHeight - 50
      ) {
        setPage(prevPage => prevPage + 1);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <div id="container">
        <h1>Buscador de F1 Drivers</h1>
        <input
          type="text"
          placeholder="Buscar por nombre..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <div id="drivers">
          {filteredDrivers.length > 0 ? (
            filteredDrivers.map(driver => (
              <div key={driver.driver_number} className="driver">
                <img src={driver.headshot_url} alt={driver.full_name} />
                <div className="driver-info">
                  <h2>{driver.full_name}</h2>
                  <p>{driver.team_name}</p>
                </div>
              </div>
            ))
          ) : (
            <p>No se encontraron pilotos</p>
          )}
        </div>
        {loading && <p>Cargando más pilotos...</p>}
      </div>
    </>
  );
};
