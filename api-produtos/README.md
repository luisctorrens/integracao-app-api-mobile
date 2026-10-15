# API de produtos

Derivada do `AulaAPI.zip` publicado como **Fonte Api de produtos** no AVA da UC Desenvolvimento de Sistemas Distribuídos. O arquivo original não está neste repositório. Esta cópia foi estendida com GET por ID, PUT, DELETE, validação, CORS local, dados iniciais e testes. A autoria do exemplo original é do professor/SENAI.

## Executar

Requer JDK 17+. No Windows: `.\mvnw.cmd spring-boot:run`. Em macOS/Linux: `./mvnw spring-boot:run`. Testes: `.\mvnw.cmd test` ou `./mvnw test`.

A API escuta na porta 8080 e aceita conexões na rede local para permitir o teste com Expo Go. O banco H2 é volátil. Na inicialização, cadastra Teclado e Mouse para facilitar a demonstração.

| Método | Rota | Resultado |
|---|---|---|
| GET | `/produtos` | Lista |
| GET | `/produtos/{id}` | Produto ou 404 |
| POST | `/produtos` | Cria; corpo `{"descricao":"Teclado","preco":149.90}` |
| PUT | `/produtos/{id}` | Edita; mesmo formato do POST |
| DELETE | `/produtos/{id}` | Exclui; resposta 204 |

Descrição vazia e preço negativo retornam 400. Em rede compartilhada, execute somente durante a demonstração e encerre o servidor depois.
