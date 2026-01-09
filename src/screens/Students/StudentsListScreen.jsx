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

export default function StudentsListScreen({ navigation }) {
    const [students, setStudents] = useState([]);

    async function loadStudents() {
        const res = await api.get("/user?role=aluno");
        setStudents(res.data);
    }

    async function deleteStudent(id) {
        Alert.alert(
            "Confirmar exclusão",
            "Deseja realmente apagar este aluno?",
            [
                { text: "Cancelar", style: "cancel" },
                {
                    text: "Apagar",
                    style: "destructive",
                    onPress: async () => {
                        await api.delete(`/user/${id}`);
                        loadStudents();
                    }
                }
            ]
        );
    }

    useEffect(() => {
        loadStudents();
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
                            navigation.navigate("StudentForm", { id: item._id })
                        }
                    >
                        <Text style={styles.btnText}>Editar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.deleteBtn}
                        onPress={() => deleteStudent(item._id)}
                    >
                        <Text style={styles.deleteText}>🗑️</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    return (
        <FlatList
            data={students}
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
        backgroundColor: "#10B981",
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
