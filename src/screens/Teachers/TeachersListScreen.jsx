import React, { useEffect, useState } from "react";
import { View, FlatList, Text, TouchableOpacity, StyleSheet } from "react-native";
import { api } from "../../api/api";

export default function TeachersListScreen({ navigation }) {
    const [teachers, setTeachers] = useState([]);

    async function loadTeachers() {
        try {
            const res = await api.get("/user?role=professor");
            setTeachers(res.data);
        } catch (err) {
            console.log("Erro ao carregar professores:", err);
        }
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener("focus", loadTeachers);
        return unsubscribe;
    }, [navigation]);

    return (
        <View style={styles.container}>
            <FlatList
                data={teachers}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => navigation.navigate("TeacherForm", { id: item._id })}
                        style={styles.card}
                    >
                        <Text style={styles.name}>{item.name}</Text>
                        <Text style={styles.email}>{item.email}</Text>
                    </TouchableOpacity>
                )}
                contentContainerStyle={{ paddingBottom: 100 }}
            />

            <TouchableOpacity
                onPress={() => navigation.navigate("TeacherForm")}
                style={[styles.floatingButton, { backgroundColor: "#4F46E5" }]}
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
