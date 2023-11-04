import React, { useState, useEffect } from "react";
// Importando componentes
import SearchBar from "../shared/SearchBar"; // Importando o componente de barra de pesquisa compartilhado
// Importando componentes do Material-UI
import DrawerRight from "./DrawerRight"; // Componente de painel lateral direito
import IconButton from "@material-ui/core/IconButton"; // Botão de ícone
import Zoom from "@material-ui/core/Zoom"; // Componente de zoom do Material-UI
import Drawer from "@material-ui/core/Drawer"; // Componente de gaveta do Material-UI
import Avatar from "@material-ui/core/Avatar"; // Componente de avatar do Material-UI
import Dialog from "@material-ui/core/Dialog"; // Componente de diálogo do Material-UI
import DialogTitle from "@material-ui/core/DialogTitle"; // Título do diálogo
import DialogContent from "@material-ui/core/DialogContent"; // Conteúdo do diálogo
import DialogActions from "@material-ui/core/DialogActions"; // Ações do diálogo
import { makeStyles } from "@material-ui/core/styles"; // Estilos do Material-UI
import Divider from "@material-ui/core/Divider"; // Componente de divisor do Material-UI
// Importando ícones do Material-UI
import CloseIcon from "@material-ui/icons/Close"; // Ícone de fechar
import DoneIcon from "@material-ui/icons/Done"; // Ícone de marca de seleção
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera"; // Ícone da câmera
import GroupIcon from "@material-ui/icons/Group"; // Ícone de grupo
// Importando estilos CSS
import "./DrawerRightInfo.css";

function DrawerRightInfo({
  drawerRightInfo,
  setDrawerRightInfo,
  messages,
  user,
}) {
  // Definindo estados locais para a barra de pesquisa e para indicar se mensagens foram encontradas
  const [search, setSearch] = useState("");
  const [isFoundMessage, setIsFoundMessage] = useState(false);

  // Função para filtrar mensagens com base na barra de pesquisa
  const findMessage = function (myMessages) {
    return function (x) {
      var searchMessage = x.message + "" + x.caption;
      return (
        searchMessage.toLowerCase().includes(myMessages.toLowerCase()) ||
        !myMessages
      );
    };
  };

  // Efeito useEffect para realizar a pesquisa e atualizar o estado isFoundMessage
  useEffect(() => {
    const messageResult = () => {
      return (
        <>
          {/* Mapeando mensagens filtradas e exibindo-as como parágrafos */}
          {messages.filter(findMessage(search)).map((message) => (
            <p key={message.id}>
              {message.message}
              {message.caption}
            </p>
          ))}
        </>
      );
    };

    if (search) {
      var result = messageResult();
      // Verifica se há mensagens encontradas e atualiza o estado isFoundMessage
      if (result.props.children.length > 0) {
        setIsFoundMessage(true);
        console.log("search message success"); // Mensagem de sucesso no console
      } else {
        setIsFoundMessage(false);
        console.log("search message fail"); // Mensagem de falha no console
      }
    }
  }, [search, messages]); // Dependências do efeito: search e messages

  // Função para fechar o painel lateral
  const handleDrawerClose = () => {
    setDrawerRightInfo(false);
  };

  return (
    <div>
      {/* Componente de painel lateral direito com o conteúdo */}
      <DrawerRight
        drawerRight={drawerRightInfo} // Propriedade para controlar a visibilidade do painel lateral
        content={
          <>
            {/* Cabeçalho do painel lateral */}
            <div className="drawer-right-info__header">
              <IconButton onClick={handleDrawerClose}>
                <CloseIcon /> {/* Ícone de fechar */}
              </IconButton>
              <p>Group Info</p> {/* Título do painel lateral */}
            </div>
            {/* Conteúdo do painel lateral */}
            <div className="drawer-right-info-content">
              {/* Seção de foto de perfil */}
              <div className="drawer-right-info-content__photo">
                <div className="profilePhoto">
                  {/* Zoom para a foto de perfil */}
                  <Zoom
                    in={drawerRightInfo}
                    style={{
                      transitionDelay: drawerRightInfo ? "300ms" : "0ms",
                    }}
                  >
                    {/* Avatar de grupo */}
                    <Avatar>
                      <GroupIcon />
                    </Avatar>
                  </Zoom>
                  {/* Camada superior com opção para mudar a foto de perfil */}
                  <div
                    className="profilePhoto__layer_top"
                    // onClick={handleProfileMenu}
                  >
                    <div className="profilePhoto__text">
                      <PhotoCameraIcon /> {/* Ícone da câmera */}
                      <p>CHANGE</p>
                      <p>PROFILE PHOTO</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        }
      />
    </div>
  );
}

export default DrawerRightInfo;
