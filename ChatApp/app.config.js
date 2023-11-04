// Importa a configuração do ambiente a partir de um arquivo de ambiente (.env).
import 'dotenv/config';

// Exporta um objeto de configuração para o aplicativo Expo.
export default {
  // Configurações gerais do Expo, incluindo nome, versão, orientação, ícone e tela de abertura.
  "expo": {
    "name": "ChatApp",
    "slug": "ChatApp",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    // Configurações da tela de abertura (splash screen) incluindo imagem, modo de redimensionamento e cor de fundo.
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    // Configurações de atualização do aplicativo.
    "updates": {
      "fallbackToCacheTimeout": 0
    },
    // Padrões de padrões de ativos a serem incluídos no pacote de aplicativos.
    "assetBundlePatterns": [
      "**/*"
    ],
    // Configurações específicas para dispositivos iOS.
    "ios": {
      "supportsTablet": true
    },
    // Configurações específicas para dispositivos Android, incluindo ícone adaptativo.
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#FFFFFF"
      }
    },
    // Configurações específicas para aplicativos da web, incluindo favicon.
    "web": {
      "favicon": "./assets/favicon.png"
    },
    // Variáveis adicionais definidas no arquivo de ambiente (.env), como chave da API e outras credenciais.
    extra: {
      apiKey: process.env.API_KEY,
      authDomain: process.env.AUTH_DOMAIN,
      projectId: process.env.PROJECT_ID,
      storageBucket: process.env.STORAGE_BUCKET,
      messagingSenderId: process.env.MESSAGING_SENDER_ID,
      appId: process.env.APP_ID
    }
  }
}
