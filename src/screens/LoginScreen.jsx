import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet, ScrollView } from "react-native";
import { useAuth } from "../context/AuthContext";

export default function LoginScreen() {
    const { login } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleLogin() {
        try {
            await login(email, password);
        } catch (err) {
            Alert.alert("Erro", "Email ou senha incorretos");
        }
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.welcome}>Bem-vindo!</Text>
            <Text style={styles.subtitle}>Faça login na sua conta</Text>

            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                style={styles.input}
            />

            <TextInput
                placeholder="Senha"
                value={password}
                secureTextEntry
                onChangeText={setPassword}
                style={styles.input}
            />

            <View style={styles.buttonContainer}>
                <Button title="Entrar" onPress={handleLogin} color="#4F46E5" />
            </View>
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
    welcome: {
        fontSize: 40,
        fontWeight: "bold",
        color: "#111827",
        textAlign: "center",
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 18,
        color: "#6B7280",
        textAlign: "center",
        marginBottom: 32,
    },
    input: {
        width: "100%",
        maxWidth: 400,
        padding: 14,
        marginBottom: 16,
        borderRadius: 14,
        backgroundColor: "#fff",
        borderColor: "#E5E7EB",
        borderWidth: 1,
    },
    buttonContainer: {
        width: "100%",
        maxWidth: 400,
        borderRadius: 14,
        overflow: "hidden",
        marginTop: 8,
    },
});
