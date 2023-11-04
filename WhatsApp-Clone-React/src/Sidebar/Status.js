// Importa o módulo 'React' do pacote 'react' para criar componentes React.
import React from "react";

// Importa o componente 'TooltipCustom' do arquivo '../shared/TooltipCustom'.
import TooltipCustom from "../shared/TooltipCustom";

// Importa o ícone 'DonutLargeIcon' do pacote '@material-ui/icons'.
import DonutLargeIcon from "@material-ui/icons/DonutLarge";

// Declaração de uma função de componente chamada 'Status'.
function Status() {
  // Retorna um elemento 'div' contendo o componente 'TooltipCustom'.
  // O componente 'TooltipCustom' recebe duas propriedades: 'name' e 'icon'.
  // 'name' é definido como a string "Status" e 'icon' é um componente 'DonutLargeIcon'.
  return (
    <div>
      <TooltipCustom name="Status" icon={<DonutLargeIcon />} />
    </div>
  );
}

// Exporta a função de componente 'Status' como o componente padrão deste arquivo.
export default Status;
