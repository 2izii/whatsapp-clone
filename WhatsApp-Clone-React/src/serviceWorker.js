// Este código opcional é utilizado para registrar um service worker.
// O register() não é chamado por padrão.

// Isso permite que o aplicativo carregue mais rápido em visitas subsequentes na produção, além de fornecer
// capacidades offline. No entanto, também significa que os desenvolvedores (e usuários)
// verão atualizações implantadas apenas em visitas subsequentes à página, depois que todas as
// abas abertas na página foram fechadas, já que os recursos em cache anteriormente
// são atualizados em segundo plano.

// Para aprender mais sobre os benefícios desse modelo e instruções sobre como fazer a
// opt-in, leia https://bit.ly/CRA-PWA

// Verifica se o host é "localhost" para determinar se o aplicativo está sendo executado localmente.
const isLocalhost = Boolean(
  window.location.hostname === "localhost" ||
    window.location.hostname === "[::1]" ||
    /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/.test(
      window.location.hostname
    )
);

// Função que registra o service worker, se estiver em um ambiente de produção e o navegador
// suportar service workers.
export function register(config) {
  if (process.env.NODE_ENV === "production" && "serviceWorker" in navigator) {
    // O construtor de URL está disponível em todos os navegadores que suportam SW.
    const publicUrl = new URL(process.env.PUBLIC_URL, window.location.href);
    // O service worker não funcionará se PUBLIC_URL estiver em uma origem diferente
    // da qual nossa página é servida. Isso pode acontecer se uma CDN for usada para
    // servir ativos; veja https://github.com/facebook/create-react-app/issues/2374
    if (publicUrl.origin !== window.location.origin) {
      return;
    }

    // Aguarda o carregamento completo da página para registrar o service worker.
    window.addEventListener("load", () => {
      const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;

      if (isLocalhost) {
        // Isso está sendo executado localmente. Verifica se ainda existe um service worker.
        checkValidServiceWorker(swUrl, config);

        // Adiciona alguns logs adicionais ao localhost, direcionando os desenvolvedores para a
        // documentação do service worker/PWA.
        navigator.serviceWorker.ready.then(() => {
          console.log(
            "Este aplicativo da web está sendo servido principalmente pelo cache de um " +
              "service worker. Para aprender mais, visite https://bit.ly/CRA-PWA"
          );
        });
      } else {
        // Não é localhost. Apenas registra o service worker.
        registerValidSW(swUrl, config);
      }
    });
  }
}

// Função auxiliar que registra o service worker.
function registerValidSW(swUrl, config) {
  navigator.serviceWorker
    .register(swUrl)
    .then((registration) => {
      // Evento que é acionado quando uma atualização é encontrada no service worker.
      registration.onupdatefound = () => {
        const installingWorker = registration.installing;
        if (installingWorker == null) {
          return;
        }
        // Evento que é acionado quando o novo service worker é instalado.
        installingWorker.onstatechange = () => {
          if (installingWorker.state === "installed") {
            if (navigator.serviceWorker.controller) {
              // Neste ponto, o conteúdo precacheado foi buscado,
              // mas o service worker anterior ainda servirá o conteúdo mais antigo
              // até que todas as abas do cliente para esta página sejam fechadas.
              console.log(
                "Novo conteúdo está disponível e será usado quando todas as " +
                  "abas para esta página forem fechadas. Veja https://bit.ly/CRA-PWA."
              );
              // Executa um callback se fornecido no argumento de configuração.
              if (config && config.onUpdate) {
                config.onUpdate(registration);
              }
            } else {
              // Neste ponto, tudo foi precacheado.
              // É o momento perfeito para exibir uma mensagem dizendo que
              // "O conteúdo está armazenado em cache para uso offline."
              console.log(
                "O conteúdo está armazenado em cache para uso offline."
              );
              // Executa um callback se fornecido no argumento de configuração.
              if (config && config.onSuccess) {
                config.onSuccess(registration);
              }
            }
          }
        };
      };
    })
    .catch((error) => {
      console.error("Erro durante o registro do service worker:", error);
    });
}

// Função auxiliar que verifica se o service worker é válido.
function checkValidServiceWorker(swUrl, config) {
  // Verifica se o service worker pode ser encontrado. Se não, recarrega a página.
  fetch(swUrl, {
    headers: { "Service-Worker": "script" },
  })
    .then((response) => {
      // Garante que o service worker exista e que estamos realmente recebendo um arquivo JS.
      const contentType = response.headers.get("content-type");
      if (
        response.status === 404 ||
        (contentType != null && contentType.indexOf("javascript") === -1)
      ) {
        // Nenhum service worker encontrado. Provavelmente é um aplicativo diferente. Recarrega a página.
        navigator.serviceWorker.ready.then((registration) => {
          registration.unregister().then(() => {
            window.location.reload();
          });
        });
      } else {
        // Service worker encontrado. Prossiga normalmente.
        registerValidSW(swUrl, config);
      }
    })
    .catch(() => {
      // Se não houver conexão com a internet, o aplicativo será executado no modo offline.
      console.log(
        "Nenhuma conexão com a internet encontrada. O aplicativo está sendo executado no modo offline."
      );
    });
}

// Função que desregistra o service worker, se existir.
export function unregister() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.ready
      .then((registration) => {
        registration.unregister();
      })
      .catch((error) => {
        console.error(error.message);
      });
  }
}
