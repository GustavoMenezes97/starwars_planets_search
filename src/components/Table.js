import React, { useState, useEffect } from 'react';
import planetsAPI from '../services/planetsAPI';

function Table() {
  const header = ['Name', 'Rotation Period', 'Orbital Period', 'Diameter', 'Climate',
    'Gravity', 'Terrain', 'Surface Water', 'Population', 'Films', 'Created', 'Edited',
    'URL'];

  const [showAPI, setShowAPI] = useState([]);

  useEffect(() => {
    async function API() {
      const data = await planetsAPI();
      setShowAPI(data);
    }
    API();
  }, []);

  return (
    <div>
      <table>
        <thead>
          <tr>
            {header.map((item) => (
              <th key={ item }>{item}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {showAPI.map((item) => (
            <tr key={ item.name }>
              <td>{item.name}</td>
              <td>{item.rotation_period}</td>
              <td>{item.orbital_period}</td>
              <td>{item.diameter}</td>
              <td>{item.climate}</td>
              <td>{item.gravity}</td>
              <td>{item.terrain}</td>
              <td>{item.surface_water}</td>
              <td>{item.population}</td>
              <td>{item.films}</td>
              <td>{item.created}</td>
              <td>{item.edited}</td>
              <td>{item.url}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
