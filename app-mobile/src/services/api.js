export const API_URL = (process.env.EXPO_PUBLIC_API_URL || "http://localhost:8080").replace(/\/$/, "");

export function criarClienteApi(baseUrl = API_URL, transporte = fetch) {
  const origem = baseUrl.replace(/\/$/, "");

  async function requisitar(caminho, opcoes = {}) {
    let resposta;
    try {
      resposta = await transporte(`${origem}${caminho}`, {
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        ...opcoes,
      });
    } catch {
      throw new Error(`Não foi possível conectar à API em ${origem}. Verifique se ela está ligada e se o endereço está correto.`);
    }

    if (resposta.status === 204) return null;
    const texto = await resposta.text();
    let dados;
    try {
      dados = texto ? JSON.parse(texto) : null;
    } catch {
      throw new Error("A API respondeu em um formato inesperado.");
    }
    if (!resposta.ok) {
      throw new Error(dados?.erro || dados?.detail || dados?.message || `Erro HTTP ${resposta.status}.`);
    }
    return dados;
  }

  return {
    listar: () => requisitar("/produtos"),
    detalhar: (id) => requisitar(`/produtos/${id}`),
    criar: (produto) => requisitar("/produtos", { method: "POST", body: JSON.stringify(produto) }),
    atualizar: (id, produto) => requisitar(`/produtos/${id}`, { method: "PUT", body: JSON.stringify(produto) }),
    excluir: (id) => requisitar(`/produtos/${id}`, { method: "DELETE" }),
  };
}

export const api = criarClienteApi();
