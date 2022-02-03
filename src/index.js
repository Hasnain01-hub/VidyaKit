import React from "react";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom";
import App from "./App";
import { DataProvider, PlaylistProvider, LikeSaveProvider } from "./Context";
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducers';


const store = createStore(rootReducer, composeWithDevTools());
ReactDOM.render(
  <React.StrictMode>
    {/* <Router> */}
    <Provider store={store}>
    <BrowserRouter>
      <DataProvider>
        <PlaylistProvider>
          <LikeSaveProvider>
            <App />
          </LikeSaveProvider>
        </PlaylistProvider>
      </DataProvider>
      </BrowserRouter>
    {/* </Router> */}
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
