// Importa os componentes e funções necessários do React Native para construir a tela inicial (Home).
import React, { useEffect } from "react";
import { View, TouchableOpacity, Text, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from '@expo/vector-icons';
import colors from '../colors'; // Importa um arquivo de cores personalizadas.
import { Entypo } from '@expo/vector-icons';

// URL da imagem do gato para o cabeçalho.
const catImageUrl = "https://i.guim.co.uk/img/media/26392d05302e02f7bf4eb143bb84c8097d09144b/446_167_3683_2210/master/3683.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=49ed3252c0b2ffb49cf8b508892e452d";

// Componente funcional que representa a tela inicial (Home) do aplicativo.
const Home = () => {
    // Obtém a função de navegação do React Navigation.
    const navigation = useNavigation();

    // Define um efeito que atualiza as opções de navegação do cabeçalho da tela.
    useEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                // Adiciona um ícone de pesquisa no lado esquerdo do cabeçalho.
                <FontAwesome name="search" size={24} color={colors.gray} style={{marginLeft: 15}}/>
            ),
            headerRight: () => (
                // Adiciona uma imagem de gato no lado direito do cabeçalho.
                <Image
                    source={{ uri: catImageUrl }}
                    style={{
                        width: 40,
                        height: 40,
                        marginRight: 15,
                    }}
                />
            ),
        });
    }, [navigation]); // Executa o efeito quando a função de navegação muda.

    // Retorna a interface do usuário da tela inicial (Home), incluindo um botão de chat.
    return (
        <View style={styles.container}>
            {/* Botão de chat na parte inferior direita da tela. */}
            <TouchableOpacity
                onPress={() => navigation.navigate("Chat")}
                style={styles.chatButton}
            >
                {/* Ícone de chat no botão. */}
                <Entypo name="chat" size={24} color={colors.lightGray} />
            </TouchableOpacity>
        </View>
    );
};

// Estilos para os componentes da tela inicial (Home).
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        backgroundColor: "#fff",
    },
    chatButton: {
        backgroundColor: colors.primary, // Cor de fundo do botão.
        height: 50,
        width: 50,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        // Sombra para dar uma aparência elevada ao botão.
        shadowColor: colors.primary,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: .9,
        shadowRadius: 8,
        marginRight: 20,
        marginBottom: 50,
    }
});

// Exporta o componente Home para ser utilizado em outras partes do aplicativo.
export default Home;
