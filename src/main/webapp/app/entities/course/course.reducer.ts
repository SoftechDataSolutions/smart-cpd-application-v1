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

import { ICourse, defaultValue } from 'app/shared/model/course.model';

export const ACTION_TYPES = {
  SEARCH_COURSES: 'course/SEARCH_COURSES',
  FETCH_COURSE_LIST: 'course/FETCH_COURSE_LIST',
  FETCH_COURSE: 'course/FETCH_COURSE',
  CREATE_COURSE: 'course/CREATE_COURSE',
  UPDATE_COURSE: 'course/UPDATE_COURSE',
  DELETE_COURSE: 'course/DELETE_COURSE',
  SET_BLOB: 'course/SET_BLOB',
  RESET: 'course/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ICourse>,
  entity: defaultValue,
  links: { next: 0 },
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type CourseState = Readonly<typeof initialState>;

// Reducer

export default (state: CourseState = initialState, action): CourseState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.SEARCH_COURSES):
    case REQUEST(ACTION_TYPES.FETCH_COURSE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_COURSE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_COURSE):
    case REQUEST(ACTION_TYPES.UPDATE_COURSE):
    case REQUEST(ACTION_TYPES.DELETE_COURSE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.SEARCH_COURSES):
    case FAILURE(ACTION_TYPES.FETCH_COURSE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_COURSE):
    case FAILURE(ACTION_TYPES.CREATE_COURSE):
    case FAILURE(ACTION_TYPES.UPDATE_COURSE):
    case FAILURE(ACTION_TYPES.DELETE_COURSE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.SEARCH_COURSES):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_COURSE_LIST):
      const links = parseHeaderForLinks(action.payload.headers.link);
      return {
        ...state,
        links,
        loading: false,
        totalItems: action.payload.headers['x-total-count'],
        entities: loadMoreDataWhenScrolled(state.entities, action.payload.data, links)
      };
    case SUCCESS(ACTION_TYPES.FETCH_COURSE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_COURSE):
    case SUCCESS(ACTION_TYPES.UPDATE_COURSE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_COURSE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.SET_BLOB:
      const { name, data, contentType } = action.payload;
      return {
        ...state,
        entity: {
          ...state.entity,
          [name]: data,
          [name + 'ContentType']: contentType
        }
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = 'api/courses';
const apiSearchUrl = 'api/_search/courses';

// Actions

export const getSearchEntities: ICrudSearchAction<ICourse> = query => ({
  type: ACTION_TYPES.SEARCH_COURSES,
  payload: axios.get<ICourse>(`${apiSearchUrl}?query=` + query)
});

export const getEntities: ICrudGetAllAction<ICourse> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_COURSE_LIST,
    payload: axios.get<ICourse>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<ICourse> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_COURSE,
    payload: axios.get<ICourse>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<ICourse> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_COURSE,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const updateEntity: ICrudPutAction<ICourse> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_COURSE,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<ICourse> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_COURSE,
    payload: axios.delete(requestUrl)
  });
  return result;
};

export const setBlob = (name, data, contentType?) => ({
  type: ACTION_TYPES.SET_BLOB,
  payload: {
    name,
    data,
    contentType
  }
});

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
