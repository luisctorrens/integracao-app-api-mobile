import { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { ActivityIndicator, FlatList, RefreshControl, StyleSheet, Text, View } from "react-native";
import { Botao } from "../components/Botao";
import { ProdutoCard } from "../components/ProdutoCard";
import { API_URL, api } from "../services/api";

export function ProdutosScreen({ navigation }) {
  const [produtos, setProdutos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [atualizando, setAtualizando] = useState(false);
  const [erro, setErro] = useState("");

  const carregar = useCallback(async (atualizacao = false) => {
    if (atualizacao) setAtualizando(true);
    else setCarregando(true);
    setErro("");
    try {
      const dados = await api.listar();
      if (!Array.isArray(dados)) throw new Error("A API não retornou uma lista de produtos.");
      setProdutos(dados);
    } catch (e) {
      setErro(e.message);
    } finally {
      setCarregando(false);
      setAtualizando(false);
    }
  }, []);

  useFocusEffect(useCallback(() => { carregar(); }, [carregar]));

  return (
    <View style={styles.container}>
      <Text style={styles.sobre}>INTEGRAÇÃO APP + API</Text>
      <Text style={styles.titulo}>Catálogo de produtos</Text>
      <Text style={styles.subtitulo}>Consulte, cadastre, edite e exclua produtos na API da aula.</Text>
      <View style={styles.acao}>
        <Botao onPress={() => navigation.navigate("Formulario")}>+ Cadastrar produto</Botao>
      </View>

      {carregando ? (
        <View style={styles.central}><ActivityIndicator size="large" color="#2563eb" /><Text>Carregando produtos...</Text></View>
      ) : erro ? (
        <View style={styles.central}>
          <Text style={styles.erro}>Não foi possível carregar os produtos.</Text>
          <Text style={styles.mensagem}>{erro}</Text>
          <Botao onPress={() => carregar()}>Tentar novamente</Botao>
        </View>
      ) : (
        <FlatList
          data={produtos}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => <ProdutoCard produto={item} onPress={() => navigation.navigate("Detalhes", { id: item.id })} />}
          refreshControl={<RefreshControl refreshing={atualizando} onRefresh={() => carregar(true)} />}
          ListEmptyComponent={<Text style={styles.vazio}>Nenhum produto cadastrado. Toque em “Cadastrar produto”.</Text>}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
      <Text style={styles.rodape}>API: {API_URL}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, marginHorizontal: "auto", maxWidth: 760, paddingHorizontal: 20, paddingTop: 24, width: "100%" },
  sobre: { color: "#2563eb", fontSize: 12, fontWeight: "900", letterSpacing: 1 },
  titulo: { color: "#0f172a", fontSize: 28, fontWeight: "800", marginTop: 4 },
  subtitulo: { color: "#475569", fontSize: 15, lineHeight: 22, marginTop: 8 },
  acao: { marginBottom: 18, marginTop: 20 },
  central: { alignItems: "center", flex: 1, gap: 14, justifyContent: "center" },
  erro: { color: "#b91c1c", fontSize: 17, fontWeight: "700", textAlign: "center" },
  mensagem: { color: "#475569", textAlign: "center" },
  vazio: { color: "#64748b", fontSize: 15, paddingTop: 36, textAlign: "center" },
  rodape: { color: "#64748b", fontSize: 11, paddingBottom: 12, textAlign: "center" },
});
