import React, { useContext } from 'react';
import AppContext from '../context/AppContext';

function Filter() {
  const {
    filterByName,
    setFilterByName,
    filterByNumericValues,
    setFilterByNumericValues,
    selectedFilters,
    setSelectedFilters,
  } = useContext(AppContext);

  const columns = ['population', 'orbital_period', 'diameter',
    'rotation_period', 'surface_water'];

  return (
    <div>
      <div>
        <input
          data-testid="name-filter"
          type="text"
          name="filterInput"
          value={ filterByName.name }
          onChange={ ({ target }) => setFilterByName({ name: target.value }) }
        />
      </div>
      <div>
        <select
          data-testid="column-filter"
          name="column-filter"
          value={ filterByNumericValues.column }
          onChange={ ({ target }) => (
            setFilterByNumericValues(
              { ...filterByNumericValues, column: target.value },
            )
          ) }
        >
          {columns.filter((item) => !selectedFilters
            .find((item2) => item === item2.column))
            .map((item) => <option key={ item } value={ item }>{item}</option>)}
        </select>
        <select
          data-testid="comparison-filter"
          name="comparison-filter"
          value={ filterByNumericValues.comparison }
          onChange={ ({ target }) => (
            setFilterByNumericValues(
              { ...filterByNumericValues, comparison: target.value },
            )
          ) }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
        <input
          data-testid="value-filter"
          type="number"
          name="value-filter"
          value={ filterByNumericValues.value }
          onChange={ ({ target }) => (
            setFilterByNumericValues(
              { ...filterByNumericValues, value: target.value },
            )
          ) }
        />
        <button
          data-testid="button-filter"
          type="button"
          onClick={ () => {
            setSelectedFilters([...selectedFilters, filterByNumericValues]);
            setFilterByNumericValues({
              column: 'population',
              comparison: 'maior que',
              value: 0,
            });
          } }
        >
          Filtrar
        </button>
        <button
          data-testid="button-remove-filters"
          type="button"
          onClick={ () => {
            setSelectedFilters([]);
            setFilterByNumericValues({
              column: 'population',
              comparison: 'maior que',
              value: 0,
            });
          } }
        >
          Remover todos os filtros
        </button>
        <div>
          {selectedFilters.map((item, index) => (
            <div key={ index } data-testid="filter">
              <span>{ `${item.column} | ${item.comparison} | ${item.value}` }</span>
              <button
                type="button"
                onClick={ () => {
                  const removeFilter = [...selectedFilters];
                  removeFilter.splice(index, 1);
                  setSelectedFilters(removeFilter);
                } }
              >
                remover
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Filter;
