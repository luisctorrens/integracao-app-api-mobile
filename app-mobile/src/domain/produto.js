export function validarProduto(descricao, precoTexto) {
  const nome = descricao.trim();
  if (!nome) throw new Error("Informe a descrição do produto.");
  const normalizado = precoTexto.trim().replace(",", ".");
  if (!/^\d+(\.\d{1,2})?$/.test(normalizado)) {
    throw new Error("Informe um preço válido com até duas casas decimais.");
  }
  const preco = Number(normalizado);
  if (!Number.isFinite(preco) || preco < 0) throw new Error("Informe um preço não negativo.");
  return { descricao: nome, preco };
}

export function formatarPreco(preco) {
  return Number(preco).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}
