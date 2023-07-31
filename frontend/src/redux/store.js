import {combineReducers, configureStore} from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas";
import login from "./reducers/LoginSlice"
import {dashboardSlice} from "./reducers/DashboardSlice";
import territory from "./reducers/TerritorySlice"

const sagaMiddleware = createSagaMiddleware();
const rootReducer = combineReducers({
    login,
    dashboard: dashboardSlice.reducer,
    territory
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => {
        return getDefaultMiddleware({serializableCheck:false}).concat(sagaMiddleware);
    }
});
sagaMiddleware.run(rootSaga);
