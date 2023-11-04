// Exporta uma função chamada 'searchRoom', que recebe um parâmetro chamado 'search'.
export default function searchRoom(search) {
  // Retorna uma função que recebe um parâmetro chamado 'x'.
  return function (x) {
    // Cria uma variável 'room' concatenando o nome da sala (x.data.name) com o ID da sala (x.id).
    var room = x.data.name + " " + x.id;
    // Retorna true se a 'room' convertida para letras minúsculas contém a 'search' convertida para letras minúsculas, ou se 'search' é uma string vazia.
    return room.toLowerCase().includes(search.toLowerCase()) || !search;
  };
}
