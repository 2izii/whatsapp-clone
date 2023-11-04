// Importa a biblioteca React para criar componentes React.
import React from "react";
// Importa o componente Tooltip do Material-UI para criar dicas de ferramentas interativas.
import Tooltip from "@material-ui/core/Tooltip";
// Importa o componente IconButton do Material-UI para criar um botão com ícone.
import IconButton from "@material-ui/core/IconButton";

// Define um componente chamado TooltipCustom com três propriedades: name, icon e onClick.
function TooltipCustom({ name, icon, onClick }) {
  // Retorna a estrutura do componente TooltipCustom.
  return (
    <div>
      {/* Cria um componente Tooltip com o título definido pela propriedade name. */}
      <Tooltip
        title={
          <span style={{ fontSize: "14px", padding: "8px 5px 8px 5px" }}>
            {name}
          </span>
        }
        // Define a posição da dica de ferramenta como "bottom-end".
        placement="bottom-end"
      >
        {/* Cria um botão com ícone (IconButton) que chama a função onClick quando clicado. */}
        <IconButton onClick={onClick}>{icon}</IconButton>
      </Tooltip>
    </div>
  );
}

// Exporta o componente TooltipCustom para ser utilizado em outras partes da aplicação.
export default TooltipCustom;
