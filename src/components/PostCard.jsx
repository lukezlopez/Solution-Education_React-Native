import React from "react";
import { View, Text } from "react-native";

export default function PostCard({ post }) {
    return (
        <View style={{
            padding: 12, marginBottom: 12, backgroundColor: "#1f1f1f",
            borderRadius: 10, borderWidth: 1, borderColor: "#333"
        }}>
            <Text style={{ fontSize: 16, fontWeight: "700", color: "#fff" }}>{post.title}</Text>
            <Text numberOfLines={2} style={{ color: "#bbb", marginTop: 6 }}>{post.description || post.content}</Text>
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 8 }}>
                <Text style={{ color: "#888", fontSize: 12 }}>{post.author || "Anônimo"}</Text>
                <Text style={{ color: "#888", fontSize: 12 }}>{new Date(post.createdAt || Date.now()).toLocaleString()}</Text>
            </View>
        </View>
    );
}
