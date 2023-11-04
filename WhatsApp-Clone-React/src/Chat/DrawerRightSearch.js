import React, { useState, useEffect } from "react";
// Importa o componente de barra de pesquisa compartilhada.
import SearchBar from "../shared/SearchBar";
// Importa os componentes do Material-UI e seus estilos associados.
import DrawerRight from "./DrawerRight";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
// Importa ícones do Material-UI.
import CloseIcon from "@material-ui/icons/Close";
import DoneIcon from "@material-ui/icons/Done";
// Importa estilos CSS associados a este componente.
import "./DrawerRightSearch.css";

// Declaração do componente DrawerRightSearch que recebe propriedades drawerRightSearch, setDrawerRightSearch, messages e user.
function DrawerRightSearch({
  drawerRightSearch,
  setDrawerRightSearch,
  messages,
  user,
}) {
  // Estado para armazenar o texto de pesquisa.
  const [search, setSearch] = useState("");
  // Estado para indicar se a mensagem foi encontrada com base na pesquisa.
  const [isFoundMessage, setIsFoundMessage] = useState(false);

  // Função que retorna uma função para filtrar mensagens com base no texto de pesquisa.
  const findMessage = function (myMessages) {
    return function (x) {
      var searchMessage = x.message + "" + x.caption;
      return (
        searchMessage.toLowerCase().includes(myMessages.toLowerCase()) ||
        !myMessages
      );
    };
  };

  // Efeito que é executado sempre que o texto de pesquisa ou as mensagens mudam.
  useEffect(() => {
    // Função para calcular o resultado da pesquisa.
    const messageResult = () => {
      return (
        <>
          {/* Mapeia as mensagens filtradas e as renderiza como parágrafos. */}
          {messages.filter(findMessage(search)).map((message) => (
            <p key={message.id}>
              {message.message}
              {message.caption}
            </p>
          ))}
        </>
      );
    };

    // Verifica se há um texto de pesquisa.
    if (search) {
      // Calcula o resultado da pesquisa.
      var result = messageResult();
      // Verifica se foram encontradas mensagens.
      if (result.props.children.length > 0) {
        setIsFoundMessage(true);
        console.log("search message sucess"); // Log de sucesso na pesquisa.
      } else {
        setIsFoundMessage(false);
        console.log("search message fail"); // Log de falha na pesquisa.
      }
    }
  }, [search, messages]); // Dependências do efeito.

  // Função para fechar o DrawerRightSearch.
  const handleDrawerClose = () => {
    setDrawerRightSearch(false);
  };

  // Renderização do componente.
  return (
    <div>
      {/* Renderiza o componente DrawerRight, passando o conteúdo correspondente. */}
      <DrawerRight
        drawerRight={drawerRightSearch}
        content={
          <>
            {/* Cabeçalho do DrawerRightSearch com botão de fechar e título "Search Messages". */}
            <div className="drawerRight__header">
              <IconButton onClick={handleDrawerClose}>
                <CloseIcon />
              </IconButton>
              <p>Search Messages</p>
            </div>

            {/* Barra de pesquisa com caixa de pesquisa compartilhada. */}
            <SearchBar
              search={search}
              setSearch={setSearch}
              placeholder="Search..."
            />

            {/* Conteúdo das mensagens pesquisadas, com base no estado isFoundMessage. */}
            <div
              className={`drawerRight__content ${
                isFoundMessage === true &&
                search.length > 0 &&
                "drawerRight__content_searched"
              }`}
            >
              {search.length > 0 ? (
                <>
                  {/* Verifica se há mensagens encontradas para exibir. */}
                  {isFoundMessage ? (
                    <>
                      {/* Mapeia as mensagens filtradas e as renderiza com informações adicionais. */}
                      {messages.filter(findMessage(search)).map((message) => (
                        <div
                          key={message.id}
                          className="drawerRight__content_searched_message"
                        >
                          {/* Exibe a hora da mensagem e marca de verificação se a mensagem pertence ao usuário atual. */}
                          <p>
                            {new Date(
                              message.timestamp?.toDate()
                            ).toLocaleTimeString("en-US", {
                              hour: "numeric",
                              hour12: true,
                              minute: "numeric",
                            })}
                            <br />
                          </p>
                          {/* Exibe o conteúdo da mensagem e a legenda, se existirem. */}
                          <p id="last_p">
                            {message.uid === user.uid ? <DoneIcon /> : null}
                            {message.message}
                            {message.caption}
                          </p>
                          {/* Adiciona uma linha divisória entre as mensagens. */}
                          <Divider />
                        </div>
                      ))}
                    </>
                  ) : (
                    <p>No message found</p> // Mensagem exibida quando nenhuma mensagem é encontrada.
                  )}
                </>
              ) : (
                <p>Search for messages in this room.</p> // Mensagem exibida quando não há texto de pesquisa.
              )}
            </div>
          </>
        }
      />
    </div>
  );
}

// Exporta o componente DrawerRightSearch.
export default DrawerRightSearch;
