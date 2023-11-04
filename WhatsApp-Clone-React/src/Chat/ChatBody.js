import React, { useEffect, useRef, useState } from "react"; // Importa as bibliotecas e hooks necessários do React
import ReactPlayer from "react-player"; // Importa o componente ReactPlayer para reproduzir vídeos
import DrawerRightInfo from "./DrawerRightInfo"; // Importa o componente DrawerRightInfo
import NoEncryptionIcon from "@material-ui/icons/NoEncryption"; // Importa o ícone NoEncryption do Material-UI
import AlarmIcon from "@material-ui/icons/Alarm"; // Importa o ícone Alarm do Material-UI
import DoneIcon from "@material-ui/icons/Done"; // Importa o ícone Done do Material-UI
import "./ChatBody.css"; // Importa os estilos CSS do arquivo ChatBody.css

// Define o componente funcional ChatBody que recebe várias propriedades como argumentos
function ChatBody({
  roomOwner,
  roomCreatedBy,
  messages,
  user,
  roomId,
  isRoomExist,
}) {
  const messagesEndRef = useRef(null); // Cria uma referência para o elemento DOM usado para rolar para a parte inferior do chat
  const [playing, setPlaying] = useState(false); // Define um estado para controlar se o vídeo está sendo reproduzido

  // Efeito colateral que é executado quando a propriedade isRoomExist é alterada
  useEffect(() => {
    // Escuta quando a sala é alterada e define playing como false
    if (isRoomExist >= 0) {
      setPlaying(false);
    }
  }, [isRoomExist]);

  // Função para reproduzir o vídeo
  const handlePlay = () => {
    setPlaying(true);
  };

  // Função para pausar o vídeo
  const handlePause = () => {
    setPlaying(false);
  };

  // Função para rolar para a parte inferior do chat
  const scrollToBottom = () => {
    if (roomId) {
      messagesEndRef.current.scrollIntoView({ behavior: "auto" });
    }
  };

  // Efeito colateral que chama a função scrollToBottom sempre que as mensagens são atualizadas
  useEffect(scrollToBottom, [messages]);

  // Retorna a estrutura do componente com base nas mensagens recebidas
  return (
    <div>
      {/* Exibe um lembrete de que este é um clone do WhatsApp e as mensagens não são criptografadas */}
      <p className="chat__message_reminder">
        <NoEncryptionIcon /> This is a WhatsApp clone. Messages are not encrypted.
      </p>
      {/* Exibe um lembrete indicando quem criou o grupo */}
      <p className="chat__message_reminder chat__createdBy">
        {roomOwner === user.uid
          ? "You created this group"
          : `${roomCreatedBy} created this group`}
      </p>

      {/* Mapeia as mensagens e renderiza cada mensagem */}
      {messages.map((message) => (
        <div
          key={message.id}
          className={`chat__message 
                    ${message.uid === user.uid && "chat__sender"} 
                    ${message.photo && "chat__message_media_image"}
                    ${message.video && "chat__message_media_video"}
                    ${
                      message.video &&
                      !message.caption &&
                      "chat__message_media_video_noCaption"
                    } `}
        >
          {/* Exibe o nome do remetente da mensagem */}
          <span
            className={`chat__name ${
              message.uid === user.uid && "chat__name_sender"
            }`}
          >
            {message.name}
          </span>

          {/* Exibe a imagem da mensagem se existir */}
          <div className="chat__body_image_container">
            {message.photo ? (
              <>
                <img
                  alt=""
                  className="chat__body_image"
                  src={message.photo}
                  // onClick={handleDialogOpen}
                />

                {/* <DialogCustom 
                                    open={showDialog}
                                    close={handleDialogClose}
                                    photo={message.photo}
                                    user={user}
                                /> */}
              </>
            ) : null}
          </div>

          {/* Exibe o vídeo da mensagem se existir */}
          <div className="chat__body_video_container">
            {message.video ? (
              <>
                <div className="player-wrapper">
                  {/* Usa o componente ReactPlayer para reproduzir o vídeo */}
                  <ReactPlayer
                    className="react-player"
                    width="100%"
                    height="100%"
                    url={message.video}
                    controls={true}
                    onPlay={handlePlay}
                    onPause={handlePause}
                    onEnded={handlePause}
                  />
                </div>
              </>
            ) : null}
          </div>

          {/* Exibe o texto da mensagem, a legenda (se existir) e o URL (se existir) */}
          <div className="chat__message_box">
            <div
              className={`chat__message_box_text ${
                message.uid === user.uid && "chat__message_box_text_sender"
              }
              ${
                message.photo &&
                !message.caption &&
                "chat__message_box_text_no_caption"
              } `}
            >
              {message.message ? message.message : null}
              {message.caption ? message.caption : null}
              {message.url ? (
                <a
                  target="_blank"
                  href={`${message.url}`}
                  rel="noopener noreferrer"
                >
                  {message.url}
                </a>
              ) : null}

              {/* Exibe o carimbo de data/hora da mensagem */}
              <div
                className={`chat__timestamp_container ${
                  message.uid === user.uid && "chat__timestamp_container_sender"
                }`}
              >
                {message.timestamp ? (
                  <div
                    className={`chat__timestamp 
                                    ${
                                      message.photo &&
                                      !message.caption &&
                                      "chat__timestamp_media_photo"
                                    }  
                                    ${
                                      message.video &&
                                      !message.caption &&
                                      "chat__timestamp_media_video"
                                    }
                                    ${
                                      message.video &&
                                      !message.caption &&
                                      playing === true &&
                                      "chat__timestamp_media_displayNone"
                                    }`}
                  >
                    <span>
                      {new Date(message.timestamp.toDate()).toLocaleTimeString(
                        "en-US",
                        {
                          hour: "numeric",
                          hour12: true,
                          minute: "numeric",
                        }
                      )}
                      {message.uid === user.uid ? <DoneIcon /> : null}
                    </span>
                  </div>
                ) : (
                  <div className="chat__timestamp">
                    <span>
                      {new Date().toLocaleTimeString("en-US", {
                        hour: "numeric",
                        hour12: true,
                        minute: "numeric",
                      })}
                      {message.uid === user.uid ? <AlarmIcon /> : null}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
      {/* Elemento vazio usado para rolar para a parte inferior do chat */}
      <div ref={messagesEndRef} />
    </div>
  );
}

export default ChatBody; // Exporta o componente ChatBody para uso em outros arquivos
