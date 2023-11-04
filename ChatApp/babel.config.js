// Exporta uma função que recebe um objeto `api` como parâmetro.
module.exports = function(api) {
  // Chama o método `api.cache(true)` para habilitar o caching das configurações do Babel, melhorando a performance do processo de transpilação.
  api.cache(true);
  
  // Retorna um objeto de configuração do Babel com a chave `presets` contendo um array com o valor 'babel-preset-expo'.
  // Isso indica que o preset 'babel-preset-expo' será utilizado para transpilar o código fonte.
  return {
    presets: ['babel-preset-expo'],
  };
};
  