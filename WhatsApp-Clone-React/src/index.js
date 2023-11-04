// Importa a biblioteca React do pacote 'react'
import React from "react";
// Importa a biblioteca ReactDOM do pacote 'react-dom'
import ReactDOM from "react-dom";
// Importa o arquivo de estilo './index.css'
import "./index.css";
// Importa o componente principal da aplicação de './App'
import App from "./App";
// Importa todas as funcionalidades do arquivo './serviceWorker'
import * as serviceWorker from "./serviceWorker";
// Importa o componente StateProvider do arquivo './StateProvider'
import { StateProvider } from "./StateProvider";
// Importa o reducer e o initialState do arquivo './reducer'
import reducer, { initialState } from "./reducer";

// Renderiza o componente principal da aplicação dentro de um 'React.StrictMode',
// que ajuda a encontrar e alertar sobre práticas comuns que podem
// prejudicar a performance e a experiência do usuário
ReactDOM.render(
  <React.StrictMode>
    {/* 
    Inicializa o StateProvider com o initialState e o reducer, 
    envolvendo o componente App com o provedor de estado
    */}
    <StateProvider initialState={initialState} reducer={reducer}>
      {/* Renderiza o componente App dentro do StateProvider */}
      <App />
    </StateProvider>
  </React.StrictMode>,
  // Encontra o elemento com o ID 'root' no arquivo HTML e renderiza o aplicativo dentro dele
  document.getElementById("root")
);

// Desregistra o service worker, permitindo que o aplicativo não funcione offline
// e carregue mais rapidamente.
serviceWorker.unregister();
