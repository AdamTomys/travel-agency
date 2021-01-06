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
export const CHANGE_TAG_STATUS_CHECKED = createActionName('CHANGE_TAG_STATUS_CHECKED');
export const CHANGE_TAG_STATUS_UNCHECKED = createActionName('CHANGE_TAG_STATUS_UNCHECKED');

// action creators
export const changeSearchPhrase = payload => ({ payload, type: CHANGE_PHRASE });
export const changeDuration = (fromOrTo, dayAmount) => { 
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
export const markTagChecked = tag => ({ payload: tag, type: CHANGE_TAG_STATUS_CHECKED });
export const markTagUnchecked = index => ({ payload: index, type: CHANGE_TAG_STATUS_UNCHECKED});

// reducer
export default function reducer(statePart = [], action = {}) {
  // const array = [];
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
    case CHANGE_TAG_STATUS_CHECKED:
      return {
        ...statePart,
        tags: [
          ...statePart.tags,
          action.payload,
        ],
      }; 
    case CHANGE_TAG_STATUS_UNCHECKED:
      // eslint-disable-next-line no-case-declarations
      const statePartCopy = [...statePart.tags];
      statePartCopy.splice(action.payload, 1);
      console.log(statePartCopy);
      return {
        ...statePart,
        tags: statePartCopy,
      };
    default:
      return statePart;
  }
}
