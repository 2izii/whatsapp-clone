// Importa as dependências necessárias do React para o arquivo.
import React, { useEffect, useState } from "react";
import { useStateValue } from "./StateProvider";  // Importa o hook useStateValue do contexto StateProvider.
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";  // Importa os componentes de roteamento do React.
import db from "./firebase";  // Importa o serviço de banco de dados Firestore do Firebase.
import { auth, firebase } from "./firebase";  // Importa os serviços de autenticação do Firebase.
import { setUser } from "./actions/userAction";  // Importa a função setUser do arquivo userAction.js.
import Login from "./Login";  // Importa o componente de login.
import Sidebar from "../src/Sidebar/Sidebar";  // Importa o componente da barra lateral.
import Chat from "../src/Chat/Chat";  // Importa o componente de chat.
import { ToastContainer } from "react-toastify";  // Importa o componente ToastContainer para exibir mensagens de notificação.
import { toastInfo } from "./shared/toastInfo";  // Importa a função toastInfo para exibir mensagens de notificação.
import Hidden from "@material-ui/core/Hidden";  // Importa o componente Hidden do Material-UI para controle responsivo.
import CircularProgress from "@material-ui/core/CircularProgress";  // Importa o componente de indicador de progresso circular do Material-UI.
import LinearProgress from "@material-ui/core/LinearProgress";  // Importa o componente de indicador de progresso linear do Material-UI.
import "react-toastify/dist/ReactToastify.css";  // Importa o estilo padrão para as notificações Toastify.
import "./App.css";  // Importa o arquivo de estilo CSS do componente App.

// Define o componente funcional App, responsável pela lógica principal do aplicativo.
function App() {
  // Usa o hook useStateValue para acessar o estado global da aplicação.
  const [{ user }, dispatch] = useStateValue();
  // Define estados locais para armazenar as informações das salas, a existência de uma sala e o estado de carregamento.
  const [rooms, setRooms] = useState([]);
  const [isRoomExist, setIsRoomExist] = useState("");
  const [loading, setLoading] = useState(false);

  // Efeito colateral que executa quando o componente é montado ou quando o estado global do usuário é alterado.
  useEffect(() => {
    // Subscreve-se às mudanças no estado de autenticação do usuário.
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // Se houver um usuário autenticado, atualiza o estado global do usuário e inicia o estado de carregamento.
        dispatch(setUser(authUser));
        setLoading(true);

        // Obtém as salas ordenadas por timestamp do Firestore e atualiza o estado local 'rooms' com os dados.
        db.collection("rooms")
          .orderBy("timestamp", "desc")
          .onSnapshot((snapshot) =>
            setRooms(
              snapshot.docs.map((doc) => ({
                id: doc.id,
                data: doc.data(),
              }))
            )
          );

        // Lógica para tratamento de usuários anônimos.
        // Se o usuário é anônimo e não tem um nome definido, gera um nome aleatório e atualiza o perfil do usuário e os dados do Firestore.
        if (authUser.isAnonymous === true && authUser.displayName === null) {
          var anonymousName =
            "Anonymous" + " " + Math.floor(Math.random() * 1000000);

          auth.currentUser.updateProfile({
            displayName: anonymousName,
            photoURL: "",
          });

          db.collection("users")
            .doc(authUser.uid)
            .set({
              name: anonymousName,
              about: "Hey there! I am using WhatsApp.",
              photoURL: "",
              role: "anonymous",
              dateJoined: firebase.firestore.FieldValue.serverTimestamp(),
            })
            .then(function () {
              console.log("Document successfully updated!");
            })
            .catch(function (error) {
              // Exibe um erro caso a atualização dos dados falhe.
              console.error("Error updating document: ", error);
            });
        }

        // Lógica para tratamento de usuários autenticados.
        // Se o usuário não é anônimo, verifica se o perfil do usuário existe no Firestore e cria um novo perfil se não existir.
        if (
          authUser.uid &&
          authUser.isAnonymous === false &&
          authUser.photoURL !== null
        ) {
          const errorAbout = "errorAbout";
          db.collection("users")
            .doc(authUser.uid)
            .get()
            .then(function (doc) {
              if (doc.exists) {
                // Se o perfil do usuário existe, não faz nada.
              } else {
                // Se o perfil do usuário não existe, cria um novo perfil no Firestore.
                db.collection("users").doc(authUser.uid).set({
                  name: authUser.displayName,
                  about: "Hey there! I am using WhatsApp.",
                  photoURL: user.photoURL,
                  role: "regular",
                  dateJoined: firebase.firestore.FieldValue.serverTimestamp(),
                });
              }
            })
            .catch(function (error) {
              // Exibe um erro se houver problemas ao acessar o Firestore.
              toastInfo(`${error}`, errorAbout, "top-center");
            });
        } else if (
          authUser.uid &&
          authUser.isAnonymous === false &&
          authUser.photoURL === null
        ) {
          // Lógica para tratamento de usuários autenticados sem foto de perfil.
          const errorAbout = "errorAbout";
          db.collection("users")
            .doc(authUser.uid)
            .get()
            .then(function (doc) {
              if (doc.exists) {
                // Se o perfil do usuário existe, não faz nada.
                console.log("USER EXIST");
              } else {
                // Se o perfil do usuário não existe, cria um novo perfil no Firestore.
                db.collection("users").doc(authUser.uid).set({
                  name: authUser.displayName,
                  about: "Hey there! I am using WhatsApp.",
                  photoURL: "",
                  role: "regular",
                  dateJoined: firebase.firestore.FieldValue.serverTimestamp(),
                });
              }
            })
            .catch(function (error) {
              // Exibe um erro se houver problemas ao acessar o Firestore.
              toastInfo(`${error}`, errorAbout, "top-center");
            });
        }
      } else {
        // Se não houver um usuário autenticado, atualiza o estado global do usuário como nulo e inicia o estado de carregamento.
        dispatch(setUser(null));
        setLoading(true);
      }
    });

    // Retorna uma função de limpeza que será chamada quando o componente for desmontado.
    return () => {
      unsubscribe();  // Desinscreve-se do listener de autenticação para evitar vazamentos de memória.
    };
  }, [dispatch, user]);  // O efeito é reexecutado sempre que o estado global do usuário muda.

  // Retorna a estrutura JSX do componente App.
  return (
    <div className={`app ${loading === false && "app-no-bg"}`}>
      {loading ? (
        // Se o estado de carregamento for verdadeiro, renderiza o conteúdo do aplicativo.
        <>
          <ToastContainer
            position="top-center"
            autoClose={5000}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
          />
          {!user ? (
            // Se não houver um usuário autenticado, renderiza o componente de login.
            <Login />
          ) : (
            // Se houver um usuário autenticado, renderiza a barra lateral e o componente de chat.
            <div className="app__body">
              <Router>
                {/* Configura as rotas do aplicativo */}
                <Switch>
                  <Route exact path="/">
                    {/* Rota para a página principal */}
                    <Sidebar
                      rooms={rooms}
                      setIsRoomExist={setIsRoomExist}
                      isRoomExist={isRoomExist}
                    />
                    {/* Esconde o componente de chat em dispositivos móveis */}
                    <Hidden only={["xs"]}>
                      <Chat isRoomExist={isRoomExist} />
                    </Hidden>
                  </Route>

                  <Route exact path="/rooms/:roomId">
                    {/* Rota para salas de chat específicas */}
                    <Hidden only={["xs"]}>
                      <Sidebar
                        rooms={rooms}
                        setIsRoomExist={setIsRoomExist}
                        isRoomExist={isRoomExist}
                      />
                    </Hidden>
                    <Chat isRoomExist={isRoomExist} />
                  </Route>

                  <Route path="*">
                    {/* Rota de redirecionamento para a página principal se a rota não for encontrada */}
                    <Redirect to="/" />
                  </Route>
                </Switch>
              </Router>
            </div>
          )}
        </>
      ) : (
        // Se o estado de carregamento for falso, exibe indicadores de progresso enquanto o aplicativo está carregando.
        <div className="app__loading">
          <div>
            <div className="app__loading_circular">
              <CircularProgress />
            </div>
            <div className="app__loading_linear">
              <LinearProgress />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;  // Exporta o componente App para ser utilizado em outras partes do aplicativo.
