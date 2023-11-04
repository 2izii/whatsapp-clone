import React from "react"; // Importando o módulo React do pacote react
import LaptopIcon from "@material-ui/icons/Laptop"; // Importando o ícone Laptop do Material-UI
import Divider from "@material-ui/core/Divider"; // Importando o componente Divider do Material-UI
import whatsAppConnected from "../images/whatsapp-connect.jpg"; // Importando uma imagem do arquivo de imagens
import "./ChatLandingScreen.css"; // Importando um arquivo de estilo CSS específico para este componente
import Zoom from "@material-ui/core/Zoom"; // Importando o componente Zoom do Material-UI

function ChatLandingScreen({ showLandingScreenPhoto }) {
  // Definindo um componente de função chamado ChatLandingScreen, recebendo uma prop showLandingScreenPhoto
  return (
    <div className="chat-landing-screen"> 
      {/* Início do contêiner principal com a classe CSS chat-landing-screen */}
      <div>
        <Zoom
          in={showLandingScreenPhoto}
          style={{ transitionDelay: showLandingScreenPhoto ? "300ms" : "0ms" }}
        >
          {/* Componente Zoom usado para animação de entrada da imagem */}
          <img
            className="chat-landing-screen__photo" // Classe CSS para a imagem
            src={whatsAppConnected} // Fonte da imagem
            alt="whatsAppConnected" // Texto alternativo para a imagem
          />
        </Zoom>
      </div>

      <div className="chat-landing-screen__title">
        {/* Título do componente */}
        <p>Keep your phone connected</p>
      </div>

      <div>
        {/* Parágrafo de instruções */}
        <p>
          WhatsApp connects to your phone to sync messages. To reduce data
          usage, connect to your phone to Wi-Fi.
        </p>
      </div>

      <Divider /> {/* Componente Divider usado para criar uma linha divisória */}

      <div className="chat-landing-screen__footer">
        {/* Rodapé do componente */}
        <LaptopIcon /> {/* Ícone de laptop */}
        <p>WhatsApp is available for Windows.</p> {/* Mensagem de texto */}
        <a
          target="_blank"
          href="https://www.whatsapp.com/download"
          rel="noopener noreferrer"
        >
          Get it here. {/* Link para baixar o WhatsApp */}
        </a>
      </div>
    </div>
  );
}

export default ChatLandingScreen; // Exportando o componente ChatLandingScreen
