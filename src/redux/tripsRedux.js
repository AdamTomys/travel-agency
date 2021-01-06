/* SELECTORS */

export const getAllTrips = ({trips}) => trips;

export const getFilteredTrips = ({trips, filters}) => {
  let output = trips;

  // filter by search phrase
  if(filters.searchPhrase){
    const pattern = new RegExp(filters.searchPhrase, 'i');
    output = output.filter(trip => pattern.test(trip.name));
  }

  const filterFrom = filters.duration.from;
  const filterTo = filters.duration.to;
  output = output.filter(trip => trip.days >= filterFrom && trip.days <= filterTo);

  if (filters.tags.length > 0) {
    for (let tag of filters.tags) {
      output = output.filter(trip => trip.tags.includes(tag));
    }
  }
  
  const array = output.sort((a, b) => parseInt(a.cost.substr(1).replace(',', '')) > parseInt(b.cost.substr(1).replace(',', '')));
  console.log(array);
  // console.log(parseInt(array[0].cost.substr(1).replace(',', '')));
  // console.log(parseInt(array[1].cost.substr(1).replace(',', '')));
  sortTrips(array);

  return output.sort((a, b) => parseInt(a.cost.substr(1).replace(',', '')) > parseInt(b.cost.substr(1).replace(',', '')));
};

export const getTripById = ({trips}, tripId) => {
  const filtered = trips.filter(trip => trip.id == tripId);

  console.log('filtering trips by tripId:', tripId, filtered);
  return filtered.length ? filtered[0] : {error: true};
};

export const getTripsForCountry = ({trips}, countryCode) => {
  const filtered = trips.filter(trip => trip.country.code == countryCode);

  console.log('filtering trips by countryCode:', countryCode, filtered);
  return filtered.length ? filtered : [{error: true}];
};

/* ACTIONS */

// action name creator
const reducerName = 'trips';
const createActionName = name => `app/${reducerName}/${name}`;

// action types
const EXAMPLE = createActionName('EXAMPLE');

// action creators
const sortTrips = state => ({ payload: state, type: EXAMPLE});

// reducer
export default function reducer(statePart = [], action = {}) {
  switch (action.type) {
    case EXAMPLE:
      console.log(statePart);
      return {
        ...statePart,
      };
    default:
      return statePart;
  }
}
