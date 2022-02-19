import React from 'react';
import ReactDOM from 'react-dom';
import { render } from 'react-dom';
import { 
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';
import './styles/style.css';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import ResultsPage from "./routes/ResultsPage";
import IngredientsPage from "./routes/IngredientsPage";
import '../node_modules/font-awesome/css/font-awesome.min.css';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<IngredientsPage />} />
          <Route path="ingredients" element={<IngredientsPage />} />
          <Route path="results" element={<ResultsPage />} />
          <Route
            path="*"
            element={
              <div style={{ padding: "1rem" }}>
                <p>Something went wrong. There's nothing here.</p>
              </div>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
