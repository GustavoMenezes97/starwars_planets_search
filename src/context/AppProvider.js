import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';
import planetsAPI from '../services/planetsAPI';

function AppProvider({ children }) {
  const [showAPI, setShowAPI] = useState([]);
  const [nameFilter, setNameFilter] = useState('');
  const contextValue = { showAPI, nameFilter, setNameFilter };

  useEffect(() => {
    async function API() {
      const data = await planetsAPI();
      setShowAPI(data);
    }
    API();
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
