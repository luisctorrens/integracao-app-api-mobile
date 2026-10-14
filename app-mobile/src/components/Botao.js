import { Pressable, StyleSheet, Text } from "react-native";

export function Botao({ children, onPress, variante = "primario", disabled = false }) {
  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        variante === "perigo" ? styles.perigo : variante === "secundario" ? styles.secundario : styles.primario,
        (pressed || disabled) && styles.opaco,
      ]}
    >
      <Text style={[styles.texto, variante === "secundario" && styles.textoSecundario]}>{children}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: { alignItems: "center", borderRadius: 12, justifyContent: "center", minHeight: 46, paddingHorizontal: 18, paddingVertical: 10 },
  primario: { backgroundColor: "#2563eb" },
  perigo: { backgroundColor: "#b91c1c" },
  secundario: { backgroundColor: "#dbeafe" },
  opaco: { opacity: 0.6 },
  texto: { color: "#ffffff", fontSize: 15, fontWeight: "700" },
  textoSecundario: { color: "#1e40af" },
});
