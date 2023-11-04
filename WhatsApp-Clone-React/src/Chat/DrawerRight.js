import React from "react";
// Importando componentes do Material-UI
import Drawer from "@material-ui/core/Drawer";
import { makeStyles } from "@material-ui/core/styles";
// Importando estilos personalizados
import "./DrawerRight.css";

// Definindo estilos usando a função makeStyles do Material-UI
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  // Estilizando o papel do drawer (gaveta)
  drawerPaper: {
    [theme.breakpoints.only("xs")]: {
      width: "100vw", // Largura total da tela em dispositivos extra pequenos (xs)
    },
    [theme.breakpoints.up("sm")]: {
      position: "absolute", // Posição absoluta em dispositivos pequenos (sm) e maiores
    },
  },
}));

// Componente funcional DrawerRight
function DrawerRight({ content, drawerRight }) {
  // Obtendo estilos usando a função useStyles
  const classes = useStyles();

  // Renderizando o componente Drawer do Material-UI
  return (
    <div>
      {/* Drawer (gaveta) com âncora à direita, variante persistente (sempre visível),
      estado de abertura baseado na propriedade drawerRight e estilos personalizados
      aplicados usando a classe classes.drawerPaper */}
      <Drawer
        anchor="right" // Âncora à direita
        variant="persistent" // Variante persistente (sempre visível)
        open={drawerRight} // Estado de abertura do drawer
        classes={{ paper: classes.drawerPaper }} // Estilos personalizados para o papel do drawer
      >
        {content} {/* Conteúdo do drawer passado como propriedade */}
      </Drawer>
    </div>
  );
}

export default DrawerRight; // Exportando o componente DrawerRight
