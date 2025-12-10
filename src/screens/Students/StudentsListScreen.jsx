import React, { useEffect, useState } from "react";
import { View, FlatList, Text, TouchableOpacity, StyleSheet } from "react-native";
import { api } from "../../api/api";

export default function StudentsListScreen({ navigation }) {
    const [students, setStudents] = useState([]);

    async function loadStudents() {
        try {
            const res = await api.get("/user?role=aluno");
            setStudents(res.data);
        } catch (err) {
            console.log("Erro ao carregar alunos:", err);
        }
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener("focus", loadStudents);
        return unsubscribe;
    }, [navigation]);

    return (
        <View style={styles.container}>
            <FlatList
                data={students}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => navigation.navigate("StudentForm", { id: item._id })}
                        style={styles.card}
                    >
                        <Text style={styles.name}>{item.name}</Text>
                        <Text style={styles.email}>{item.email}</Text>
                    </TouchableOpacity>
                )}
                contentContainerStyle={{ paddingBottom: 100 }}
            />

            <TouchableOpacity
                onPress={() => navigation.navigate("StudentForm")}
                style={[styles.floatingButton, { backgroundColor: "#10B981" }]}
            >
                <Text style={styles.floatingButtonText}>+</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#F9FAFB",
    },
    card: {
        padding: 15,
        backgroundColor: "#fff",
        marginBottom: 12,
        borderRadius: 12,
        elevation: 3,
    },
    name: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#111827",
        marginBottom: 4,
    },
    email: {
        fontSize: 14,
        color: "#6B7280",
    },
    floatingButton: {
        position: "absolute",
        bottom: 20,
        right: 20,
        padding: 18,
        borderRadius: 50,
        elevation: 5,
    },
    floatingButtonText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 24,
        textAlign: "center",
    },
});
