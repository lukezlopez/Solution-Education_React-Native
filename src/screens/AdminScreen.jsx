import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

export default function AdminScreen({ navigation }) {
    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                padding: 20
            }}
        >
            <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 30 }}>
                Administração
            </Text>

            <TouchableOpacity
                onPress={() => navigation.navigate("TeachersList")}
                style={{
                    backgroundColor: "#2196F3",
                    padding: 15,
                    borderRadius: 10,
                    width: "80%",
                    marginBottom: 15
                }}
            >
                <Text
                    style={{ color: "white", textAlign: "center", fontWeight: "bold" }}
                >
                    Gerenciar Professores
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => navigation.navigate("StudentsList")}
                style={{
                    backgroundColor: "#4CAF50",
                    padding: 15,
                    borderRadius: 10,
                    width: "80%",
                    marginBottom: 15
                }}
            >
                <Text
                    style={{ color: "white", textAlign: "center", fontWeight: "bold" }}
                >
                    Gerenciar Alunos
                </Text>
            </TouchableOpacity>
        </View>
    );
}
