/* SELECTORS */

export const getAllFilters = ({filters}) => filters;

/* ACTIONS */

// action name creator
const reducerName = 'filters';
const createActionName = name => `app/${reducerName}/${name}`;

// action types
export const CHANGE_PHRASE = createActionName('CHANGE_PHRASE');
export const CHANGE_DURATION_FROM = createActionName('CHANGE_DURATION_FROM');
export const CHANGE_DURATION_TO = createActionName('CHANGE_DURATION_TO');
// TODO - add other action types

// action creators
export const changeSearchPhrase = payload => ({ payload, type: CHANGE_PHRASE });
export const changeDuration = (fromOrTo, dayAmount) => { 
  console.log(dayAmount);
  if(fromOrTo == 'from') {
    return {
      payload: parseInt(dayAmount),
      type: CHANGE_DURATION_FROM,
    };
  } else {
    return {
      payload: parseInt(dayAmount),
      type: CHANGE_DURATION_TO,
    };
  }
};
// TODO - add other action creators

// reducer
export default function reducer(statePart = [], action = {}) {
  switch (action.type) {
    case CHANGE_PHRASE:
      return {
        ...statePart,
        searchPhrase: action.payload,
      };
    case CHANGE_DURATION_FROM:
      return {
        ...statePart, 
        duration: {
          ...statePart.duration,
          from: action.payload,
        },
      };
    case CHANGE_DURATION_TO:
      return {
        ...statePart, 
        duration: {
          ...statePart.duration,
          to: action.payload,
        },
      };
    // TODO - handle other action types
    default:
      return statePart;
  }
}
