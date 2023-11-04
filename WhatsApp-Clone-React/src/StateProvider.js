// Importa as funcionalidades necessárias do React para criação de um contexto e uso de hooks.
import React, { createContext, useContext, useReducer } from "react";

// Cria um contexto do React chamado StateContext. O contexto será usado para compartilhar
// o estado entre componentes sem a necessidade de passá-lo explicitamente através das props.
export const StateContext = createContext();

// Cria um componente chamado StateProvider que utiliza o contexto criado.
// O StateProvider recebe três argumentos: reducer (uma função que especifica como o estado é atualizado),
// initialState (o estado inicial) e children (os componentes filhos que terão acesso ao estado do contexto).
export const StateProvider = ({ reducer, initialState, children }) => (
  // O componente StateProvider renderiza o StateContext.Provider e passa o valor do contexto.
  // O valor do contexto é um array que contém o estado atual e a função de atualização do estado (dispatch).
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {/* Renderiza os componentes filhos que terão acesso ao estado do contexto. */}
    {children}
  </StateContext.Provider>
);

// Cria um hook customizado chamado useStateValue.
// Esse hook permite que os componentes acessem o estado do contexto e a função de atualização do estado (dispatch).
export const useStateValue = () => useContext(StateContext);
