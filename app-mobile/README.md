# Aplicativo de produtos

Aplicativo React Native com Expo SDK 57 e React Navigation. A tela inicial usa `FlatList`, as telas seguintes exibem detalhes e o formulário de cadastro/edição. `src/services/api.js` contém as chamadas HTTP; `src/components` reúne componentes usados em mais de uma tela.

## Pré-requisitos

- Node.js 22.13+;
- API Java iniciada na porta 8080;
- para teste em celular, Expo Go e rede Wi-Fi compartilhada com o computador.

## Iniciar

1. Execute `npm ci`.
2. Navegador no mesmo computador: `npm run web`. O padrão é `http://localhost:8080`.
3. Emulador Android: crie `.env` com `EXPO_PUBLIC_API_URL=http://10.0.2.2:8080`, execute `npm start`.
4. Celular físico: descubra o IPv4 local do computador (`ipconfig` no Windows), crie `.env` com `EXPO_PUBLIC_API_URL=http://SEU_IP:8080`, execute `npm start` e abra o QR code no Expo Go. Use a mesma rede e permita acesso à porta 8080 no firewall, se necessário.

O arquivo `.env.example` mostra o formato. `.env` não entra no Git; `EXPO_PUBLIC_API_URL` contém somente o endereço da API, nunca uma senha. Se a lista exibir falha de conexão, confira o endereço indicado no rodapé do app e abra `http://SEU_IP:8080/produtos` no navegador do celular.

## Validar

- `npm test`: cliente HTTP e validação de formulário;
- `npm run bundle`: bundle web;
- `npx expo export --platform android --output-dir dist-android`: bundle Android.

`node_modules`, `.expo`, `dist` e `dist-android` são gerados localmente e não entram no Git.
