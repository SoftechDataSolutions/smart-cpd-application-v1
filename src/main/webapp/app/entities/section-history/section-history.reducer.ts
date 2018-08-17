import axios from 'axios';
import {
  ICrudSearchAction,
  parseHeaderForLinks,
  loadMoreDataWhenScrolled,
  ICrudGetAction,
  ICrudGetAllAction,
  ICrudPutAction,
  ICrudDeleteAction
} from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ISectionHistory, defaultValue } from 'app/shared/model/section-history.model';

export const ACTION_TYPES = {
  SEARCH_SECTIONHISTORIES: 'sectionHistory/SEARCH_SECTIONHISTORIES',
  FETCH_SECTIONHISTORY_LIST: 'sectionHistory/FETCH_SECTIONHISTORY_LIST',
  FETCH_SECTIONHISTORY: 'sectionHistory/FETCH_SECTIONHISTORY',
  CREATE_SECTIONHISTORY: 'sectionHistory/CREATE_SECTIONHISTORY',
  UPDATE_SECTIONHISTORY: 'sectionHistory/UPDATE_SECTIONHISTORY',
  DELETE_SECTIONHISTORY: 'sectionHistory/DELETE_SECTIONHISTORY',
  RESET: 'sectionHistory/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ISectionHistory>,
  entity: defaultValue,
  links: { next: 0 },
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type SectionHistoryState = Readonly<typeof initialState>;

// Reducer

export default (state: SectionHistoryState = initialState, action): SectionHistoryState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.SEARCH_SECTIONHISTORIES):
    case REQUEST(ACTION_TYPES.FETCH_SECTIONHISTORY_LIST):
    case REQUEST(ACTION_TYPES.FETCH_SECTIONHISTORY):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_SECTIONHISTORY):
    case REQUEST(ACTION_TYPES.UPDATE_SECTIONHISTORY):
    case REQUEST(ACTION_TYPES.DELETE_SECTIONHISTORY):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.SEARCH_SECTIONHISTORIES):
    case FAILURE(ACTION_TYPES.FETCH_SECTIONHISTORY_LIST):
    case FAILURE(ACTION_TYPES.FETCH_SECTIONHISTORY):
    case FAILURE(ACTION_TYPES.CREATE_SECTIONHISTORY):
    case FAILURE(ACTION_TYPES.UPDATE_SECTIONHISTORY):
    case FAILURE(ACTION_TYPES.DELETE_SECTIONHISTORY):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.SEARCH_SECTIONHISTORIES):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_SECTIONHISTORY_LIST):
      const links = parseHeaderForLinks(action.payload.headers.link);
      return {
        ...state,
        links,
        loading: false,
        totalItems: action.payload.headers['x-total-count'],
        entities: loadMoreDataWhenScrolled(state.entities, action.payload.data, links)
      };
    case SUCCESS(ACTION_TYPES.FETCH_SECTIONHISTORY):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_SECTIONHISTORY):
    case SUCCESS(ACTION_TYPES.UPDATE_SECTIONHISTORY):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_SECTIONHISTORY):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = 'api/section-histories';
const apiSearchUrl = 'api/_search/section-histories';

// Actions

export const getSearchEntities: ICrudSearchAction<ISectionHistory> = query => ({
  type: ACTION_TYPES.SEARCH_SECTIONHISTORIES,
  payload: axios.get<ISectionHistory>(`${apiSearchUrl}?query=` + query)
});

export const getEntities: ICrudGetAllAction<ISectionHistory> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_SECTIONHISTORY_LIST,
    payload: axios.get<ISectionHistory>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<ISectionHistory> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_SECTIONHISTORY,
    payload: axios.get<ISectionHistory>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<ISectionHistory> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_SECTIONHISTORY,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const updateEntity: ICrudPutAction<ISectionHistory> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_SECTIONHISTORY,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<ISectionHistory> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_SECTIONHISTORY,
    payload: axios.delete(requestUrl)
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
