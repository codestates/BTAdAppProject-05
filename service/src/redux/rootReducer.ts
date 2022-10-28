import {combineReducers} from 'redux';
import {api} from '@/api';
import homeSlice from '@/redux/slices/homeSlice';

const rootReducer = combineReducers({
  home: homeSlice,
  [api.reducerPath]: api.reducer,
});

export default rootReducer;