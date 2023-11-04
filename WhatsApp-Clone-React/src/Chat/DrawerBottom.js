import React, { useState } from "react";
// Importando hooks do React e componentes necessários

import { useParams } from "react-router-dom";
// Importando o hook useParams do react-router-dom para acessar parâmetros da URL

import { useStateValue } from "../StateProvider";
// Importando o hook useStateValue do componente StateProvider

import ReactPlayer from "react-player";
// Importando o componente ReactPlayer para reproduzir vídeos

// Importando componentes do Material-UI
import Fab from "@material-ui/core/Fab";
import IconButton from "@material-ui/core/IconButton";
import Drawer from "@material-ui/core/Drawer";
import { makeStyles } from "@material-ui/core/styles";

// Importando ícones do Material-UI
import CloseIcon from "@material-ui/icons/Close";
import SendIcon from "@material-ui/icons/Send";

// Importando estilos CSS
import "./DrawerBottom.css";

// Definindo estilos usando o hook makeStyles do Material-UI
const useStyles = makeStyles((theme) => {
  // Definindo estilos de acordo com diferentes breakpoints
  return {
    root: {
      display: "flex",
    },
    drawerPaper: {
      position: "absolute",
      width: "100%",
      // Definindo larguras responsivas com base em diferentes breakpoints
    },
    paperAnchorBottom: {
      left: "auto",
      right: 0,
      bottom: 0,
      maxHeight: "100%",
      // Definindo posições e alturas responsivas com base em diferentes breakpoints
    },
  };
});

// Definindo o componente DrawerBottom
function DrawerBottom({
  drawerBottom,
  setDrawerBottom,
  fileImageUrl,
  fileVideoUrl,
  setFileVideoUrl,
  setFileImageUrl,
  firebase,
  db,
  storage,
}) {
  // Usando os estilos definidos
  const classes = useStyles();

  // Obtendo o usuário do estado global usando o hook useStateValue
  const [{ user }] = useStateValue();

  // Definindo estado local para a legenda e o ID da sala
  const [caption, setCaption] = useState("");
  const { roomId } = useParams();

  // Função para lidar com o upload de imagens e vídeos
  const handleUpload = (e) => {
    e.preventDefault();
    // Verificando se há uma imagem a ser enviada
    if (fileImageUrl) {
      // Adicionando a mensagem com a foto ao banco de dados
      db.collection("rooms")
        .doc(roomId)
        .collection("messages")
        .add({
          photo: fileImageUrl,
          name: user.displayName,
          uid: user.uid,
          caption: caption,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })
        .then(function (docRef) {
          // Atualizando o ID do documento no banco de dados
          db.collection("rooms")
            .doc(roomId)
            .collection("messages")
            .doc(docRef.id)
            .set(
              {
                id: docRef.id,
              },
              { merge: true }
            );
        })
        .catch(function (error) {
          // Lidando com erros ao adicionar documentos
          console.error("Error adding document: ", error);
        });
      // Resetando o URL da imagem após o upload
      setFileImageUrl(null);
    }
    // Verificando se há um vídeo a ser enviado
    if (fileVideoUrl) {
      // Adicionando a mensagem com o vídeo ao banco de dados
      db.collection("rooms")
        .doc(roomId)
        .collection("messages")
        .add({
          video: fileVideoUrl,
          name: user.displayName,
          uid: user.uid,
          caption: caption,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })
        .then(function (docRef) {
          // Atualizando o ID do documento no banco de dados
          db.collection("rooms")
            .doc(roomId)
            .collection("messages")
            .doc(docRef.id)
            .set(
              {
                id: docRef.id,
              },
              { merge: true }
            );
        })
        .catch(function (error) {
          // Lidando com erros ao adicionar documentos
          console.error("Error adding document: ", error);
        });
      // Resetando o URL do vídeo após o upload
      setFileVideoUrl(null);
    }
    // Resetando a legenda e fechando o DrawerBottom
    setCaption("");
    setDrawerBottom(false);
  };

  // Função para fechar o DrawerBottom
  const handleDrawerClose = () => {
    setDrawerBottom(false);
  };

  // Retornando o JSX do DrawerBottom
  return (
    <div>
      {/* Drawer para upload de imagens e vídeos */}
      <Drawer
        variant="persistent"
        anchor="bottom"
        open={drawerBottom}
        classes={{
          paper: classes.drawerPaper,
          paperAnchorBottom: classes.paperAnchorBottom,
        }}
      >
        {/* Cabeçalho do DrawerBottom */}
        <div className="drawerBottom__header">
          <div className="drawerBottom__header_container">
            {/* Botão para fechar o DrawerBottom */}
            <IconButton onClick={handleDrawerClose}>
              <CloseIcon />
            </IconButton>
            <p>Preview</p>
          </div>
        </div>

        {/* Conteúdo do DrawerBottom */}
        <div className="drawerBottom__content">
          {/* Se houver uma imagem, exibe a imagem */}
          <div className="drawerBottom__content_photo">
            {fileImageUrl ? (
              <img src={fileImageUrl} alt="" />
            ) : (
              /* Se houver um vídeo, exibe o vídeo usando o componente ReactPlayer */
              <div className="drawerBottom__content_video">
                <div className="player-wrapper">
                  <ReactPlayer
                    className="react-player"
                    width="100%"
                    height="50%"
                    url={fileVideoUrl}
                    controls={true}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Entrada para a legenda e botão de envio */}
          <div className="drawerBottom__content_caption">
            <input
              type="text"
              placeholder="Add a caption..."
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
            />
            {/* Botão de envio */}
            <Fab
              color="primary"
              aria-label="send"
              size="large"
              onClick={handleUpload}
            >
              <div className="chat__icon">
                <SendIcon />
              </div>
            </Fab>
          </div>
        </div>

        {/* Rodapé do DrawerBottom */}
        <div className="drawerBottom__footer">
          {/* Se houver uma imagem, exibe a imagem novamente */}
          <div>{fileImageUrl ? <img src={fileImageUrl} alt="" /> : null}</div>
        </div>
      </Drawer>
    </div>
  );
}

// Exportando o componente DrawerBottom
export default DrawerBottom;
