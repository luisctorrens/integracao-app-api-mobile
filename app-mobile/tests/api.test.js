import assert from "node:assert/strict";
import test from "node:test";
import { criarClienteApi } from "../src/services/api.js";
import { validarProduto } from "../src/domain/produto.js";

test("cliente usa os cinco métodos do CRUD e lê as respostas", async () => {
  const chamadas = [];
  const transporte = async (url, opcoes) => {
    chamadas.push([url, opcoes.method || "GET"]);
    if (opcoes.method === "DELETE") return { status: 204, ok: true, text: async () => "" };
    return { status: 200, ok: true, text: async () => JSON.stringify({ id: 1, descricao: "Mouse" }) };
  };
  const cliente = criarClienteApi("http://localhost:8080/", transporte);
  await cliente.listar();
  await cliente.detalhar(1);
  await cliente.criar({ descricao: "Mouse", preco: 10 });
  await cliente.atualizar(1, { descricao: "Mouse", preco: 20 });
  assert.equal(await cliente.excluir(1), null);
  assert.deepEqual(chamadas, [
    ["http://localhost:8080/produtos", "GET"],
    ["http://localhost:8080/produtos/1", "GET"],
    ["http://localhost:8080/produtos", "POST"],
    ["http://localhost:8080/produtos/1", "PUT"],
    ["http://localhost:8080/produtos/1", "DELETE"],
  ]);
});

test("erros HTTP e de rede geram mensagens úteis", async () => {
  const http = criarClienteApi("http://localhost:8080", async () => ({
    status: 404, ok: false, text: async () => '{"detail":"Produto não encontrado"}',
  }));
  await assert.rejects(http.detalhar(99), /Produto não encontrado/);
  const rede = criarClienteApi("http://localhost:8080", async () => { throw new Error("offline"); });
  await assert.rejects(rede.listar(), /Não foi possível conectar/);
});

test("entrada aceita vírgula decimal e rejeita dados inválidos", () => {
  assert.deepEqual(validarProduto(" Teclado ", "149,90"), { descricao: "Teclado", preco: 149.9 });
  assert.throws(() => validarProduto(" ", "10"), /descrição/);
  assert.throws(() => validarProduto("Mouse", "-1"), /preço/);
});
