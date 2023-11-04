// Importa a função `getDefaultConfig` do pacote "@expo/metro-config" e armazena na constante `{ getDefaultConfig }`.
const { getDefaultConfig } = require("@expo/metro-config");

// Chama a função `getDefaultConfig` passando o diretório atual (__dirname) como argumento e armazena o resultado na variável `defaultConfig`.
const defaultConfig = getDefaultConfig(__dirname);

// Adiciona a extensão "cjs" à lista de extensões de ativos (assets) no objeto `defaultConfig.resolver.assetExts`.
defaultConfig.resolver.assetExts.push("cjs");

// Exporta o objeto `defaultConfig` como o módulo padrão deste arquivo para que ele possa ser utilizado em outros arquivos JavaScript.
module.exports = defaultConfig;

