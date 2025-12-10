import { useState } from "react";
import { View, TextInput, TouchableOpacity, Text } from "react-native";
import { api } from "../api/api";

export default function CreatePostScreen({ navigation }) {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [author, setAuthor] = useState("");

    const save = async () => {
        await api.post("/posts", { title, content, author });
        navigation.goBack();
    };

    return (
        <View style={{ padding: 20 }}>
            <TextInput placeholder="Título" value={title} onChangeText={setTitle}
                style={{ backgroundColor: "#eee", padding: 10, borderRadius: 8, marginBottom: 10 }} />
            <TextInput placeholder="Autor" value={author} onChangeText={setAuthor}
                style={{ backgroundColor: "#eee", padding: 10, borderRadius: 8, marginBottom: 10 }} />
            <TextInput placeholder="Conteúdo" multiline value={content} onChangeText={setContent}
                style={{ backgroundColor: "#eee", padding: 10, borderRadius: 8, height: 150 }} />

            <TouchableOpacity onPress={save}
                style={{ marginTop: 20, backgroundColor: "purple", padding: 15, borderRadius: 8 }}>
                <Text style={{ color: "white", textAlign: "center" }}>Criar Post</Text>
            </TouchableOpacity>
        </View>
    );
}
