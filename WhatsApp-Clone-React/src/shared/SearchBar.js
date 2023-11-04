// Importa os módulos React e useState do pacote "react".
import React, { useState } from "react";
// Importa os ícones de SearchOutlinedIcon e ArrowForwardIcon do Material-UI.
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
// Importa o arquivo de estilos "SearchBar.css".
import "./SearchBar.css";

// Define um componente funcional chamado SearchBar que recebe as propriedades 'placeholder', 'setSearch' e 'search'.
function SearchBar({ placeholder, setSearch, search }) {
  // Define um estado local 'showArrowIcon' e uma função 'setShowArrowIcon' para controlar a exibição do ícone de seta.
  const [showArrowIcon, setShowArrowIcon] = useState(false);

  // Define a função 'displaySearchIcon' para ocultar o ícone de seta.
  const displaySearchIcon = () => {
    setShowArrowIcon(false);
  };

  // Define a função 'displayArrowIcon' para exibir o ícone de seta.
  const displayArrowIcon = () => {
    setShowArrowIcon(true);
  };

  // Retorna um elemento div com uma classe condicional com base no estado de 'showArrowIcon'.
  return (
    <div
      className={`search ${showArrowIcon === true && "search__bgColorChange"}`}
    >
      {/* Cria um elemento div com uma classe "search__container". */}
      <div className="search__container">
        {/* Cria um elemento span com uma classe condicional baseada em 'showArrowIcon'. */}
        <span className={`${showArrowIcon === true ? "arroww" : ""}`}>
          {/* Renderiza o ícone de seta ou o ícone de pesquisa com base em 'showArrowIcon'. */}
          {showArrowIcon ? <ArrowForwardIcon /> : <SearchOutlinedIcon />}
        </span>
        {/* Cria um input controlado que atualiza o estado 'search' ao ser alterado. */}
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          placeholder={placeholder}
          required
          // Define manipuladores de eventos para controlar o foco e desfoque do input.
          onFocus={displayArrowIcon}
          onBlur={displaySearchIcon}
        />
      </div>
    </div>
  );
}

// Exporta o componente SearchBar para ser utilizado em outros arquivos.
export default SearchBar;
