// Importa os módulos necessários do pacote 'react' para criar componentes e utilizar Hooks.
import React, { useState, useEffect } from "react";

// Importa os módulos necessários do pacote 'react-router-dom' para manipulação de roteamento.
import { useHistory, useParams } from "react-router-dom";

// Importa o contexto do estado global do aplicativo usando o hook 'useStateValue' do '../StateProvider'.
import { useStateValue } from "../StateProvider";

// Importa os módulos necessários do Firebase para autenticação, armazenamento e banco de dados.
import db, { auth, storage, firebase } from "../firebase";

// Importa os componentes necessários do aplicativo.
import UserAvatar from "./UserAvatar";
import NewChat from "./NewChat";
import Status from "./Status";
import DropdownMenu from "../shared/DropdownMenu";
import DrawerLeft from "./DrawerLeft";
import SearchBar from "../shared/SearchBar";
import SidebarChat from "./SidebarChat";
import { toastInfo } from "../shared/toastInfo";
import TooltipCustom from "../shared/TooltipCustom";

// Importa componentes de interface do Material-UI.
import CircularProgress from "@material-ui/core/CircularProgress";
import MoreVertIcon from "@material-ui/icons/MoreVert";

// Importa o arquivo de estilos para o componente Sidebar.
import "./Sidebar.css";

// Declaração do componente funcional 'Sidebar' que recebe as propriedades 'rooms', 'setIsRoomExist' e 'isRoomExist'.
function Sidebar({ rooms, setIsRoomExist, isRoomExist }) {
  // Obtém a instância do objeto de histórico de navegação do pacote 'react-router-dom'.
  const history = useHistory();
  
  // Obtém o ID da sala da URL usando o hook 'useParams' do pacote 'react-router-dom'.
  const { roomId } = useParams();
  
  // Obtém o estado global do usuário atual usando o hook 'useStateValue'.
  const [{ user }] = useStateValue();
  
  // Define os estados locais do componente usando o Hook 'useState'.
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [noRooms, setNoRooms] = useState(false);
  const [drawerLeft, setDrawerLeft] = useState(false);
  const [menuSidebar, setMenuSidebar] = useState(null);
  const [isSearchFound, setIsSetSearchFound] = useState(false);

  // Função para filtrar as salas com base na pesquisa de usuário.
  const findRoom = function (myRooms) {
    return function (x) {
      var searchRoom = x.data.name + "";
      return (
        searchRoom.toLowerCase().includes(myRooms.toLowerCase()) || !myRooms
      );
    };
  };

  // Efeito que executa quando as dependências 'search', 'rooms', 'roomId', 'history' e 'setIsRoomExist' mudam.
  useEffect(() => {
    // Função para renderizar o resultado da pesquisa no componente SidebarChat.
    const roomResult = () => {
      return (
        <>
          {rooms.filter(findRoom(search)).map((room) => (
            <SidebarChat
              key={room.id}
              id={room.id}
              name={room.data.name}
            />
          ))}
        </>
      );
    };

    // Verifica se há uma pesquisa ativa.
    if (search) {
      var result = roomResult();
      if (result.props.children.length > 0) {
        setIsSetSearchFound(true);
      } else {
        setIsSetSearchFound(false);
      }
    }

    // Verifica se a sala atual (roomId) existe na lista de salas (rooms).
    if (rooms) {
      if (rooms.length > 0) {
        setNoRooms(false);
        setLoading(true);
      } else if (rooms.length === 0 && isRoomExist === -1) {
        setNoRooms(true);
        setLoading(true);
      }
    }
  }, [search, rooms, roomId, history, setIsRoomExist]);

  // Efeito que executa quando o estado 'rooms' muda.
  useEffect(() => {
    // Verifica se há salas disponíveis para mostrar ou se o usuário ainda está aguardando o carregamento das salas.
    if (rooms) {
      if (rooms.length > 0) {
        setNoRooms(false);
        setLoading(true);
      } else if (rooms.length === 0 && isRoomExist === -1) {
        setNoRooms(true);
        setLoading(true);
      }
    }
  }, [rooms]);

  // Função para abrir o menu lateral esquerdo.
  const handleDrawerLeftOpen = () => {
    setMenuSidebar(null);
    setDrawerLeft(true);
  };

  // Função para abrir o menu de contexto ao clicar no ícone de três pontos verticais.
  const handleMenuOpen = (event) => {
    setMenuSidebar(event.currentTarget);
  };

  // Função para fechar o menu de contexto.
  const handleMenuClose = () => {
    setMenuSidebar(null);
  };

  // Função chamada quando o usuário tenta arquivar uma sala (ainda não implementado).
  const archive = () => {
    const archive = "archive";
    toastInfo("Archive is not yet available!", archive, "top-center");
  };

  // Função chamada quando o usuário tenta marcar uma sala como favorita (ainda não implementado).
  const starred = () => {
    const starred = "starred";
    toastInfo("Starred is not yet available!", starred, "top-center");
  };

  // Função chamada quando o usuário tenta acessar as configurações (ainda não implementado).
  const settings = () => {
    const settings = "settings";
    toastInfo("Settings is not yet available!", settings, "top-center");
  };

  // Função para lidar com o logout do usuário.
  const logout = () => {
    if (user.isAnonymous === true) {
      // Deleta a conta do usuário anônimo e redireciona para a tela inicial.
      auth.currentUser
        .delete()
        .then(function () {
          history.push("/");
        })
        .catch(function (error) {
          // Ocorreu um erro ao excluir a conta do usuário anônimo.
          console.log("error deleting anonymous user", error);
        });
    } else {
      // Desloga o usuário autenticado e redireciona para a tela inicial.
      auth.signOut();
    }
  };

  // Lista de itens no menu de contexto.
  const menuLists = [
    {
      title: "Profile",
      onClick: () => handleDrawerLeftOpen(),
      id: Math.random() * 100000,
    },
    {
      title: "Archived",
      onClick: () => archive(),
      id: Math.random() * 100000,
    },
    {
      title: "Starred",
      onClick: () => starred(),
      id: Math.random() * 100000,
    },
    {
      title: "Settings",
      onClick: () => settings(),
      id: Math.random() * 100000,
    },
    {
      title: "Logout",
      onClick: () => logout(),
      id: Math.random() * 100000,
    },
  ];

  // Estrutura JSX do componente Sidebar que exibe a barra lateral do aplicativo.
  return (
    <div className="sidebar">
      <div className="sidebar__header">
        {/* Componente de avatar do usuário que abre o menu de perfil ao clicar. */}
        <UserAvatar
          id="UserProfile"
          photoURL={user.photoURL}
          onClick={() => handleDrawerLeftOpen()}
        />
        
        {/* Componente de menu lateral esquerdo. */}
        <DrawerLeft
          drawerLeft={drawerLeft}
          setDrawerLeft={setDrawerLeft}
          db={db}
          auth={auth}
          storage={storage}
        />

        {/* Componentes de status do usuário, novo chat e menu de contexto. */}
        <div className="sidebar__headerRight">
          <Status />
          <NewChat db={db} user={user} firebase={firebase} />
          <TooltipCustom
            name="Menu"
            icon={<MoreVertIcon />}
            onClick={handleMenuOpen}
          />
          <DropdownMenu
            menuLists={menuLists}
            menu={menuSidebar}
            handleMenuOpen={handleMenuOpen}
            handleMenuClose={handleMenuClose}
          />
        </div>
      </div>

      {/* Componente de barra de pesquisa que permite ao usuário pesquisar salas. */}
      <SearchBar
        search={search}
        setSearch={setSearch}
        placeholder="Search or start new chat"
      />

      {/* Lista de salas de chat renderizadas com base na pesquisa e no estado de carregamento. */}
      <div className="sidebar__chats">
        {loading ? (
          <>
            {search ? (
              <>
                {isSearchFound ? (
                  <div>
                    {rooms.filter(findRoom(search)).map((room) => (
                      <SidebarChat
                        key={room.id}
                        id={room.id}
                        name={room.data.name}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="sidebar__chatsContainer_empty">
                    <span>No chat room found</span>
                  </div>
                )}
              </>
            ) : (
              <>
                {rooms.map((room) => (
                  <SidebarChat
                    key={room.id}
                    id={room.id}
                    name={room.data.name}
                  />
                ))}
              </>
            )}
          </>
        ) : (
          <div className="sidebar__chatsContainer_loading">
            <div>
              {/* Exibe um indicador de progresso (spinner) durante o carregamento. */}
              <CircularProgress />
            </div>
          </div>
        )}

        {/* Exibe uma mensagem quando não há salas de chat disponíveis. */}
        {noRooms && loading ? (
          <div className="sidebar__chatsContainer_empty">
            <span>No chats</span>
          </div>
        ) : null}
      </div>
    </div>
  );
}

// Exporta o componente Sidebar como o componente padrão deste arquivo.
export default Sidebar;
