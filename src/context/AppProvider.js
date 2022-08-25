import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';
import planetsAPI from '../services/planetsAPI';

function AppProvider({ children }) {
  const [showAPI, setShowAPI] = useState([]);
  const [filterByName, setFilterByName] = useState({ name: '' });
  const [filterByNumericValues, setFilterByNumericValues] = useState(
    [
      {
        column: '',
        comparison: '',
        value: '',
      },
    ],
  );
  const [selectedFilters, setSelectedFilters] = useState([]);

  const contextValue = {
    showAPI,
    filterByName,
    setFilterByName,
    filterByNumericValues,
    setFilterByNumericValues,
    selectedFilters,
    setSelectedFilters,
  };

  useEffect(() => {
    async function API() {
      const data = await planetsAPI();
      setShowAPI(data);
    }
    API();
    setFilterByNumericValues({
      column: 'population',
      comparison: 'maior que',
      value: 0,
    });
  }, []);

  return (
    <AppContext.Provider value={ contextValue }>
      { children }
    </AppContext.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppProvider;
