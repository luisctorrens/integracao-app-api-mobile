# Integração App–API: catálogo de produtos

Atividade de Desenvolvimento de Sistemas Móveis. Um aplicativo React Native/Expo consome uma API Java/Spring Boot para listar, consultar, cadastrar, editar e excluir produtos.

## Estrutura

- [`app-mobile/`](app-mobile/README.md): aplicativo Expo com três telas, navegação, `FlatList`, componentes reutilizáveis e chamadas HTTP em `src/services/api.js`.
- [`api-produtos/`](api-produtos/README.md): API REST Spring Boot com H2 em memória, cinco rotas CRUD, dados iniciais e testes.

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

## Testes

- API: `cd api-produtos` e `.\mvnw.cmd test`;
- app: `cd app-mobile` e `npm test`.

## Origem

A API foi baseada no exemplo `AulaAPI.zip`, fornecido pelo professor na UC Desenvolvimento de Sistemas Distribuídos, que tinha listagem e cadastro. Esta versão adiciona consulta por ID, edição, exclusão, validações e testes.
