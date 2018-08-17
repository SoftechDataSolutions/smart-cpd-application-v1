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

import { ICourseHistory, defaultValue } from 'app/shared/model/course-history.model';

export const ACTION_TYPES = {
  SEARCH_COURSEHISTORIES: 'courseHistory/SEARCH_COURSEHISTORIES',
  FETCH_COURSEHISTORY_LIST: 'courseHistory/FETCH_COURSEHISTORY_LIST',
  FETCH_COURSEHISTORY: 'courseHistory/FETCH_COURSEHISTORY',
  CREATE_COURSEHISTORY: 'courseHistory/CREATE_COURSEHISTORY',
  UPDATE_COURSEHISTORY: 'courseHistory/UPDATE_COURSEHISTORY',
  DELETE_COURSEHISTORY: 'courseHistory/DELETE_COURSEHISTORY',
  RESET: 'courseHistory/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ICourseHistory>,
  entity: defaultValue,
  links: { next: 0 },
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type CourseHistoryState = Readonly<typeof initialState>;

// Reducer

export default (state: CourseHistoryState = initialState, action): CourseHistoryState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.SEARCH_COURSEHISTORIES):
    case REQUEST(ACTION_TYPES.FETCH_COURSEHISTORY_LIST):
    case REQUEST(ACTION_TYPES.FETCH_COURSEHISTORY):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_COURSEHISTORY):
    case REQUEST(ACTION_TYPES.UPDATE_COURSEHISTORY):
    case REQUEST(ACTION_TYPES.DELETE_COURSEHISTORY):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.SEARCH_COURSEHISTORIES):
    case FAILURE(ACTION_TYPES.FETCH_COURSEHISTORY_LIST):
    case FAILURE(ACTION_TYPES.FETCH_COURSEHISTORY):
    case FAILURE(ACTION_TYPES.CREATE_COURSEHISTORY):
    case FAILURE(ACTION_TYPES.UPDATE_COURSEHISTORY):
    case FAILURE(ACTION_TYPES.DELETE_COURSEHISTORY):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.SEARCH_COURSEHISTORIES):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_COURSEHISTORY_LIST):
      const links = parseHeaderForLinks(action.payload.headers.link);
      return {
        ...state,
        links,
        loading: false,
        totalItems: action.payload.headers['x-total-count'],
        entities: loadMoreDataWhenScrolled(state.entities, action.payload.data, links)
      };
    case SUCCESS(ACTION_TYPES.FETCH_COURSEHISTORY):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_COURSEHISTORY):
    case SUCCESS(ACTION_TYPES.UPDATE_COURSEHISTORY):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_COURSEHISTORY):
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

const apiUrl = 'api/course-histories';
const apiSearchUrl = 'api/_search/course-histories';

// Actions

export const getSearchEntities: ICrudSearchAction<ICourseHistory> = query => ({
  type: ACTION_TYPES.SEARCH_COURSEHISTORIES,
  payload: axios.get<ICourseHistory>(`${apiSearchUrl}?query=` + query)
});

export const getEntities: ICrudGetAllAction<ICourseHistory> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_COURSEHISTORY_LIST,
    payload: axios.get<ICourseHistory>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<ICourseHistory> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_COURSEHISTORY,
    payload: axios.get<ICourseHistory>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<ICourseHistory> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_COURSEHISTORY,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const updateEntity: ICrudPutAction<ICourseHistory> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_COURSEHISTORY,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<ICourseHistory> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_COURSEHISTORY,
    payload: axios.delete(requestUrl)
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
