import React from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { useAuth } from "../context/AuthContext";

export default function HomeScreen({ navigation }) {
    const { role } = useAuth();

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Bem-vindo!</Text>
            <Text style={styles.subtitle}>Faça login na sua conta</Text>

            {role === "professor" && (
                <>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("CreatePost")}
                        style={[styles.button, { backgroundColor: "#10B981" }]}
                    >
                        <Text style={styles.buttonText}>Criar Post</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => navigation.navigate("TeachersList")}
                        style={[styles.button, { backgroundColor: "#3B82F6" }]}
                    >
                        <Text style={styles.buttonText}>Gerenciar Professores</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => navigation.navigate("StudentsList")}
                        style={[styles.button, { backgroundColor: "#F59E0B" }]}
                    >
                        <Text style={styles.buttonText}>Gerenciar Alunos</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => navigation.navigate("Admin")}
                        style={[styles.button, { backgroundColor: "#EF4444" }]}
                    >
                        <Text style={styles.buttonText}>Painel Admin</Text>
                    </TouchableOpacity>
                </>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 24,
        paddingVertical: 40,
        backgroundColor: "#F9FAFB",
    },
    title: {
        fontSize: 32,
        fontWeight: "bold",
        color: "#111827",
        textAlign: "center",
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 18,
        color: "#6B7280",
        textAlign: "center",
        marginBottom: 24,
    },
    button: {
        width: "100%",
        maxWidth: 400,
        padding: 16,
        borderRadius: 14,
        marginBottom: 16,
        alignItems: "center",
    },
    buttonText: {
        color: "#FFFFFF",
        fontWeight: "bold",
        fontSize: 16,
    },
});
