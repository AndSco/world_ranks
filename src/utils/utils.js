export const getAllCoutriesData = async () =>
  await fetch("https://restcountries.eu/rest/v2/all").then(data => data.json());

export const getCountryInfo = async id =>
  await fetch(`https://restcountries.eu/rest/v2/alpha/${id}`).then(res =>
    res.json()
  );

export const getNeighbourInfo = async id =>
  await getCountryInfo(id).then(({ name, flag, alpha3Code }) => ({
    name,
    flag,
    alpha3Code
  }));
