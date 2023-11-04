import React from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

function DropdownMenu({ menuLists, menu, handleMenuClose }) {
  // Define uma função de componente chamada DropdownMenu que recebe três propriedades: menuLists, menu e handleMenuClose.

  return (
    <div>
      {/* Renderiza um componente de menu. */}
      <Menu
        id="simple-menu"
        anchorEl={menu} // Define o elemento âncora para o menu, indicando onde ele deve ser exibido na interface.
        keepMounted // Mantém o menu montado mesmo quando não está aberto.
        open={Boolean(menu)} // Determina se o menu deve estar aberto ou fechado com base na verdade ou falsidade da propriedade `menu`.
        onClose={handleMenuClose} // Chama a função `handleMenuClose` quando o menu é fechado.
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }} // Define a origem do menu em relação ao seu âncora (parte inferior à direita).
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }} // Define a origem da transformação do menu (parte superior à direita).
        getContentAnchorEl={null} // Define o elemento âncora para o conteúdo do menu.
      >
        {/* Mapeia a lista de itens do menu e cria um MenuItem para cada item. */}
        {menuLists.map((menuList) => (
          <MenuItem key={menuList.id} onClick={menuList.onClick}>
            {menuList.title} {/* Exibe o título do item do menu. */}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}

export default DropdownMenu;
