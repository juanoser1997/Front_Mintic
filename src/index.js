import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  ApolloLink,
  HttpLink,
} from "@apollo/client";


const httpLink = new HttpLink({uri:'http://localhost:9092/graphql'})
const authLink = new ApolloLink((operation, forward) =>{
  const token = localStorage.getItem('auth_token');
  operation.setContext({
    headers:{
      authorization: token ? `${token}`: ''
    }
  });
  return forward(operation);
})
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});




ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
    </ApolloProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
