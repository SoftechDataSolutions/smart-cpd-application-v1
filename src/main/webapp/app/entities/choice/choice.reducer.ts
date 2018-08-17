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

import { IChoice, defaultValue } from 'app/shared/model/choice.model';

export const ACTION_TYPES = {
  SEARCH_CHOICES: 'choice/SEARCH_CHOICES',
  FETCH_CHOICE_LIST: 'choice/FETCH_CHOICE_LIST',
  FETCH_CHOICE: 'choice/FETCH_CHOICE',
  CREATE_CHOICE: 'choice/CREATE_CHOICE',
  UPDATE_CHOICE: 'choice/UPDATE_CHOICE',
  DELETE_CHOICE: 'choice/DELETE_CHOICE',
  RESET: 'choice/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IChoice>,
  entity: defaultValue,
  links: { next: 0 },
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type ChoiceState = Readonly<typeof initialState>;

// Reducer

export default (state: ChoiceState = initialState, action): ChoiceState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.SEARCH_CHOICES):
    case REQUEST(ACTION_TYPES.FETCH_CHOICE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_CHOICE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_CHOICE):
    case REQUEST(ACTION_TYPES.UPDATE_CHOICE):
    case REQUEST(ACTION_TYPES.DELETE_CHOICE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.SEARCH_CHOICES):
    case FAILURE(ACTION_TYPES.FETCH_CHOICE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_CHOICE):
    case FAILURE(ACTION_TYPES.CREATE_CHOICE):
    case FAILURE(ACTION_TYPES.UPDATE_CHOICE):
    case FAILURE(ACTION_TYPES.DELETE_CHOICE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.SEARCH_CHOICES):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_CHOICE_LIST):
      const links = parseHeaderForLinks(action.payload.headers.link);
      return {
        ...state,
        links,
        loading: false,
        totalItems: action.payload.headers['x-total-count'],
        entities: loadMoreDataWhenScrolled(state.entities, action.payload.data, links)
      };
    case SUCCESS(ACTION_TYPES.FETCH_CHOICE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_CHOICE):
    case SUCCESS(ACTION_TYPES.UPDATE_CHOICE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_CHOICE):
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

const apiUrl = 'api/choices';
const apiSearchUrl = 'api/_search/choices';

// Actions

export const getSearchEntities: ICrudSearchAction<IChoice> = query => ({
  type: ACTION_TYPES.SEARCH_CHOICES,
  payload: axios.get<IChoice>(`${apiSearchUrl}?query=` + query)
});

export const getEntities: ICrudGetAllAction<IChoice> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_CHOICE_LIST,
    payload: axios.get<IChoice>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<IChoice> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_CHOICE,
    payload: axios.get<IChoice>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IChoice> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_CHOICE,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const updateEntity: ICrudPutAction<IChoice> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_CHOICE,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IChoice> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_CHOICE,
    payload: axios.delete(requestUrl)
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
