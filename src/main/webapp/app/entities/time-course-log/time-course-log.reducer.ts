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

import { ITimeCourseLog, defaultValue } from 'app/shared/model/time-course-log.model';

export const ACTION_TYPES = {
  SEARCH_TIMECOURSELOGS: 'timeCourseLog/SEARCH_TIMECOURSELOGS',
  FETCH_TIMECOURSELOG_LIST: 'timeCourseLog/FETCH_TIMECOURSELOG_LIST',
  FETCH_TIMECOURSELOG: 'timeCourseLog/FETCH_TIMECOURSELOG',
  CREATE_TIMECOURSELOG: 'timeCourseLog/CREATE_TIMECOURSELOG',
  UPDATE_TIMECOURSELOG: 'timeCourseLog/UPDATE_TIMECOURSELOG',
  DELETE_TIMECOURSELOG: 'timeCourseLog/DELETE_TIMECOURSELOG',
  RESET: 'timeCourseLog/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ITimeCourseLog>,
  entity: defaultValue,
  links: { next: 0 },
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type TimeCourseLogState = Readonly<typeof initialState>;

// Reducer

export default (state: TimeCourseLogState = initialState, action): TimeCourseLogState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.SEARCH_TIMECOURSELOGS):
    case REQUEST(ACTION_TYPES.FETCH_TIMECOURSELOG_LIST):
    case REQUEST(ACTION_TYPES.FETCH_TIMECOURSELOG):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_TIMECOURSELOG):
    case REQUEST(ACTION_TYPES.UPDATE_TIMECOURSELOG):
    case REQUEST(ACTION_TYPES.DELETE_TIMECOURSELOG):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.SEARCH_TIMECOURSELOGS):
    case FAILURE(ACTION_TYPES.FETCH_TIMECOURSELOG_LIST):
    case FAILURE(ACTION_TYPES.FETCH_TIMECOURSELOG):
    case FAILURE(ACTION_TYPES.CREATE_TIMECOURSELOG):
    case FAILURE(ACTION_TYPES.UPDATE_TIMECOURSELOG):
    case FAILURE(ACTION_TYPES.DELETE_TIMECOURSELOG):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.SEARCH_TIMECOURSELOGS):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_TIMECOURSELOG_LIST):
      const links = parseHeaderForLinks(action.payload.headers.link);
      return {
        ...state,
        links,
        loading: false,
        totalItems: action.payload.headers['x-total-count'],
        entities: loadMoreDataWhenScrolled(state.entities, action.payload.data, links)
      };
    case SUCCESS(ACTION_TYPES.FETCH_TIMECOURSELOG):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_TIMECOURSELOG):
    case SUCCESS(ACTION_TYPES.UPDATE_TIMECOURSELOG):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_TIMECOURSELOG):
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

const apiUrl = 'api/time-course-logs';
const apiSearchUrl = 'api/_search/time-course-logs';

// Actions

export const getSearchEntities: ICrudSearchAction<ITimeCourseLog> = query => ({
  type: ACTION_TYPES.SEARCH_TIMECOURSELOGS,
  payload: axios.get<ITimeCourseLog>(`${apiSearchUrl}?query=` + query)
});

export const getEntities: ICrudGetAllAction<ITimeCourseLog> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_TIMECOURSELOG_LIST,
    payload: axios.get<ITimeCourseLog>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<ITimeCourseLog> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_TIMECOURSELOG,
    payload: axios.get<ITimeCourseLog>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<ITimeCourseLog> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_TIMECOURSELOG,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const updateEntity: ICrudPutAction<ITimeCourseLog> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_TIMECOURSELOG,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<ITimeCourseLog> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_TIMECOURSELOG,
    payload: axios.delete(requestUrl)
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
