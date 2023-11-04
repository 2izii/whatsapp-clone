// Importa os elementos necessários do React, React Native e Firebase.
import React, { useState, createContext, useContext, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, ActivityIndicator } from 'react-native';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './config/firebase';
import Login from './screens/Login';
import Signup from './screens/Signup';
import Chat from './screens/Chat';
import Home from './screens/Home';

// Cria um objeto do tipo StackNavigator do React Navigation.
const Stack = createStackNavigator();

// Cria um contexto para armazenar informações sobre o usuário autenticado.
const AuthenticatedUserContext = createContext({});

// Componente de contexto que fornece o contexto de usuário autenticado para seus componentes filhos.
const AuthenticatedUserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <AuthenticatedUserContext.Provider value={{ user, setUser }}>
      {children}
    </AuthenticatedUserContext.Provider>
  );
};

// Define um componente de navegação para a tela de chat.
function ChatStack() {
  return (
    <Stack.Navigator defaultScreenOptions={Home}>
      <Stack.Screen name='Home' component={Home} />
      <Stack.Screen name='Chat' component={Chat} />
    </Stack.Navigator>
  );
}

// Define um componente de navegação para as telas de autenticação (login e signup) sem barra de navegação.
function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='Login' component={Login} />
      <Stack.Screen name='Signup' component={Signup} />
    </Stack.Navigator>
  );
}

// Componente principal que gerencia a autenticação do usuário e a navegação entre as telas.
function RootNavigator() {
  const { user, setUser } = useContext(AuthenticatedUserContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // onAuthStateChanged retorna um unsubscriber
    const unsubscribeAuth = onAuthStateChanged(
      auth,
      async authenticatedUser => {
        authenticatedUser ? setUser(authenticatedUser) : setUser(null);
        setIsLoading(false);
      }
    );
    // Desinscreve o ouvinte de autenticação ao desmontar o componente.
    return unsubscribeAuth;
  }, [user]);

  // Renderiza um indicador de atividade se o aplicativo estiver carregando,
  // caso contrário, renderiza a navegação com base no estado de autenticação do usuário.
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size='large' />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {/* Renderiza o componente de navegação apropriado com base no estado de autenticação do usuário. */}
      {user ? <ChatStack /> : <AuthStack />}
    </NavigationContainer>
  );
}

// Componente principal que encapsula o aplicativo com o provedor de contexto de usuário autenticado.
export default function App() {
  return (
    <AuthenticatedUserProvider>
      <RootNavigator />
    </AuthenticatedUserProvider>
  );
}
