# Whatsapp clone react native e reactjs

## Como rodar o projeto

### Primeiro clone o projeto

Clone o repositorio

```
git clone https://github.com/b
```

### WEB

Digite cd WhatsApp-Clone-React

Digite npm install

Digite npm start

```

```

### MOBILE

cd ChatApp && yarn

Crie um projeto no firebase com autenticacao de sign in google, email senha e habilite o firestore

adicione suas configurações do firebase no arquivo`firebase.js`

```
const firebaseConfig = {
  apiKey: Constants.expoConfig.extra.apiKey,
  authDomain: Constants.expoConfig.extra.authDomain,
  projectId: Constants.expoConfig.extra.projectId,
  storageBucket: Constants.expoConfig.extra.storageBucket,
  messagingSenderId: Constants.expoConfig.extra.messagingSenderId,
  appId: Constants.expoConfig.extra.appId,
  databaseURL: Constants.expoConfig.extra.databaseURL,
  //   @deprecated is deprecated Constants.manifest
};
```

Inicie o projeto com o comando

npm run android
