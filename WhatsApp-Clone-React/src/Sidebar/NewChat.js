import React, { useState } from "react";
import TooltipCustom from "../shared/TooltipCustom"; // Importa o componente de dica de ferramenta personalizada.
// import db from '../firebase'; // Importa a instância do banco de dados Firebase (comentado neste exemplo).
import Button from "@material-ui/core/Button"; // Importa o componente de botão do Material-UI.
import TextField from "@material-ui/core/TextField"; // Importa o componente de campo de texto do Material-UI.
import Dialog from "@material-ui/core/Dialog"; // Importa o componente de diálogo do Material-UI.
import DialogActions from "@material-ui/core/DialogActions"; // Importa o componente de ações do diálogo do Material-UI.
import DialogContent from "@material-ui/core/DialogContent"; // Importa o componente de conteúdo do diálogo do Material-UI.
import DialogTitle from "@material-ui/core/DialogTitle"; // Importa o componente de título do diálogo do Material-UI.
import ChatIcon from "@material-ui/icons/Chat"; // Importa o ícone de chat do Material-UI.

// Componente de criação de nova sala de chat.
function NewChat({ user, db, firebase }) {
  // Estados locais para o nome da sala e o estado do diálogo.
  const [roomName, setRoomName] = useState(""); // Armazena o nome da sala digitado pelo usuário.
  const [open, setOpen] = useState(false); // Determina se o diálogo está aberto ou fechado.

  // Função para abrir o diálogo de nova sala de chat.
  const handleNewChatOpen = () => {
    setOpen(true);
  };

  // Função para fechar o diálogo de nova sala de chat.
  const handleNewChatClose = () => {
    setOpen(false);
    setRoomName(""); // Limpa o nome da sala quando o diálogo é fechado.
  };

  // Função para criar uma nova sala de chat.
  const createChat = (e) => {
    e.preventDefault(); // Previne o comportamento padrão do formulário.

    // Verifica se o nome da sala não está vazio.
    if (roomName) {
      // Adiciona uma nova sala de chat ao banco de dados Firebase.
      db.collection("rooms")
        .add({
          roomOwner: user.uid, // ID do proprietário da sala (usuário atual).
          createdBy: user.displayName, // Nome do usuário que criou a sala.
          name: roomName, // Nome da sala de chat.
          timestamp: firebase.firestore.FieldValue.serverTimestamp(), // Marca de data/hora da criação da sala.
        })
        .then(function (docRef) {
          // Define o ID do documento como o mesmo ID gerado pelo Firebase.
          db.collection("rooms").doc(docRef.id).set(
            {
              id: docRef.id,
            },
            { merge: true }
          );
        })
        .catch(function (error) {
          console.error("Error adding document: ", error); // Registra qualquer erro que ocorra durante a adição da sala.
        });
    }

    setOpen(false); // Fecha o diálogo após a criação da sala de chat.
    setRoomName(""); // Limpa o nome da sala.
  };

  // Estrutura JSX do componente de nova sala de chat.
  return (
    <div>
      {/* Componente de dica de ferramenta personalizada para o ícone de chat. */}
      <TooltipCustom
        name="New Chat"
        onClick={() => handleNewChatOpen()} // Abre o diálogo de nova sala de chat ao clicar no ícone.
        icon={<ChatIcon />} // Ícone de chat do Material-UI.
      />

      {/* Diálogo para criar uma nova sala de chat. */}
      <Dialog
        open={open} // Determina se o diálogo está aberto ou fechado.
        onClose={handleNewChatClose} // Fecha o diálogo ao clicar fora dele.
        aria-labelledby="form-dialog-title"
      >
        {/* Título do diálogo. */}
        <DialogTitle id="form-dialog-title">Create Chat Room</DialogTitle>
        
        {/* Conteúdo do diálogo. */}
        <DialogContent>
          {/* Campo de texto para inserir o nome da nova sala de chat. */}
          <TextField
            autoFocus // Define o foco automaticamente no campo de texto ao abrir o diálogo.
            margin="dense" // Define a margem interna do campo de texto.
            id="name" // ID do campo de texto.
            label="Room Name" // Rótulo do campo de texto.
            type="text" // Tipo de entrada (texto).
            fullWidth // Expande o campo de texto para preencher a largura total do diálogo.
            value={roomName} // Valor do campo de texto (nome da sala).
            onChange={(e) => setRoomName(e.target.value)} // Atualiza o estado do nome da sala quando o usuário digita.
          />
        </DialogContent>
        
        {/* Ações do diálogo (botões de Cancelar e Criar). */}
        <DialogActions>
          {/* Botão para fechar o diálogo sem criar a sala de chat. */}
          <Button onClick={handleNewChatClose} color="primary">
            Cancel
          </Button>
          
          {/* Botão para criar a sala de chat. */}
          <Button onClick={createChat} color="primary" disabled={!roomName}>
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

// Exporta o componente NewChat como o componente padrão deste arquivo.
export default NewChat;
