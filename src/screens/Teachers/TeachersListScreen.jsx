import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    Alert,
    StyleSheet
} from "react-native";
import { api } from "../../api/api";

export default function TeachersListScreen({ navigation }) {
    const [teachers, setTeachers] = useState([]);

    async function loadTeachers() {
        const res = await api.get("/user?role=professor");
        setTeachers(res.data);
    }

    async function deleteTeacher(id) {
        Alert.alert(
            "Confirmar exclusão",
            "Deseja realmente apagar este professor?",
            [
                { text: "Cancelar", style: "cancel" },
                {
                    text: "Apagar",
                    style: "destructive",
                    onPress: async () => {
                        await api.delete(`/user/${id}`);
                        loadTeachers();
                    }
                }
            ]
        );
    }

    useEffect(() => {
        loadTeachers();
    }, []);

    function renderItem({ item }) {
        return (
            <View style={styles.card}>
                <View style={styles.info}>
                    <Text style={styles.name}>{item.name}</Text>
                    <Text style={styles.email}>{item.email}</Text>
                </View>

                <View style={styles.actions}>
                    <TouchableOpacity
                        style={styles.editBtn}
                        onPress={() =>
                            navigation.navigate("TeacherForm", { id: item._id })
                        }
                    >
                        <Text style={styles.btnText}>Editar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.deleteBtn}
                        onPress={() => deleteTeacher(item._id)}
                    >
                        <Text style={styles.deleteText}>🗑️</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    return (
        <FlatList
            data={teachers}
            keyExtractor={(item) => item._id}
            renderItem={renderItem}
            contentContainerStyle={{ padding: 16 }}
        />
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#1e1e1e",
        padding: 16,
        borderRadius: 14,
        marginBottom: 12,
        flexDirection: "row",
        alignItems: "center"
    },
    info: { flex: 1 },
    name: { color: "#fff", fontWeight: "bold", fontSize: 16 },
    email: { color: "#aaa", marginTop: 4 },
    actions: { flexDirection: "row" },
    editBtn: {
        backgroundColor: "#3B82F6",
        padding: 8,
        borderRadius: 8,
        marginRight: 8
    },
    deleteBtn: {
        backgroundColor: "#EF4444",
        padding: 8,
        borderRadius: 8
    },
    btnText: { color: "#fff", fontWeight: "bold" },
    deleteText: { fontSize: 16 }
});
