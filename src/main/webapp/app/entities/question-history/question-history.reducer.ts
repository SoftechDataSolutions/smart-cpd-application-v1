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

import { IQuestionHistory, defaultValue } from 'app/shared/model/question-history.model';

export const ACTION_TYPES = {
  SEARCH_QUESTIONHISTORIES: 'questionHistory/SEARCH_QUESTIONHISTORIES',
  FETCH_QUESTIONHISTORY_LIST: 'questionHistory/FETCH_QUESTIONHISTORY_LIST',
  FETCH_QUESTIONHISTORY: 'questionHistory/FETCH_QUESTIONHISTORY',
  CREATE_QUESTIONHISTORY: 'questionHistory/CREATE_QUESTIONHISTORY',
  UPDATE_QUESTIONHISTORY: 'questionHistory/UPDATE_QUESTIONHISTORY',
  DELETE_QUESTIONHISTORY: 'questionHistory/DELETE_QUESTIONHISTORY',
  RESET: 'questionHistory/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IQuestionHistory>,
  entity: defaultValue,
  links: { next: 0 },
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type QuestionHistoryState = Readonly<typeof initialState>;

// Reducer

export default (state: QuestionHistoryState = initialState, action): QuestionHistoryState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.SEARCH_QUESTIONHISTORIES):
    case REQUEST(ACTION_TYPES.FETCH_QUESTIONHISTORY_LIST):
    case REQUEST(ACTION_TYPES.FETCH_QUESTIONHISTORY):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_QUESTIONHISTORY):
    case REQUEST(ACTION_TYPES.UPDATE_QUESTIONHISTORY):
    case REQUEST(ACTION_TYPES.DELETE_QUESTIONHISTORY):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.SEARCH_QUESTIONHISTORIES):
    case FAILURE(ACTION_TYPES.FETCH_QUESTIONHISTORY_LIST):
    case FAILURE(ACTION_TYPES.FETCH_QUESTIONHISTORY):
    case FAILURE(ACTION_TYPES.CREATE_QUESTIONHISTORY):
    case FAILURE(ACTION_TYPES.UPDATE_QUESTIONHISTORY):
    case FAILURE(ACTION_TYPES.DELETE_QUESTIONHISTORY):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.SEARCH_QUESTIONHISTORIES):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_QUESTIONHISTORY_LIST):
      const links = parseHeaderForLinks(action.payload.headers.link);
      return {
        ...state,
        links,
        loading: false,
        totalItems: action.payload.headers['x-total-count'],
        entities: loadMoreDataWhenScrolled(state.entities, action.payload.data, links)
      };
    case SUCCESS(ACTION_TYPES.FETCH_QUESTIONHISTORY):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_QUESTIONHISTORY):
    case SUCCESS(ACTION_TYPES.UPDATE_QUESTIONHISTORY):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_QUESTIONHISTORY):
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

const apiUrl = 'api/question-histories';
const apiSearchUrl = 'api/_search/question-histories';

// Actions

export const getSearchEntities: ICrudSearchAction<IQuestionHistory> = query => ({
  type: ACTION_TYPES.SEARCH_QUESTIONHISTORIES,
  payload: axios.get<IQuestionHistory>(`${apiSearchUrl}?query=` + query)
});

export const getEntities: ICrudGetAllAction<IQuestionHistory> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_QUESTIONHISTORY_LIST,
    payload: axios.get<IQuestionHistory>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<IQuestionHistory> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_QUESTIONHISTORY,
    payload: axios.get<IQuestionHistory>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IQuestionHistory> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_QUESTIONHISTORY,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const updateEntity: ICrudPutAction<IQuestionHistory> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_QUESTIONHISTORY,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IQuestionHistory> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_QUESTIONHISTORY,
    payload: axios.delete(requestUrl)
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
