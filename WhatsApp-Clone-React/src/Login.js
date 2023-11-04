// Importa o React para utilizar no componente.
import React from "react";
// Importa o objeto 'auth' e 'provider' do arquivo './firebase'.
import { auth, provider } from "./firebase";
// Importa a função 'toastInfo' do arquivo './shared/toastInfo'.
import { toastInfo } from "./shared/toastInfo";
// Importa o ícone 'PermIdentityIcon' do pacote '@material-ui/icons'.
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
// Importa o logotipo do Google do arquivo './images/Google G Logo.png'.
import GoogleLogo from "./images/Google G Logo.png";
// Importa o arquivo de estilo './Login.css'.
import "./Login.css";

// Define um componente de função chamado 'Login'.
function Login() {
  // Define uma função chamada 'signInGoogle', que é acionada quando o usuário clica no botão 'Sign in with Google'.
  const signInGoogle = () => {
    const google = "google";
    // Chama a função 'signInWithPopup' do objeto 'auth' para autenticar o usuário usando a autenticação do Google.
    auth
      .signInWithPopup(provider)
      // Se houver um erro durante a autenticação, exibe uma mensagem de erro usando a função 'toastInfo'.
      .catch((error) => toastInfo(`${error}`, google, "top-center"));
  };

  // Define uma função chamada 'loginAnonymously', que é acionada quando o usuário clica no botão 'Login Anonymously'.
  const loginAnonymously = () => {
    const anonymous = "anonymous";
    // Chama a função 'signInAnonymously' do objeto 'auth' para autenticar o usuário anonimamente.
    auth
      .signInAnonymously()
      // Se houver um erro durante a autenticação anônima, exibe uma mensagem de erro usando a função 'toastInfo'.
      .catch((error) => toastInfo(`${error}`, anonymous, "top-center"));
  };

  // Retorna a estrutura JSX do componente 'Login'.
  return (
    <div className="login">
      <div className="login__container">
        {/* Exibe o logotipo do WhatsApp */}
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/150px-WhatsApp.svg.png"
          alt="WhatsApp Logo"
        />
        {/* Exibe um título indicando para o usuário fazer login no WhatsApp */}
        <div className="login__text">
          <h1>Sign in to WhatsApp</h1>
        </div>

        {/* Botão para fazer login com o Google */}
        <div className="login__withGoogle" onClick={signInGoogle}>
          <img src={GoogleLogo} alt="Google Logo" />
          <span>Sign in with Google</span>
        </div>

        {/* Botão para fazer login anonimamente */}
        <div
          className="login__withGoogle login__Anonymously"
          onClick={loginAnonymously}
        >
          <PermIdentityIcon />
          <span>Login Anonymously</span>
        </div>
      </div>
    </div>
  );
}

// Exporta o componente 'Login' para ser utilizado em outras partes do aplicativo.
export default Login;
