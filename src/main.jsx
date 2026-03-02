import 'antd/dist/reset.css'; // For Ant Design v5
import "regenerator-runtime/runtime";
import { createRoot } from 'react-dom/client';
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import './index.css';
import App from './App.jsx';
import Wrapper from './Wrapper.jsx';


import store from "./Store/index";

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <Router>
            <Wrapper>
            <App />
            </Wrapper>
        </Router>
    </Provider>
);
