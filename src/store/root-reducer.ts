import { combineReducers } from '@reduxjs/toolkit';
import { ReducerNameSpaces } from '../consts/enums';
import { dataSlice } from './data-slice/data-slice-reducer';
import { statesSlice } from './state-slice/state-slice-reducer';


export const rootReducer = combineReducers({
  [ReducerNameSpaces.states]: statesSlice.reducer,
  [ReducerNameSpaces.data]: dataSlice.reducer,
});
