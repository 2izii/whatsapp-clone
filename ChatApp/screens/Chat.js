// Importa os componentes e funções necessários do React Native e do Firebase.
import React, {
  useState,
  useEffect,
  useLayoutEffect,
  useCallback
} from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import {
  collection,
  addDoc,
  orderBy,
  query,
  onSnapshot
} from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { auth, database } from '../config/firebase';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import colors from '../colors'; // Importa um arquivo de cores personalizadas.

// Componente funcional que representa a tela de chat do aplicativo.
export default function Chat() {
  // Define um estado para armazenar as mensagens no chat.
  const [messages, setMessages] = useState([]);
  const navigation = useNavigation();

  // Função para realizar o logout do usuário.
  const onSignOut = () => {
      signOut(auth).catch(error => console.log('Error logging out: ', error));
  };

  // Atualiza o cabeçalho da tela para adicionar um botão de logout.
  useLayoutEffect(() => {
      navigation.setOptions({
          headerRight: () => (
              <TouchableOpacity
                  style={{
                      marginRight: 10
                  }}
                  onPress={onSignOut}
              >
                  {/* Ícone de logout no cabeçalho. */}
                  <AntDesign name="logout" size={24} color={colors.gray} style={{marginRight: 10}}/>
              </TouchableOpacity>
          )
      });
  }, [navigation]);

  // Usa um efeito para ouvir as mudanças no banco de dados de mensagens e atualizar o estado de mensagens.
  useLayoutEffect(() => {
      const collectionRef = collection(database, 'chats');
      const q = query(collectionRef, orderBy('createdAt', 'desc'));

      // Registra um ouvinte para atualizações no banco de dados de mensagens.
      const unsubscribe = onSnapshot(q, querySnapshot => {
          setMessages(
              querySnapshot.docs.map(doc => ({
                  _id: doc.data()._id,
                  createdAt: doc.data().createdAt.toDate(),
                  text: doc.data().text,
                  user: doc.data().user
              }))
          );
      });

      // Retorna uma função de limpeza para desinscrever o ouvinte quando o componente é desmontado.
      return unsubscribe;
  }, []);

  // Função para enviar mensagens no chat.
  const onSend = useCallback((messages = []) => {
      setMessages(previousMessages =>
          GiftedChat.append(previousMessages, messages)
      );
      const { _id, createdAt, text, user } = messages[0];

      // Adiciona a nova mensagem ao banco de dados de mensagens.
      addDoc(collection(database, 'chats'), {
          _id,
          createdAt,
          text,
          user
      });
  }, []);

  // Retorna a interface do usuário do chat usando o componente GiftedChat para mostrar as mensagens.
  return (
      <GiftedChat
          messages={messages}
          showAvatarForEveryMessage={false}
          showUserAvatar={false}
          onSend={messages => onSend(messages)}
          messagesContainerStyle={{
              backgroundColor: '#fff'
          }}
          textInputStyle={{
              backgroundColor: '#fff',
              borderRadius: 20,
          }}
          user={{
              _id: auth?.currentUser?.email, // Obtém o email do usuário autenticado como identificador.
              avatar: 'https://i.pravatar.cc/300' // URL do avatar do usuário (pode ser personalizado).
          }}
      />
  );
}
