import React from "react";
import ReactDOM from "react-dom/client";
/* import './index.css'; */
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import GameProvider from "./context/GameContext";
import {Router} from "./context/RouterContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

/* if (process.env.NODE_ENV === 'production') {
    console.log = () => {};
} */

root.render(
    <React.StrictMode>
                <App />
    </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
