# Integração App–API: catálogo de produtos

Atividade de Desenvolvimento de Sistemas Móveis. Um aplicativo React Native/Expo consome uma API Java/Spring Boot para listar, consultar, cadastrar, editar e excluir produtos.

Este repositório contém somente o código da atividade. Veja o [guia de execução, demonstração e entrega](GUIA_PARA_ENTREGA.md) para testar o fluxo e preparar os dois vídeos solicitados.

## Estrutura

- [`app-mobile/`](app-mobile/README.md): aplicativo Expo com três telas, navegação, `FlatList`, componentes reutilizáveis e chamadas HTTP em `src/services/api.js`.
- [`api-produtos/`](api-produtos/README.md): API REST Spring Boot com H2 em memória, cinco rotas CRUD, dados iniciais e testes.
- [`NOTICE.md`](NOTICE.md): origem e autoria do exemplo usado como base.

## Executar

Requer JDK 17 ou superior e Node.js 22.13 ou superior. Abra dois terminais:

```powershell
cd api-produtos
.\mvnw.cmd spring-boot:run
```

Depois que <http://localhost:8080/produtos> mostrar Teclado e Mouse, no outro terminal:

```powershell
cd app-mobile
npm ci
npm run web
```

Para executar no celular com Expo Go, configure `EXPO_PUBLIC_API_URL` com o IP do computador na rede local, conforme [`app-mobile/.env.example`](app-mobile/.env.example), e execute `npm start`. O banco H2 é volátil: alterações somem quando a API é reiniciada.

## Verificação

- API: `cd api-produtos` e `.\mvnw.cmd test`;
- app: `cd app-mobile` e `npm test`;
- navegação e CRUD: siga o ensaio do [guia](GUIA_PARA_ENTREGA.md).

O app foi exercitado no navegador com a API real para listar, cadastrar, consultar detalhes e editar. A exclusão foi verificada nos testes de integração da API; a confirmação visual deve ser ensaiada antes da gravação. Os bundles web e Android foram gerados com Expo SDK 57.

## Origem

A API foi baseada no arquivo `AulaAPI.zip`, fornecido pelo professor na UC Desenvolvimento de Sistemas Distribuídos. O exemplo original tinha listagem e cadastro; esta versão amplia o CRUD e adiciona testes. A adaptação da API e o aplicativo foram preparados posteriormente com auxílio do Codex em 14/10/2026. Não são apresentados como código feito em aula ou entrega original. Veja [NOTICE.md](NOTICE.md).
