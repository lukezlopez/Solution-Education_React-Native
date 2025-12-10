import React, { useEffect, useState } from "react";
import {
    View,
    TextInput,
    Text,
    TouchableOpacity,
    Alert,
    ScrollView,
    StyleSheet
} from "react-native";
import { api } from "../api/api";
import { useAuth } from "../context/AuthContext";

export default function EditPostScreen({ route, navigation }) {
    const { id } = route.params;
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [author, setAuthor] = useState("");
    const { role } = useAuth();

    useEffect(() => {
        (async () => {
            try {
                const res = await api.get(`/posts/${id}`);
                const p = res.data;
                setTitle(p.title || "");
                setContent(p.content || "");
                setAuthor(p.author || "");
            } catch (err) {
                console.warn(err);
            }
        })();
    }, [id]);

    if (role !== "professor") {
        return (
            <View style={styles.loadingContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Text style={styles.backButtonText}>Voltar</Text>
                </TouchableOpacity>
            </View>
        );
    }

    async function handleSave() {
        try {
            await api.put(`/posts/${id}`, { title, content, author });
            Alert.alert("Salvo", "Post atualizado", [
                { text: "OK", onPress: () => navigation.navigate("PostDetails", { id }) }
            ]);
        } catch (err) {
            Alert.alert("Erro", "Falha ao salvar");
            console.warn(err);
        }
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.label}>Título</Text>
            <TextInput
                value={title}
                onChangeText={setTitle}
                placeholder="Título"
                style={styles.input}
            />

            <Text style={styles.label}>Autor</Text>
            <TextInput
                value={author}
                onChangeText={setAuthor}
                placeholder="Autor"
                style={styles.input}
            />

            <Text style={styles.label}>Conteúdo</Text>
            <TextInput
                value={content}
                onChangeText={setContent}
                placeholder="Conteúdo"
                multiline
                style={[styles.input, { height: 160, textAlignVertical: "top" }]}
            />

            <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
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
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F9FAFB",
    },
    label: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#111827",
        marginBottom: 6,
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
    backButton: {
        backgroundColor: "#3B82F6",
        padding: 14,
        borderRadius: 12,
    },
    backButtonText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
    },
});
