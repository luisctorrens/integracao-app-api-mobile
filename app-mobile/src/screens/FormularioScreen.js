import { useEffect, useState } from "react";
import { ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { Botao } from "../components/Botao";
import { validarProduto } from "../domain/produto";
import { api } from "../services/api";

export function FormularioScreen({ navigation, route }) {
  const id = route.params?.id;
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState("");
  const [carregando, setCarregando] = useState(Boolean(id));
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState("");

  useEffect(() => {
    if (!id) return;
    let ativo = true;
    api.detalhar(id)
      .then((produto) => {
        if (!ativo) return;
        setDescricao(produto.descricao);
        setPreco(String(produto.preco).replace(".", ","));
      })
      .catch((e) => { if (ativo) setErro(e.message); })
      .finally(() => { if (ativo) setCarregando(false); });
    return () => { ativo = false; };
  }, [id]);

  async function salvar() {
    setErro("");
    let produto;
    try {
      produto = validarProduto(descricao, preco);
    } catch (e) {
      setErro(e.message);
      return;
    }
    setSalvando(true);
    try {
      if (id) await api.atualizar(id, produto);
      else await api.criar(produto);
      navigation.popToTop();
    } catch (e) {
      setErro(e.message);
    } finally {
      setSalvando(false);
    }
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={styles.flex}>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <Text style={styles.titulo}>{id ? "Editar produto" : "Cadastrar produto"}</Text>
        <Text style={styles.subtitulo}>Preencha a descrição e o preço. Os dados serão salvos na API.</Text>
        {carregando ? <ActivityIndicator size="large" color="#2563eb" style={styles.spinner} /> : (
          <View style={styles.form}>
            <Text style={styles.label}>Descrição</Text>
            <TextInput
              accessibilityLabel="Descrição do produto"
              autoCapitalize="sentences"
              maxLength={120}
              onChangeText={setDescricao}
              placeholder="Ex.: Teclado"
              style={styles.input}
              value={descricao}
            />
            <Text style={styles.label}>Preço (R$)</Text>
            <TextInput
              accessibilityLabel="Preço do produto"
              keyboardType="decimal-pad"
              onChangeText={setPreco}
              placeholder="Ex.: 149,90"
              style={styles.input}
              value={preco}
            />
            {!!erro && <Text accessibilityRole="alert" style={styles.erro}>{erro}</Text>}
            <Botao disabled={salvando} onPress={salvar}>{salvando ? "Salvando..." : "Salvar produto"}</Botao>
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  container: { marginHorizontal: "auto", maxWidth: 760, padding: 20, width: "100%" },
  titulo: { color: "#0f172a", fontSize: 26, fontWeight: "800" },
  subtitulo: { color: "#475569", fontSize: 15, lineHeight: 22, marginTop: 8 },
  form: { backgroundColor: "#ffffff", borderColor: "#dbeafe", borderRadius: 16, borderWidth: 1, gap: 12, marginTop: 24, padding: 20 },
  label: { color: "#334155", fontSize: 14, fontWeight: "700" },
  input: { backgroundColor: "#f8fafc", borderColor: "#cbd5e1", borderRadius: 10, borderWidth: 1, color: "#0f172a", fontSize: 16, minHeight: 48, paddingHorizontal: 12 },
  erro: { color: "#b91c1c", fontSize: 14 },
  spinner: { marginTop: 40 },
});
