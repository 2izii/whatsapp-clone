// Importa o React e os hooks useEffect e useState do React.
import React, { useEffect, useState } from "react";
// Importa o hook useStateValue de "../StateProvider".
import { useStateValue } from "../StateProvider";
// Importa os componentes DropdownMenu, toastInfo e DialogCustom de seus respectivos arquivos.
import DropdownMenu from "../shared/DropdownMenu";
import { toastInfo } from "../shared/toastInfo";
import DialogCustom from "../shared/DialogCustom";
// Importa componentes do Material-UI.
import Zoom from "@material-ui/core/Zoom";
import Drawer from "@material-ui/core/Drawer";
import Avatar from "@material-ui/core/Avatar";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
// Importa ícones do Material-UI.
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import EditIcon from "@material-ui/icons/Edit";
import CheckIcon from "@material-ui/icons/Check";
// Importa o arquivo de estilo "./DrawerLeft.css".
import "./DrawerLeft.css";

// Define os estilos para o componente usando makeStyles do Material-UI.
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawerPaper: {
    position: "absolute",
  },
}));

// Define o componente DrawerLeft com os parâmetros drawerLeft, setDrawerLeft, db, auth e storage.
function DrawerLeft({ drawerLeft, setDrawerLeft, db, auth, storage }) {
  // Aplica os estilos definidos pela função useStyles() a uma constante chamada classes.
  const classes = useStyles();
  // Usa o hook useStateValue para obter o estado atual do usuário.
  const [{ user }] = useStateValue();
  // Define os estados locais do componente para o nome, descrição, controle de edição, foto do usuário, etc.
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [showEditName, setShowEditName] = useState(false);
  const [showEditAbout, setShowEditAbout] = useState(false);
  const [showProfilePhoto, setShowProfilePhoto] = useState(false);
  const [uploadPhotoLink, setUploadPhotoLink] = useState(null);
  const [showDialogUpload, setShowDialogUpload] = useState(false);
  const [menuProfile, setMenuProfile] = useState(null);
  const [photo, setPhoto] = useState("");

  // Efeito que atualiza o estado local com o nome e a descrição do usuário quando eles mudam.
  useEffect(() => {
    setName(user.displayName);

    // Observa as alterações no documento do usuário no banco de dados e atualiza a foto e a descrição.
    db.collection("users")
      .doc(user.uid)
      .onSnapshot(function (doc) {
        setPhoto(doc.data()?.photoURL);
        setAbout(doc.data()?.about);
      });
  }, [user.uid, user.displayName, db]);

  // Função para atualizar o nome do usuário no banco de dados e no perfil de autenticação do Firebase.
  const updateName = (e) => {
    e.preventDefault();

    if (user.uid) {
      db.collection("users")
        .doc(user.uid)
        .update({
          name: name,
        })
        .then(function () {
          console.log("Document successfully updated!");
        })
        .catch(function (error) {
          console.error("Error updating document: ", error);
        });

      auth.currentUser.updateProfile({
        displayName: name,
      });
    }
    setShowEditName(false);
  };

  // Função para atualizar a descrição do usuário no banco de dados.
  const updateAbout = (e) => {
    e.preventDefault();

    if (user.uid) {
      db.collection("users")
        .doc(user.uid)
        .update({
          about: about,
        })
        .then(function () {
          console.log("Document successfully updated!");
        })
        .catch(function (error) {
          console.error("Error updating document: ", error);
        });
    }
    setShowEditAbout(false);
  };

  // Funções para manipular a exibição dos campos de edição do nome e descrição.
  const editName = () => {
    setShowEditName(true);
  };

  const editAbout = () => {
    setShowEditAbout(true);
  };

  // Função para fechar o drawer e redefinir os estados de edição.
  const handleDrawerClose = () => {
    setDrawerLeft(false);
    setShowEditName(false);
    setShowEditAbout(false);
  };

  // Funções para manipular a exibição da foto do perfil do usuário.
  const viewPhoto = () => {
    // ...
  };

  const viewPhotoClose = () => {
    setShowProfilePhoto(false);
  };

  // Função para manipular a seleção de uma foto do perfil para upload.
  const onFileChangeImage = async (e) => {
    // ...
  };

  // Função para manipular o upload da foto do perfil do usuário.
  const handleUploadPhoto = () => {
    // ...
  };

  // Funções para manipular o menu de perfil do usuário.
  const handleProfileMenu = (event) => {
    // ...
  };

  const handleProfileMenuClose = () => {
    // ...
  };

  // Lista de itens do menu de perfil.
  const menuLists = [
    {
      title: "View Photo",
      onClick: () => viewPhoto(),
      id: Math.random() * 100000,
    },
    // ...
  ];

  // Retorna a estrutura do componente DrawerLeft com base nos estados e ações definidos acima.
  return (
    <div>
      <Drawer
        anchor="left"
        variant="persistent"
        open={drawerLeft}
        classes={{ paper: classes.drawerPaper }}
      >
        {/* ... */}
      </Drawer>
    </div>
  );
}

// Exporta o componente DrawerLeft.
export default DrawerLeft;
