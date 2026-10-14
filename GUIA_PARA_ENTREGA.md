# Guia para entender, demonstrar e entregar a atividade

Esta é a atividade **Integração App-Api** de Desenvolvimento de Sistemas Móveis. O prazo registrado no AVA é **15/10/2026 às 00:00**. Confira o prazo na [página da atividade](https://sc.ead.senai.br/mod/assign/view.php?id=1288937) antes do envio. O código da entrega está neste repositório, em `app-mobile/` e `api-produtos/`.

## O que foi feito e como explicar

O aplicativo foi feito com React Native e Expo. Ele mostra uma lista de produtos, abre os detalhes, cadastra, edita e exclui. Cada ação chama a API Java/Spring Boot por HTTP. A API guarda os produtos em um banco H2 **em memória**: ao reiniciar o Java, as alterações desaparecem e os dois exemplos iniciais voltam. A API deriva de um exemplo fornecido pelo professor na UC de Sistemas Distribuídos, que tinha apenas listagem e cadastro. Esta versão foi ampliada posteriormente com auxílio do Codex; ela não é uma entrega original feita em aula.

| Ação na tela | Chamada HTTP | Onde encontrar |
|---|---|---|
| Abrir a lista | `GET /produtos` | `app-mobile/src/screens/ProdutosScreen.js` |
| Abrir os detalhes | `GET /produtos/{id}` | `app-mobile/src/screens/DetalheScreen.js` |
| Cadastrar | `POST /produtos` | `app-mobile/src/screens/FormularioScreen.js` |
| Editar | `PUT /produtos/{id}` | `app-mobile/src/screens/FormularioScreen.js` |
| Excluir | `DELETE /produtos/{id}` | `app-mobile/src/screens/DetalheScreen.js` |

Todas as chamadas ficam centralizadas em `app-mobile/src/services/api.js`. O servidor recebe essas chamadas em `api-produtos/src/main/java/com/aula/AulaAPI/controllers/ProdutoController.java`. `ProdutoCard` e `Botao` são componentes reutilizados. `FlatList` monta a lista; `App.js` declara as três telas da navegação.

## 1. Preparar a demonstração no computador

Abra dois terminais PowerShell. Não feche os terminais enquanto estiver gravando.

No primeiro, entre na pasta `api-produtos` e execute:

```powershell
.\mvnw.cmd spring-boot:run
```

Espere a mensagem de que o servidor iniciou. Abra <http://localhost:8080/produtos> no navegador: devem aparecer **Teclado** e **Mouse**. Se a página já responder, a API já está em execução; não inicie uma segunda instância na mesma porta.

No segundo terminal, entre na pasta `app-mobile` e execute:

```powershell
npm ci
npm run web
```

Abra o endereço local mostrado pelo Expo (normalmente <http://localhost:8081>). Se já abrir, não é preciso iniciar outra instância. Para `npm ci`, basta executar uma vez neste computador; nas próximas demonstrações, pode usar apenas `npm run web`.

### Para mostrar no celular com Expo Go

O teste no celular é mais representativo de React Native. Computador e celular precisam estar na mesma rede. Descubra o IPv4 do computador com `ipconfig`. Na pasta `app-mobile`, crie um arquivo local `.env` com uma linha como:

```text
EXPO_PUBLIC_API_URL=http://192.168.1.123:8080
```

Substitua o IP de exemplo pelo IPv4 real do computador. Execute `npm start` e leia o QR code no Expo Go. Antes de abrir o app, teste `http://SEU_IP:8080/produtos` no navegador do celular. Se não abrir, confira a rede e a permissão do firewall para o Java. **Não coloque `.env` no Git**; o ZIP preparado também não o inclui. Se o Expo Go não funcionar a tempo, demonstre no navegador e explique que o mesmo projeto gera o app mobile; não afirme que o teste em celular ocorreu.

### Se aparecer uma janela de administrador ou firewall do Java

Não sabemos qual janela apareceu anteriormente. Ela **não impediu** a compilação, os testes, o commit, o push ou o acesso local à API, que responderam depois. Se for o **Firewall do Windows** pedindo acesso de rede ao Java e você for demonstrar no celular, confira se o executável e o editor são legítimos e permita somente em **redes privadas**. A rede pública não é necessária. Se for outra solicitação, tire um print antes de decidir; não aprove um programa desconhecido só para seguir este guia. Se negar o acesso de rede, o navegador do próprio computador pode continuar funcionando, mas o celular talvez não consiga alcançar a API.

## 2. Fazer o ensaio funcional antes de gravar

1. Atualize a tela e confirme os dois produtos iniciais.
2. Abra um produto e volte à lista.
3. Cadastre um produto de teste com descrição e preço.
4. Abra o novo produto, edite descrição/preço e confira o resultado.
5. Toque em **Excluir produto**; confira a janela de confirmação, confirme e veja o item sair da lista.
6. Para demonstrar erro de conexão, pare a API com `Ctrl+C`, atualize a lista e veja a mensagem. Reinicie a API e toque em **Tentar novamente**. Como o banco é volátil, os produtos de teste somem após esse reinício.

A exclusão passou nos testes da API, mas a confirmação visual final ainda precisa deste ensaio na interface. Se algo falhar, não grave como se tivesse funcionado: verifique a URL da API e registre o erro para corrigirmos.

## 3. Gravar os dois vídeos pedidos

Grave a tela e sua voz, com fonte legível. Não mostre senhas, tokens, outras abas pessoais ou a sessão do AVA. Você pode usar o gravador de tela que já conhece. Faça dois arquivos separados ou dois links separados, conforme aceitar o formulário do AVA. O enunciado pede **um vídeo do funcionamento e outro explicando o código**; não especifica duração obrigatória. Os tempos abaixo são sugestões para vídeos objetivos.

### Vídeo 1 — funcionamento (sugestão: 2 a 3 minutos)

1. Mostre `http://localhost:8080/produtos` e diga: “Esta é a API de produtos. O app consulta esses dados por HTTP.”
2. Mostre o app e diga: “A tela inicial busca os produtos e mostra a lista com `FlatList`.”
3. Abra os detalhes de um produto. Cadastre um novo, edite-o e exclua-o com a confirmação aparecendo na gravação.
4. Se estiver seguro de que consegue reiniciar a API, mostre brevemente a mensagem de falha de conexão e a recuperação. Caso contrário, priorize o CRUD completo.

### Vídeo 2 — explicação do código (sugestão: 2 a 4 minutos)

1. Abra `app-mobile/App.js`: “Aqui estão as rotas Produtos, Detalhes e Formulário.”
2. Abra `app-mobile/src/services/api.js`: “Centralizei aqui as cinco operações HTTP e o tratamento de erro.”
3. Abra `ProdutosScreen.js`: “A lista chama a API, mostra carregamento/erro e renderiza os itens com `FlatList` e `ProdutoCard`.”
4. Abra `FormularioScreen.js` e `DetalheScreen.js`: “O formulário faz POST ou PUT conforme exista um ID; a tela de detalhes confirma antes do DELETE.”
5. Abra `api-produtos/.../ProdutoController.java`: “O controlador Java recebe as requisições. Ampliei o exemplo do professor com busca por ID, edição e exclusão.”

Explique com suas palavras; não diga que escreveu sozinho em aula o que foi desenvolvido posteriormente com auxílio de IA. Se não souber explicar uma parte, siga uma chamada desde o botão na tela até `services/api.js`, o controlador Java e a resposta exibida no app.

## 4. Conferir os arquivos e enviar no AVA

1. Confirme que os dois vídeos abrem e têm áudio. Veja o tamanho de cada arquivo: na consulta de 14/10/2026, o AVA aceitava até **20 MB por arquivo**, no máximo 20 anexos e mostrava **uma tentativa**. Se os vídeos forem maiores, use links acessíveis ao professor, **somente se o formulário e as orientações da turma aceitarem links**.
2. O código está no [repositório público da atividade](https://github.com/luisctorrens/integracao-app-api-mobile). Confira se o link abre sem login e copie-o para a entrega.
3. Abra a [atividade no AVA](https://sc.ead.senai.br/mod/assign/view.php?id=1288937), informe o link do repositório e anexe/informe os dois vídeos conforme os campos disponíveis.
4. **Antes de confirmar a tentativa**, confira nomes, áudio, acesso aos links e anexos. Depois envie e verifique se o AVA mostra a submissão registrada. Guarde o comprovante ou a indicação de data/hora.

O repositório contém os dois projetos e os arquivos necessários para reproduzi-los, mas não inclui `node_modules`, compilados ou `.env`. Ele não contém os vídeos; eles ainda dependem da sua gravação. Se quiser que eu confira os vídeos e a tela de submissão antes do clique final, me envie os arquivos ou links e deixe o AVA aberto.

## Erros mais comuns

- **Porta 8080 ocupada:** a API provavelmente já está aberta; teste `/produtos` antes de iniciar outra.
- **App mostra erro de rede:** mantenha API e Expo ativos; confira `EXPO_PUBLIC_API_URL` e, no celular, use o IP do computador, nunca `localhost`.
- **Celular não alcança a API:** mesma rede Wi-Fi, IP correto e firewall liberado somente para rede privada.
- **Lista voltou aos exemplos:** esperado após reiniciar a API, pois o H2 é em memória.
- **Link do GitHub não abre para o professor:** confira se está copiando a URL pública `https://github.com/luisctorrens/integracao-app-api-mobile` e teste em uma janela sem login.
