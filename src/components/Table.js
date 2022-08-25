import React, { useContext } from 'react';
import AppContext from '../context/AppContext';

function Table() {
  const { showAPI, filterByName, selectedFilters } = useContext(AppContext);

  const header = ['Name', 'Rotation Period', 'Orbital Period', 'Diameter', 'Climate',
    'Gravity', 'Terrain', 'Surface Water', 'Population', 'Films', 'Created', 'Edited',
    'URL'];

  const handleData = (row) => {
    const bools = [];
    selectedFilters.forEach((filter) => {
      switch (filter.comparison) {
      case 'maior que':
        bools.push(Number(row[filter.column]) > Number(filter.value));
        break;
      case 'menor que':
        bools.push(Number(row[filter.column]) < Number(filter.value));
        break;
      case 'igual a':
        bools.push(row[filter.column] === filter.value.toUpperCase());
        break;
      default:
        return true;
      }
    });
    return bools.every((item) => item);
  };

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
          {
            showAPI.filter((item) => (
              item.name.toLowerCase().includes(filterByName.name.toLowerCase())
            )).filter(handleData)
              .map((item) => (
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
              ))
          }
        </tbody>
      </table>
    </div>
  );
}

export default Table;
