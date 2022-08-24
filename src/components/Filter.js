import React, { useContext } from 'react';
import AppContext from '../context/AppContext';

function Filter() {
  const { nameFilter, setNameFilter } = useContext(AppContext);

  return (
    <div>
      <input
        data-testid="name-filter"
        type="text"
        name="filterInput"
        value={ nameFilter }
        onChange={ ({ target }) => setNameFilter(target.value) }
      />
    </div>
  );
}

export default Filter;
