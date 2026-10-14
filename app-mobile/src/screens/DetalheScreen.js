import { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { ActivityIndicator, Modal, ScrollView, StyleSheet, Text, View } from "react-native";
import { Botao } from "../components/Botao";
import { formatarPreco } from "../domain/produto";
import { api } from "../services/api";

export function DetalheScreen({ navigation, route }) {
  const { id } = route.params;
  const [produto, setProduto] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [excluindo, setExcluindo] = useState(false);
  const [confirmando, setConfirmando] = useState(false);
  const [erro, setErro] = useState("");

  const carregar = useCallback(async () => {
    setCarregando(true);
    setErro("");
    try {
      setProduto(await api.detalhar(id));
    } catch (e) {
      setErro(e.message);
    } finally {
      setCarregando(false);
    }
  }, [id]);
  useFocusEffect(useCallback(() => { carregar(); }, [carregar]));

  async function excluir() {
    setConfirmando(false);
    setExcluindo(true);
    setErro("");
    try {
      await api.excluir(id);
      navigation.popToTop();
    } catch (e) {
      setErro(e.message);
    } finally {
      setExcluindo(false);
    }
  }

  if (carregando) {
    return <View style={styles.central}><ActivityIndicator size="large" color="#2563eb" /><Text>Carregando detalhes...</Text></View>;
  }
  if (erro && !produto) {
    return <View style={styles.central}><Text style={styles.erro}>{erro}</Text><Botao onPress={carregar}>Tentar novamente</Botao></View>;
  }
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.label}>PRODUTO #{produto.id}</Text>
        <Text style={styles.nome}>{produto.descricao}</Text>
        <Text style={styles.preco}>{formatarPreco(produto.preco)}</Text>
      </View>
      {!!erro && <Text style={styles.erro}>{erro}</Text>}
      <View style={styles.acoes}>
        <Botao disabled={excluindo} onPress={() => navigation.navigate("Formulario", { id })}>Editar produto</Botao>
        <Botao disabled={excluindo} onPress={() => setConfirmando(true)} variante="perigo">
          {excluindo ? "Excluindo..." : "Excluir produto"}
        </Botao>
      </View>
      <Modal transparent visible={confirmando} animationType="fade" onRequestClose={() => setConfirmando(false)}>
        <View style={styles.modalFundo}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitulo}>Excluir produto?</Text>
            <Text style={styles.modalTexto}>O produto será removido da API. Esta ação não pode ser desfeita.</Text>
            <View style={styles.acoes}>
              <Botao onPress={() => setConfirmando(false)} variante="secundario">Cancelar</Botao>
              <Botao onPress={excluir} variante="perigo">Confirmar exclusão</Botao>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { marginHorizontal: "auto", maxWidth: 760, padding: 20, width: "100%" },
  central: { alignItems: "center", flex: 1, gap: 16, justifyContent: "center", padding: 24 },
  card: { backgroundColor: "#ffffff", borderColor: "#dbeafe", borderRadius: 16, borderWidth: 1, padding: 22 },
  label: { color: "#2563eb", fontSize: 12, fontWeight: "800", letterSpacing: 1 },
  nome: { color: "#0f172a", fontSize: 28, fontWeight: "800", marginTop: 10 },
  preco: { color: "#1d4ed8", fontSize: 22, fontWeight: "800", marginTop: 18 },
  acoes: { gap: 12, marginTop: 22 },
  erro: { color: "#b91c1c", fontSize: 15, marginVertical: 16, textAlign: "center" },
  modalFundo: { alignItems: "center", backgroundColor: "#0f172a99", flex: 1, justifyContent: "center", padding: 20 },
  modalCard: { backgroundColor: "#ffffff", borderRadius: 16, maxWidth: 420, padding: 24, width: "100%" },
  modalTitulo: { color: "#0f172a", fontSize: 20, fontWeight: "800" },
  modalTexto: { color: "#475569", fontSize: 15, lineHeight: 22, marginTop: 8 },
});
