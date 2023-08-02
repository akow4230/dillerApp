import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {store} from "./redux/store"
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import {YMaps} from "react-yandex-maps";
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <YMaps>
        <BrowserRouter>
            <Provider store={store}>
                <App/>
            </Provider>
        </BrowserRouter>
    </YMaps>
);


