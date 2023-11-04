// Importa as funções necessárias do Firebase para autenticação e banco de dados.
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import Constants from "expo-constants"; // Importa a biblioteca Constants do Expo.

// Configuração do Firebase para autenticação e banco de dados.
const firebaseConfig = {
  apiKey: "AIzaSyCIs8xpXueQ778L_CYRwdXuKC1civzlILg",
  authDomain: "whatsapp-clone-739899.firebaseapp.com",
  projectId: "whatsapp-clone-739899",
  storageBucket: "whatsapp-clone-739899.appspot.com",
  messagingSenderId: "16689541038",
  appId: "1:16689541038:web:00c46044aebacf76ace23f",
  measurementId: "G-BEQC1PQPHM",
};

// Inicializa o Firebase com a configuração fornecida.
initializeApp(firebaseConfig);

// Obtém a instância de autenticação do Firebase.
export const auth = getAuth();

// Obtém a instância do banco de dados Firestore do Firebase.
export const database = getFirestore();
