import React, { useEffect, useState } from "react";
import { View, TextInput, TouchableOpacity, Text, Alert, ScrollView, StyleSheet } from "react-native";
import { api } from "../../api/api";

export default function StudentFormScreen({ route, navigation }) {
    const id = route.params?.id;

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function loadData() {
        if (!id) return;
        const res = await api.get(`/user/${id}`);
        setName(res.data.name);
        setEmail(res.data.email);
    }

    async function save() {
        try {
            if (id) {
                await api.put(`/user/${id}`, {
                    name,
                    email,
                    ...(password ? { password } : {})
                });
            } else {
                await api.post(`/user`, {
                    name,
                    email,
                    password,
                    role: "aluno"
                });
            }
            navigation.goBack();
        } catch (err) {
            Alert.alert("Erro", "Falha ao salvar aluno");
        }
    }

    useEffect(() => {
        loadData();
    }, []);

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <TextInput
                placeholder="Nome"
                value={name}
                onChangeText={setName}
                style={styles.input}
            />
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

            <TouchableOpacity style={styles.saveButton} onPress={save}>
                <Text style={styles.saveButtonText}>Salvar</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: "#F9FAFB",
        flexGrow: 1,
    },
    input: {
        backgroundColor: "#fff",
        padding: 12,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#D1D5DB",
        marginBottom: 16,
        fontSize: 16,
        color: "#111827",
    },
    saveButton: {
        backgroundColor: "#10B981",
        padding: 16,
        borderRadius: 14,
        alignItems: "center",
        marginTop: 10,
    },
    saveButtonText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
    },
});
