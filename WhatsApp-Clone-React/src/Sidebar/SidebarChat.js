// Importa os módulos 'React', 'useEffect' e 'useState' do pacote 'react' para criar componentes React e utilizar Hooks.
import React, { useEffect, useState } from "react";

// Importa o componente 'Link' do pacote 'react-router-dom' para criar links de navegação.
import { Link } from "react-router-dom";

// Importa o componente 'Avatar' do Material-UI para exibir avatares.
import Avatar from "@material-ui/core/Avatar";

// Importa os ícones 'PhotoCameraIcon' e 'VideocamIcon' do Material-UI para exibir ícones de câmera e vídeo.
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
import VideocamIcon from "@material-ui/icons/Videocam";

// Importa a instância do banco de dados 'db' do arquivo '../firebase'.
import db from "../firebase";

// Importa o estilo CSS do arquivo './SidebarChat.css'.
import "./SidebarChat.css";

// Declaração de uma função de componente chamada 'SidebarChat' que recebe duas propriedades: 'id' e 'name'.
function SidebarChat({ id, name }) {
  // Utiliza o Hook 'useState' para criar um estado 'messages' com um array vazio como valor inicial.
  const [messages, setMessages] = useState([]);

  // Utiliza o Hook 'useEffect' para executar um efeito quando 'id' é alterado.
  useEffect(() => {
    // Verifica se 'id' está presente.
    if (id) {
      // Obtém as mensagens da coleção "messages" ordenadas por timestamp em ordem decrescente e atualiza o estado 'messages'.
      db.collection("rooms")
        .doc(id)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [id]); // O efeito é reexecutado sempre que 'id' muda.

  // Retorna um componente 'Link' que redireciona para a rota correspondente ao ID da sala.
  // Dentro do link, há um componente 'div' com a classe 'sidebarChat'.
  return (
    <Link to={`/rooms/${id}`} className="sidebarChat__link">
      <div className="sidebarChat">
        {/* Renderiza um componente 'Avatar' com a primeira letra do nome da sala como conteúdo. */}
        <Avatar>{name[0]}</Avatar>
        {/* Renderiza um componente 'div' com a classe 'sidebarChat__info'. */}
        <div className="sidebarChat__info">
          {/* Renderiza o nome da sala. */}
          <h2>{name}</h2>
          {/* Verifica se a primeira mensagem na sala é uma foto e exibe um ícone de câmera com o texto "Photo". */}
          {messages[0]?.photo ? (
            <div className="sideChat__photo">
              <PhotoCameraIcon /> <span>Photo</span>
            </div>
          ) : null}
          {/* Verifica se a primeira mensagem na sala é um vídeo e exibe um ícone de videocâmera com o texto "Video". */}
          {messages[0]?.video ? (
            <div className="sideChat__photo">
              <VideocamIcon /> <span>Video</span>
            </div>
          ) : null}
          {/* Renderiza o conteúdo da primeira mensagem de texto na sala. */}
          <p>{messages[0]?.message}</p>
          {/* Renderiza a URL da primeira mensagem na sala. */}
          <p>{messages[0]?.url}</p>
        </div>
      </div>
    </Link>
  );
}

// Exporta a função de componente 'SidebarChat' como o componente padrão deste arquivo.
export default SidebarChat;

