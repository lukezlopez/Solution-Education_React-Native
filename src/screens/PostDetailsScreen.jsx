import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Alert,
    ScrollView,
    StyleSheet
} from "react-native";
import { api } from "../api/api";
import { useAuth } from "../context/AuthContext";

export default function PostDetailsScreen({ route, navigation }) {
    const { role } = useAuth();
    const { id } = route.params;

    const [post, setPost] = useState(null);

    async function loadPost() {
        try {
            const res = await api.get(`/posts/${id}`);
            setPost(res.data);
        } catch (err) {
            Alert.alert("Erro", "Falha ao carregar post.");
        }
    }

    async function handleDelete() {
        Alert.alert(
            "Confirmar",
            "Tem certeza que deseja deletar este post?",
            [
                { text: "Cancelar", style: "cancel" },
                {
                    text: "Deletar",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            await api.delete(`/posts/${id}`);
                            navigation.goBack();
                        } catch (err) {
                            Alert.alert("Erro", "Falha ao deletar.");
                        }
                    }
                }
            ]
        );
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener("focus", loadPost);
        return unsubscribe;
    }, [navigation]);

    if (!post) {
        return (
            <View style={styles.loadingContainer}>
                <Text style={styles.loadingText}>Carregando...</Text>
            </View>
        );
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>{post.title}</Text>
            <Text style={styles.content}>{post.content}</Text>

            {role === "professor" && (
                <>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("EditPost", { id })}
                        style={[styles.button, { backgroundColor: "#3B82F6" }]}
                    >
                        <Text style={styles.buttonText}>Editar Post</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={handleDelete}
                        style={[styles.button, { backgroundColor: "#EF4444" }]}
                    >
                        <Text style={styles.buttonText}>Deletar Post</Text>
                    </TouchableOpacity>
                </>
            )}
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
    loadingText: {
        fontSize: 18,
        color: "#6B7280",
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#111827",
        marginBottom: 16,
    },
    content: {
        fontSize: 16,
        color: "#4B5563",
        marginBottom: 24,
        lineHeight: 24,
    },
    button: {
        padding: 14,
        borderRadius: 12,
        alignItems: "center",
        marginBottom: 16,
    },
    buttonText: {
        color: "#FFFFFF",
        fontWeight: "bold",
        fontSize: 16,
    },
});
