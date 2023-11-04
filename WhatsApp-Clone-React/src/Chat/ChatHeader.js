import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useStateValue } from "../StateProvider";
// Importação de componentes
import DropdownMenu from "../shared/DropdownMenu";
import DrawerRightSearch from "./DrawerRightSearch";
import DrawerRightInfo from "./DrawerRightInfo";
import TooltipCustom from "../shared/TooltipCustom";
import { toastInfo } from "../shared/toastInfo";
// Importação de componentes do Material-UI
import Hidden from "@material-ui/core/Hidden";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
// Importação de ícones do Material-UI
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import MoreVertIcon from "@material-ui/icons/MoreVert";
// Importação de estilos CSS
import "./ChatHeader.css";

function ChatHeader({
  roomCreatedBy,
  roomOwner,
  roomName,
  roomId,
  _roomId,
  messages,
  db,
  history,
  isRoomExist,
}) {
  // Utilização do useStateValue para acessar o estado global
  const [{ user }] = useStateValue();
  // Estados locais para controlar o estado dos componentes DrawerRightSearch e DrawerRightInfo,
  // bem como o menu suspenso (dropdown) e outras variáveis de estado
  const [drawerRightSearch, setDrawerRightSearch] = useState(false);
  const [drawerRightInfo, setDrawerRightInfo] = useState(false);
  const [menuChat, setMenuChat] = useState(null);
  const [role, setRole] = useState("");
  const [showDate, setShowDate] = useState(false);
  const [isLastMessage, setIsLastMessage] = useState(false);

  // Efeito useEffect para atualizar os estados locais com base nas mudanças no usuário, mensagens e outras variáveis
  useEffect(() => {
    // ...
  }, [user.uid, user.displayName, user.isAnonymous, db, messages, roomId]);

  // Função para formatar a data de um mensagem
  const getDateFromMessage = () => {
    // ...
  };

  // Função para obter a data local formatada
  const getDateLocal = () => {
    // ...
  };

  // Funções para manipular diferentes ações do usuário, como pesquisa de mensagem, informações de contato,
  // seleção de mensagens, notificações silenciosas, limpeza de mensagens e exclusão de sala
  const searchMessage = () => {
    // ...
  };

  const contactInfo = () => {
    // ...
  };

  const selectMessages = () => {
    // ...
  };

  const muteNotifications = () => {
    // ...
  };

  const clearMessages = () => {
    // ...
  };

  const deleteRoom = () => {
    // ...
  };

  // Funções para manipular a abertura e o fechamento do menu suspenso
  const handleMenuClose = () => {
    // ...
  };

  const handleMenuOpen = (event) => {
    // ...
  };

  // Lista de itens do menu suspenso
  const menuChatLists = [
    {
      title: "Contact info",
      onClick: () => contactInfo(),
      id: Math.random() * 100000,
    },
    {
      title: "Select messages",
      onClick: () => selectMessages(),
      id: Math.random() * 100000,
    },
    {
      title: "Mute notifications",
      onClick: () => muteNotifications(),
      id: Math.random() * 100000,
    },
    {
      title: "Clear messages",
      onClick: () => clearMessages(),
      id: Math.random() * 100000,
    },
    {
      title: "Delete Room",
      onClick: () => deleteRoom(),
      id: Math.random() * 100000,
    },
  ];

  // Estrutura JSX para o componente ChatHeader, que inclui elementos como Avatar, botões de ação e componentes Tooltip
  return (
    <div className="chat__header">
      <DrawerRightSearch
      // ...
      />

      <DrawerRightInfo
      // ...
      />

      <Hidden smUp>
        <Link to="/">
          <div className="chat__back_button">
            <IconButton>
              <ArrowBackIcon />
            </IconButton>
          </div>
        </Link>
      </Hidden>

      <Avatar>{roomName[0]}</Avatar>
      <div className="chat__headerInfo">
        <h3>{roomName}</h3>
        <Hidden only={["xs"]}>
          {isLastMessage ? (
            <>
              {showDate ? (
                <p>Last seen {getDateFromMessage()}</p>
              ) : (
                <p>Last seen {getDateLocal()}</p>
              )}
            </>
          ) : null}
        </Hidden>
      </div>

      <div className="chat__headerRight">
        <TooltipCustom
          name="Search"
          icon={<SearchOutlinedIcon />}
          onClick={searchMessage}
        />
        <TooltipCustom
          name="Menu"
          icon={<MoreVertIcon />}
          onClick={handleMenuOpen}
        />
        <DropdownMenu
          menuLists={menuChatLists}
          menu={menuChat}
          handleMenuOpen={handleMenuOpen}
          handleMenuClose={handleMenuClose}
        />
      </div>
    </div>
  );
}

export default ChatHeader;
