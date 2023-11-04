// Importa o módulo 'React' do pacote 'react' para criar componentes React.
import React from "react";

// Importa o componente 'Avatar' do pacote '@material-ui/core' para ser utilizado neste arquivo.
import Avatar from "@material-ui/core/Avatar";

// Declaração de uma função de componente chamada 'UserAvatar' que aceita propriedades 'photoURL' e 'onClick'.
function UserAvatar({ photoURL, onClick }) {
  // Retorna um elemento 'div' com a propriedade 'cursor' configurada como 'pointer'.
  return (
    <div style={{ cursor: "pointer" }}>
      {/* Renderiza o componente 'Avatar' com a propriedade 'src' definida como 'photoURL' e o manipulador de eventos 'onClick' passado como propriedade. */}
      <Avatar src={photoURL} onClick={onClick} />
    </div>
  );
}

// Exporta a função de componente 'UserAvatar' como o componente padrão deste arquivo.
export default UserAvatar;

