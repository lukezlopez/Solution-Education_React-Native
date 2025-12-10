import { TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function FloatingCreateButton({ onPress }) {
    return (
        <TouchableOpacity style={styles.fab} onPress={onPress}>
            <Ionicons name="add" size={28} color="#fff" />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    fab: {
        position: "absolute",
        bottom: 24,
        right: 24,
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: "#007bff",
        alignItems: "center",
        justifyContent: "center",
        elevation: 5,
    },
});
