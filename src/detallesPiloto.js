import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './detallesPiloto.css';

const baseURL = 'https://api.openf1.org/v1/drivers';

export const DriverDetails = () => {
    const { driver_number } = useParams();
    const [driver, setDriver] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDriver = async () => {
            try {
                const sessionKey = '7763';
                const response = await axios.get(baseURL, {
                    params: {
                        driver_number,
                        session_key: sessionKey,
                    },
                });

                const driverData = response.data.find(
                    (driver) => driver.driver_number === parseInt(driver_number)
                );

                setDriver(driverData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching driver details:', error);
                setLoading(false);
            }
        };

        fetchDriver();
    }, [driver_number]);

    if (loading) {
        return <p className="loading-text">Cargando datos del piloto...</p>;
    }

    if (!driver) {
        return <p className="error-text">No se encontraron detalles del piloto.</p>;
    }

    return (
        <div className="container driver-details">
            <div className="driver-card">
                <img
                    src={driver.headshot_url}
                    alt={driver.full_name}
                    className="img-fluid driver-image"
                />
                <h1 className="driver-name">{driver.full_name}</h1>
                <p className="driver-team"><strong>Equipo:</strong> {driver.team_name}</p>
                <p className="driver-number"><strong>Número de piloto:</strong> {driver.driver_number}</p>
                <p className="driver-nationality"><strong>Nacionalidad:</strong> {driver.country_code}</p>
            </div>
        </div>
    );
};
