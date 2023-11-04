// Esta é uma função chamada setUser que recebe um parâmetro chamado authUser.
export function setUser(authUser) {
  // A função retorna um objeto de ação (action object) para ser usado em um reducer.
  // O tipo da ação é "SET_USER", indicando a intenção de definir um usuário.
  // O valor de "authUser" passado como argumento para a função é atribuído à chave "user" no objeto de ação.
  return {
    type: "SET_USER", // Define o tipo da ação como "SET_USER".
    user: authUser, // Define a propriedade "user" no objeto de ação como o valor de "authUser".
  };
}
