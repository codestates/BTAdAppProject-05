import {configureStore} from '@reduxjs/toolkit';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import rootReducer from '@/redux/rootReducer';

const store = configureStore({
  reducer: rootReducer,
});

export type RootReducerType = ReturnType<typeof rootReducer>;
export type DispatchType = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<DispatchType>();
export const useAppSelector: TypedUseSelectorHook<RootReducerType> = useSelector;

export default store;