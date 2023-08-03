import {combineReducers, configureStore} from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas";
import login from "./reducers/LoginSlice"
import {dashboardSlice} from "./reducers/DashboardSlice";
import tableSlice from "./reducers/TableSlice";
import settings from "./reducers/SettingsSlice";
import territory from "./reducers/TerritorySlice"
import modal from "./reducers/ModalSlice"
const sagaMiddleware = createSagaMiddleware();
const rootReducer = combineReducers({
    login,
        dashboard: dashboardSlice.reducer,
    table: tableSlice,
    territory,
    settings,
    modal
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => {
        return getDefaultMiddleware({serializableCheck: false}).concat(sagaMiddleware);
    }
});
sagaMiddleware.run(rootSaga);
