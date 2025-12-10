import { useState, useCallback } from "react";
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { api } from "../api/api";
import { useAuth } from "../context/AuthContext";

export default function HomeScreen({ navigation }) {
    const [posts, setPosts] = useState([]);
    const [search, setSearch] = useState("");

    const { role } = useAuth();

    const loadPosts = async () => {
        try {
            const res = await api.get("/posts");
            setPosts(res.data);
        } catch (err) {
            console.log("Erro ao carregar posts", err);
        }
    };

    useFocusEffect(
        useCallback(() => {
            loadPosts();
        }, [])
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Bem-vindo!</Text>
            <Text style={styles.subtitle}>Veja os posts disponíveis abaixo</Text>

            <TextInput
                placeholder="Buscar posts..."
                value={search}
                onChangeText={setSearch}
                style={styles.input}
            />

            <FlatList
                data={posts.filter(p =>
                    (p.title + p.author + p.content)
                        .toLowerCase()
                        .includes(search.toLowerCase())
                )}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => navigation.navigate("PostDetails", { id: item._id })}
                        style={styles.postCard}
                    >
                        <Text style={styles.postTitle}>{item.title}</Text>
                        <Text style={styles.postAuthor}>Por {item.author}</Text>
                        <Text style={styles.postContent} numberOfLines={2}>{item.content}</Text>
                    </TouchableOpacity>
                )}
                contentContainerStyle={{ paddingBottom: 120 }}
            />

            {role === "professor" && (
                <>
                    {/* Botão de criar post - canto inferior direito */}
                    <TouchableOpacity
                        onPress={() => navigation.navigate("CreatePost")}
                        style={styles.addButton}
                    >
                        <Text style={styles.addButtonText}>+</Text>
                    </TouchableOpacity>

                    {/* Botão de configurações - canto inferior esquerdo */}
                    <TouchableOpacity
                        onPress={() => navigation.navigate("Settings")}
                        style={styles.settingsButton}
                    >
                        <Text style={styles.addButtonText}>⚙️</Text>
                    </TouchableOpacity>
                </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#F9FAFB",
    },
    title: {
        fontSize: 32,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 8,
        color: "#111827",
    },
    subtitle: {
        fontSize: 18,
        textAlign: "center",
        marginBottom: 20,
        color: "#6B7280",
    },
    input: {
        backgroundColor: "#fff",
        padding: 12,
        borderRadius: 12,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: "#D1D5DB",
    },
    postCard: {
        padding: 15,
        backgroundColor: "#fff",
        marginBottom: 12,
        borderRadius: 12,
        elevation: 3,
    },
    postTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#111827",
        marginBottom: 4,
    },
    postAuthor: {
        fontSize: 14,
        color: "#6B7280",
        marginBottom: 6,
    },
    postContent: {
        fontSize: 16,
        color: "#4B5563",
    },
    addButton: {
        position: "absolute",
        bottom: 20,
        right: 20,
        backgroundColor: "#8B5CF6",
        padding: 18,
        borderRadius: 50,
        elevation: 5,
    },
    settingsButton: {
        position: "absolute",
        bottom: 20,
        left: 20,
        backgroundColor: "#8B5CF6",
        padding: 18,
        borderRadius: 50,
        elevation: 5,
    },
    addButtonText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 24,
        textAlign: "center",
    },
});
