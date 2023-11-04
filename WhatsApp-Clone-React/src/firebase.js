import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCIs8xpXueQ778L_CYRwdXuKC1civzlILg", // Chave de API para autenticação com o Firebase.

  authDomain: "whatsapp-clone-739899.firebaseapp.com", // Domínio autorizado para autenticação.
  projectId: "whatsapp-clone-739899", // ID do projeto Firebase.
  storageBucket: "whatsapp-clone-739899.appspot.com", // Bucket de armazenamento para o projeto.
  messagingSenderId: "16689541038", // ID do remetente de mensagens para o projeto.
  appId: "1:16689541038:web:00c46044aebacf76ace23f", // ID do aplicativo Firebase.
  measurementId: "G-BEQC1PQPHM", // ID de medição para o projeto.
};

// Inicializa o aplicativo Firebase com a configuração fornecida.
const firebaseApp = firebase.initializeApp(firebaseConfig);

// Cria uma instância do Firestore para acessar o banco de dados Firestore.
const db = firebaseApp.firestore();

// Cria uma instância do serviço de autenticação do Firebase.
const auth = firebase.auth();

// Cria uma instância do provedor de autenticação do Google para autenticação com o Google.
const provider = new firebase.auth.GoogleAuthProvider();

// Cria uma instância do serviço de armazenamento do Firebase para acessar o Firebase Storage.
const storage = firebase.storage();

// Exporta os serviços de autenticação, provedor, armazenamento e o objeto firebase para uso em outros arquivos.
export { auth, provider, storage, firebase };

// Exporta o acesso ao banco de dados Firestore para ser utilizado em outras partes do aplicativo.
export default db;
