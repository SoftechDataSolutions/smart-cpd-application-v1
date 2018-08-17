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

import { ICourseCartBridge, defaultValue } from 'app/shared/model/course-cart-bridge.model';

export const ACTION_TYPES = {
  SEARCH_COURSECARTBRIDGES: 'courseCartBridge/SEARCH_COURSECARTBRIDGES',
  FETCH_COURSECARTBRIDGE_LIST: 'courseCartBridge/FETCH_COURSECARTBRIDGE_LIST',
  FETCH_COURSECARTBRIDGE: 'courseCartBridge/FETCH_COURSECARTBRIDGE',
  CREATE_COURSECARTBRIDGE: 'courseCartBridge/CREATE_COURSECARTBRIDGE',
  UPDATE_COURSECARTBRIDGE: 'courseCartBridge/UPDATE_COURSECARTBRIDGE',
  DELETE_COURSECARTBRIDGE: 'courseCartBridge/DELETE_COURSECARTBRIDGE',
  RESET: 'courseCartBridge/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ICourseCartBridge>,
  entity: defaultValue,
  links: { next: 0 },
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type CourseCartBridgeState = Readonly<typeof initialState>;

// Reducer

export default (state: CourseCartBridgeState = initialState, action): CourseCartBridgeState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.SEARCH_COURSECARTBRIDGES):
    case REQUEST(ACTION_TYPES.FETCH_COURSECARTBRIDGE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_COURSECARTBRIDGE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_COURSECARTBRIDGE):
    case REQUEST(ACTION_TYPES.UPDATE_COURSECARTBRIDGE):
    case REQUEST(ACTION_TYPES.DELETE_COURSECARTBRIDGE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.SEARCH_COURSECARTBRIDGES):
    case FAILURE(ACTION_TYPES.FETCH_COURSECARTBRIDGE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_COURSECARTBRIDGE):
    case FAILURE(ACTION_TYPES.CREATE_COURSECARTBRIDGE):
    case FAILURE(ACTION_TYPES.UPDATE_COURSECARTBRIDGE):
    case FAILURE(ACTION_TYPES.DELETE_COURSECARTBRIDGE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.SEARCH_COURSECARTBRIDGES):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_COURSECARTBRIDGE_LIST):
      const links = parseHeaderForLinks(action.payload.headers.link);
      return {
        ...state,
        links,
        loading: false,
        totalItems: action.payload.headers['x-total-count'],
        entities: loadMoreDataWhenScrolled(state.entities, action.payload.data, links)
      };
    case SUCCESS(ACTION_TYPES.FETCH_COURSECARTBRIDGE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_COURSECARTBRIDGE):
    case SUCCESS(ACTION_TYPES.UPDATE_COURSECARTBRIDGE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_COURSECARTBRIDGE):
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

const apiUrl = 'api/course-cart-bridges';
const apiSearchUrl = 'api/_search/course-cart-bridges';

// Actions

export const getSearchEntities: ICrudSearchAction<ICourseCartBridge> = query => ({
  type: ACTION_TYPES.SEARCH_COURSECARTBRIDGES,
  payload: axios.get<ICourseCartBridge>(`${apiSearchUrl}?query=` + query)
});

export const getEntities: ICrudGetAllAction<ICourseCartBridge> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_COURSECARTBRIDGE_LIST,
    payload: axios.get<ICourseCartBridge>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<ICourseCartBridge> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_COURSECARTBRIDGE,
    payload: axios.get<ICourseCartBridge>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<ICourseCartBridge> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_COURSECARTBRIDGE,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const updateEntity: ICrudPutAction<ICourseCartBridge> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_COURSECARTBRIDGE,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<ICourseCartBridge> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_COURSECARTBRIDGE,
    payload: axios.delete(requestUrl)
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
