const URL = 'https://swapi-trybe.herokuapp.com/api/planets/';

async function planetsAPI() {
  const response = await fetch(URL);
  const data = await response.json();
  const dataFiltered = data.results.filter((item) => delete item.residents);
  return dataFiltered;
}

export default planetsAPI;
