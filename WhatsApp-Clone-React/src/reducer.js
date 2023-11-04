// Este trecho de código exporta o estado inicial do Reducer, que contém uma propriedade 'user' inicialmente definida como null.
export const initialState = {
  user: null,
};

// Este trecho de código exporta um objeto contendo os tipos de ação disponíveis para o Reducer. Neste caso, há apenas um tipo de ação chamado 'SET_USER'.
export const actionTypes = {
  SET_USER: "SET_USER",
};

// Esta é a função do Reducer, que recebe o estado atual e uma ação como parâmetros e retorna um novo estado com base na ação recebida.
const reducer = (state, action) => {
  // O switch statement é utilizado para verificar o tipo de ação recebida.
  switch (action.type) {
    // Caso a ação recebida seja do tipo 'SET_USER', a função retorna um novo estado com a propriedade 'user' atualizada com o valor passado na ação.
    case actionTypes.SET_USER:
      return {
        ...state, // Mantém as propriedades existentes do estado atual.
        user: action.user, // Atualiza a propriedade 'user' com o valor passado na ação.
      };
    // Caso a ação não seja reconhecida (ou seja, um tipo de ação não esperado), a função retorna o estado atual sem fazer modificações.
    default:
      return state;
  }
};

// Esta função do Reducer é exportada para ser utilizada em outras partes do código, como no createStore do Redux, por exemplo.
export default reducer;
