import { toast } from "react-toastify"; // Importa a função 'toast' do pacote 'react-toastify' para exibir notificações na aplicação.

export const toastInfo = (toastTitle, toastId, position) => { // Declara uma função chamada 'toastInfo' que recebe três parâmetros: 'toastTitle', 'toastId' e 'position'.
  toast.info(toastTitle, { // Chama a função 'info' do objeto 'toast' para exibir uma notificação informativa.
    toastId: toastId, // Define um identificador único para a notificação, passado como parâmetro.
    position: position, // Define a posição da notificação na tela (por exemplo, "top-right", "top-center", "bottom-left", etc.), passada como parâmetro.
    autoClose: 5000, // Define o tempo em milissegundos que a notificação permanecerá visível na tela (neste caso, 5000ms ou 5 segundos).
    hideProgressBar: true, // Esconde a barra de progresso que indica o tempo restante para a notificação ser fechada.
    closeOnClick: true, // Fecha a notificação quando o usuário clica sobre ela.
    pauseOnHover: true, // Pausa o temporizador de fechamento da notificação quando o mouse está sobre ela.
    draggable: true, // Permite que o usuário arraste a notificação pela tela.
    progress: undefined, // Configurações adicionais para a barra de progresso (não definido neste caso).
  });
};

