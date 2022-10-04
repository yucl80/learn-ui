import React from 'react';
import ReactDOM from 'react-dom/client';

//import App from './App';
//import Test2 from './test2';
import reportWebVitals from './reportWebVitals';
//import Test6 from './test6';
//import MyComponent from './mycomponent';
import D3Viz from './testd3';
import D3Viz1 from './testd4';

const root = ReactDOM.createRoot(document.getElementById('root'));
//const rootElement = document.getElementById("root");


root.render(
  <React.StrictMode>  
    
    <D3Viz1/>
  </React.StrictMode>
);

//root.render(<div><D3Viz1/></div>);


console.log("run in index.js")

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
