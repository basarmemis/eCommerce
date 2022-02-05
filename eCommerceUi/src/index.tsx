import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import { createBrowserHistory } from "history";
import { StoreProvider } from './context/StoreContext';
import { configureStore } from './store/configureStore';
import { Provider } from 'react-redux';

const store = configureStore();

console.log(store.getState());

export const history = createBrowserHistory();

ReactDOM.render(
  <React.StrictMode>
    <HistoryRouter
      history={history}
    >
      <StoreProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </StoreProvider>
    </HistoryRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
