import React from "react";
// import ReactPlayer from 'react-player';
// Importa componentes do Material-UI necessários para criar o diálogo.
import Zoom from "@material-ui/core/Zoom";
import Avatar from "@material-ui/core/Avatar";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
// Importa ícone de fechar do Material-UI.
import CloseIcon from "@material-ui/icons/Close";
// Importa o arquivo de estilos CSS associado a este componente.
import "./DialogCustom.css";

/**
 * Função de componente DialogCustom.
 * @param {Object} props - Propriedades passadas para o componente.
 * @param {boolean} props.open - Indica se o diálogo deve estar aberto ou fechado.
 * @param {Function} props.close - Função a ser chamada quando o diálogo é fechado.
 * @param {Object} props.user - Objeto contendo informações do usuário, incluindo a URL da foto do perfil.
 * @param {string} props.photo - URL da foto que será exibida no diálogo.
 */
function DialogCustom({ open, close, user, photo }) {
  return (
    // Renderiza um diálogo do Material-UI com base nas propriedades fornecidas.
    <Dialog
      open={open} // Define se o diálogo deve estar aberto ou fechado.
      fullScreen // Indica que o diálogo deve ocupar a tela inteira.
      onClose={close} // Chama a função `close` quando o diálogo é fechado.
      aria-labelledby="alert-dialog-title" // Define o ID do elemento que descreve o título do diálogo para acessibilidade.
      aria-describedby="alert-dialog-description" // Define o ID do elemento que descreve o conteúdo do diálogo para acessibilidade.
    >
      {/* Título do diálogo contendo o avatar do usuário e um ícone de fechar. */}
      <DialogTitle id="alert-dialog-title-dialogCustom">
        {/* Seção para exibir o avatar do usuário. */}
        <div>
          <Avatar src={user.photoURL} />
        </div>
        {/* Seção para exibir o ícone de fechar o diálogo. */}
        <div>
          {/* Ícone de fechar que, quando clicado, chama a função `close`. */}
          <IconButton edge="end" color="inherit" onClick={close} aria-label="close">
            <CloseIcon />
          </IconButton>
        </div>
      </DialogTitle>
      {/* Conteúdo do diálogo contendo a foto a ser exibida. */}
      <DialogContent>
        {/* Efeito de zoom na foto quando o diálogo é aberto. */}
        <Zoom in={open} style={{ transitionDelay: open ? "300ms" : "0ms" }}>
          {/* Exibe a foto passada como propriedade com a classe de estilo "DialogCustom__photo". */}
          <img src={photo} alt="" className="DialogCustom__photo" />
        </Zoom>
      </DialogContent>
    </Dialog>
  );
}

export default DialogCustom; // Exporta o componente `DialogCustom`.
