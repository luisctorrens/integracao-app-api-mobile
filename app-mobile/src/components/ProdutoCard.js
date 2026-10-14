import { Pressable, StyleSheet, Text, View } from "react-native";
import { formatarPreco } from "../domain/produto";

export function ProdutoCard({ produto, onPress }) {
  return (
    <Pressable accessibilityRole="button" onPress={onPress} style={({ pressed }) => [styles.card, pressed && styles.pressed]}>
      <View style={styles.textos}>
        <Text style={styles.nome}>{produto.descricao}</Text>
        <Text style={styles.codigo}>Código #{produto.id}</Text>
      </View>
      <Text style={styles.preco}>{formatarPreco(produto.preco)}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { alignItems: "center", backgroundColor: "#ffffff", borderColor: "#dbeafe", borderRadius: 14, borderWidth: 1, flexDirection: "row", justifyContent: "space-between", marginBottom: 10, minHeight: 80, padding: 16 },
  pressed: { opacity: 0.65 },
  textos: { flex: 1, paddingRight: 10 },
  nome: { color: "#0f172a", fontSize: 17, fontWeight: "700" },
  codigo: { color: "#64748b", fontSize: 12, marginTop: 5 },
  preco: { color: "#1d4ed8", fontSize: 16, fontWeight: "800" },
});
