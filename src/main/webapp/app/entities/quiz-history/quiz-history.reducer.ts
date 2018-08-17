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

import { IQuizHistory, defaultValue } from 'app/shared/model/quiz-history.model';

export const ACTION_TYPES = {
  SEARCH_QUIZHISTORIES: 'quizHistory/SEARCH_QUIZHISTORIES',
  FETCH_QUIZHISTORY_LIST: 'quizHistory/FETCH_QUIZHISTORY_LIST',
  FETCH_QUIZHISTORY: 'quizHistory/FETCH_QUIZHISTORY',
  CREATE_QUIZHISTORY: 'quizHistory/CREATE_QUIZHISTORY',
  UPDATE_QUIZHISTORY: 'quizHistory/UPDATE_QUIZHISTORY',
  DELETE_QUIZHISTORY: 'quizHistory/DELETE_QUIZHISTORY',
  RESET: 'quizHistory/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IQuizHistory>,
  entity: defaultValue,
  links: { next: 0 },
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type QuizHistoryState = Readonly<typeof initialState>;

// Reducer

export default (state: QuizHistoryState = initialState, action): QuizHistoryState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.SEARCH_QUIZHISTORIES):
    case REQUEST(ACTION_TYPES.FETCH_QUIZHISTORY_LIST):
    case REQUEST(ACTION_TYPES.FETCH_QUIZHISTORY):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_QUIZHISTORY):
    case REQUEST(ACTION_TYPES.UPDATE_QUIZHISTORY):
    case REQUEST(ACTION_TYPES.DELETE_QUIZHISTORY):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.SEARCH_QUIZHISTORIES):
    case FAILURE(ACTION_TYPES.FETCH_QUIZHISTORY_LIST):
    case FAILURE(ACTION_TYPES.FETCH_QUIZHISTORY):
    case FAILURE(ACTION_TYPES.CREATE_QUIZHISTORY):
    case FAILURE(ACTION_TYPES.UPDATE_QUIZHISTORY):
    case FAILURE(ACTION_TYPES.DELETE_QUIZHISTORY):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.SEARCH_QUIZHISTORIES):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_QUIZHISTORY_LIST):
      const links = parseHeaderForLinks(action.payload.headers.link);
      return {
        ...state,
        links,
        loading: false,
        totalItems: action.payload.headers['x-total-count'],
        entities: loadMoreDataWhenScrolled(state.entities, action.payload.data, links)
      };
    case SUCCESS(ACTION_TYPES.FETCH_QUIZHISTORY):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_QUIZHISTORY):
    case SUCCESS(ACTION_TYPES.UPDATE_QUIZHISTORY):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_QUIZHISTORY):
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

const apiUrl = 'api/quiz-histories';
const apiSearchUrl = 'api/_search/quiz-histories';

// Actions

export const getSearchEntities: ICrudSearchAction<IQuizHistory> = query => ({
  type: ACTION_TYPES.SEARCH_QUIZHISTORIES,
  payload: axios.get<IQuizHistory>(`${apiSearchUrl}?query=` + query)
});

export const getEntities: ICrudGetAllAction<IQuizHistory> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_QUIZHISTORY_LIST,
    payload: axios.get<IQuizHistory>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<IQuizHistory> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_QUIZHISTORY,
    payload: axios.get<IQuizHistory>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IQuizHistory> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_QUIZHISTORY,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const updateEntity: ICrudPutAction<IQuizHistory> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_QUIZHISTORY,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IQuizHistory> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_QUIZHISTORY,
    payload: axios.delete(requestUrl)
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
